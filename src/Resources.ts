/// <reference path="../typings/es6-promise/es6-promise.d.ts" />
/// <reference path="../typings/jsonld.js/jsonld.js.d.ts" />
/// <amd-dependency path="jsonld" name="jsonld" />

/*

	declare var jsonld;

	//@formatter:off
	import * as HTTP from './HTTP';
	import Documents from './Documents';
	import Committer from './Committer';
	import Parent from './Parent';
	import * as RDF from './RDF';
	import * as Utils from './Utils';
	import * as RDFSource from './LDP/RDFSource';
	import * as LDP from './NS/LDP';
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

		get( uri:string ):Promise<HTTP.ProcessedResponse<RDF.PersistedDocumentResource.Class>> {
			return null;

				var requestOptions:HTTP.Request.Options = {};
				if ( this.parent && this.parent.Auth.isAuthenticated() ) this.parent.Auth.addAuthentication( requestOptions );

				setPreferredInteractionModel( InteractionModel.RDFSource, requestOptions );

				return this.parent.Documents.get( uri, requestOptions ).then(
					( processedResponse:HTTP.ProcessedResponse<RDF.Document.Class[]> ) => {

						var document:RDF.Document.Class = Resources.getDocument( processedResponse );

						var nodes:RDF.Node.Class[] = RDF.Document.Util.getResources( document );
						var resources:RDF.Resource.Class[] = <RDF.Resource.Class[]> RDF.Resource.factory.from( nodes );

						this.injectDefinitions( resources );

						return {
							result: document,
							response: processedResponse.response
						};
					}
				).then(
					( processedResponse:HTTP.ProcessedResponse<RDF.Document.Class> ) => {
						let document:RDF.Document.Class = processedResponse.result;
						let documentResourceNode:RDF.Node.Class = Resources.getDocumentResourceNode( document );
						let fragmentNodes:RDF.Node.Class[] = RDF.Document.Util.getFragmentResources( document, documentResourceNode );
						let documentResource:RDF.DocumentResource.Class = RDF.DocumentResource.factory.from( documentResourceNode, fragmentNodes );

						let persistedDocumentResource:RDF.PersistedDocumentResource.Class = RDF.PersistedDocumentResource.Factory.from( documentResource, this );

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

		private static getDocument( processedResponse:HTTP.ProcessedResponse<RDF.Document.Class[]> ):RDF.Document.Class {
			var documents:RDF.Document.Class[] = processedResponse.result;
			if ( documents.length === 0 ) throw new Error( 'BadResponse: No document was returned.' );
			if ( documents.length > 1 ) throw new Error( 'Unsupported: Multiple graphs are currently not supported.' );
			return documents[ 0 ];
		}

		private static getDocumentResourceNode( document:RDF.Document.Class ):RDF.Node.Class {
			let documentResourceNodes:RDF.Node.Class[] = RDF.Document.Util.getDocumentResources( document );

			// TODO: Use specific Error classes
			if ( documentResourceNodes.length === 0 ) throw new Error( 'BadResponse: No document resource was returned.' );
			if ( documentResourceNodes.length > 1 ) throw new Error( 'NotSupported: Multiple document resources were returned.' );

			return documentResourceNodes[ 0 ];
		}

		private injectDefinitions( resources:RDF.Resource.Class[] ):RDF.Resource.Class[] {
			let definitionURIs:string[] = this.parent.getDefinitionURIs();

			for ( let i:number = 0, length:number = definitionURIs.length; i < length; i ++ ) {
				let definitionURI:string = definitionURIs[ i ];
				let toInject:RDF.Resource.Class[] = [];
				for ( let j:number = 0, resourcesLength:number = resources.length; j < resourcesLength; j ++ ) {
					let resource:RDF.Resource.Class = resources[ j ];
					if ( resource.types.indexOf( definitionURI ) !== - 1 ) toInject.push( resource );
				}
				if ( toInject.length > 0 ) RDF.Resource.Factory.injectDescriptions( toInject, this.parent.getDefinition( definitionURI ) );
			}

			return resources;
		}

	}

	export default Resources;

*/