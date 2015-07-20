/// <reference path="../typings/es6-promise/es6-promise.d.ts" />
/// <reference path="../typings/jsonld.js/jsonld.js.d.ts" />
/// <amd-dependency path="jsonld" name="jsonld" />
declare
var jsonld;

//@formatter:off
import * as HTTP from './HTTP';
import Documents from './Documents';
import Committer from './Committer';
import Parent from './Parent';
import {
	RDFDocument,
	Node,
	Resource,
	DocumentResource,
	PersistedDocumentResource,
	FragmentResource,
	PersistedFragmentResource
} from './RDF';
import * as Utils from './Utils';
import * as RDFSource from './ldp/RDFSource';
import * as LDP from './namespaces/LDP';
//@formatter:on

enum InteractionModel {
	RDFSource,
	Container
}

function setPreferredInteractionModel( interactionModel:InteractionModel, requestOptions:HTTP.Request.Options ) {
	var headers = requestOptions.headers ? requestOptions.headers : requestOptions.headers = new Map<string, HTTP.Header.Class>();
	if ( ! headers.has( "Prefer" ) ) headers.set( "Prefer", new HTTP.Header.Class() );
	var prefer:HTTP.Header.Class = headers.get( "Prefer" );
	prefer.values.push( new HTTP.Header.Value( LDP.Class.RDFSource + "; rel=interaction-model" ) );
}

class Resources implements Committer {
	private parent:Parent;

	constructor( parent:Parent ) {
		this.parent = parent;
	}

	get( uri:string ):Promise<HTTP.ProcessedResponse<PersistedDocumentResource.Class>> {
		var requestOptions:HTTP.Request.Options = {};
		if ( this.parent && this.parent.Auth.isAuthenticated() ) this.parent.Auth.addAuthentication( requestOptions );

		setPreferredInteractionModel( InteractionModel.RDFSource, requestOptions );

		return this.parent.Documents.get( uri, requestOptions ).then(
			( processedResponse:HTTP.ProcessedResponse<RDFDocument.Class[]> ) => {
				var documents:RDFDocument.Class[] = processedResponse.result;
				if ( documents.length === 0 ) throw new Error( 'BadResponse: No document was returned.' );
				if ( documents.length > 1 ) throw new Error( 'Unsupported: Multiple graphs are currently not supported.' );
				var document:RDFDocument.Class = documents[ 0 ];

				var nodes:Node.Class[] = RDFDocument.Util.getResources( document );
				var resources:Resource.Class[] = <Resource.Class[]> Resource.factory.from( nodes );

				this.injectDefinitions( resources );

				return {
					result: document,
					response: processedResponse.response
				};
			}
		).then(
			( processedResponse:HTTP.ProcessedResponse<RDFDocument.Class> ) => {
				var document:RDFDocument.Class = processedResponse.result;
				var documentResourceNodes:Node.Class[] = RDFDocument.Util.getDocumentResources( document );

				if ( documentResourceNodes.length === 0 ) throw new Error( 'BadResponse: No document resource was returned.' );
				if ( documentResourceNodes.length > 1 ) throw new Error( 'NotSupported: Multiple document resources were returned.' );

				var documentResourceNode:Node.Class = documentResourceNodes[ 0 ];
				var fragmentNodes:Node.Class[] = RDFDocument.Util.getFragmentResources( document, documentResourceNode );
				var documentResource:DocumentResource.Class = DocumentResource.factory.from( documentResourceNode, fragmentNodes );

				var persistedDocumentResource:PersistedDocumentResource.Class = PersistedDocumentResource.Factory.from( documentResource, this );

				// TODO: Inject registered definitions

				return {
					result: persistedDocumentResource,
					response: processedResponse.response
				};
			}
		);
	}

	commit( object:any = null ):Promise<HTTP.Response> {
		// TODO: Implement
		return null;
	}

	private injectDefinitions( resources:Resource.Class[] ):Resource.Class[] {
		var definitionURIs:string[] = this.parent.getDefinitionURIs();

		for ( let i:number = 0, length:number = definitionURIs.length; i < length; i ++ ) {
			var definitionURI:string = definitionURIs[ i ];
			var toInject:Resource.Class[] = [];
			for ( let j:number = 0, resourcesLength:number = resources.length; j < resourcesLength; j ++ ) {
				var resource:Resource.Class = resources[ j ];
				if ( resource.types.indexOf( definitionURI ) !== - 1 ) toInject.push( resource );
			}
			if ( toInject.length > 0 ) Resource.Factory.injectDescriptions( toInject, this.parent.getDefinition( definitionURI ) );
		}

		return resources;
	}

}

export default Resources;