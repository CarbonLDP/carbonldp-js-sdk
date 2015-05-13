/// <reference path="../typings/es6-promise/es6-promise.d.ts" />
/// <reference path="../typings/jsonld.js/jsonld.js.d.ts" />
/// <amd-dependency path="jsonld" name="jsonld" />
declare
var jsonld;

//@formatter:off
import * as HTTP from './HTTP';
import Documents from './Documents';
import Committer from './Committer';
import * as Utils from './Utils';
import {
	RDFDocument,
	RDFNode,
	Resource,
	DocumentResource,
	PersistedDocumentResource,
	FragmentResource,
	PersistedFragmentResource
} from './RDF';
import * as RDFSource from './ldp/RDFSource';
//@formatter:on

class Resources implements Committer {
	private documents:Documents;

	constructor( documents:Documents ) {
		this.documents = documents;
	}

	get( uri:string ):Promise<HTTP.ProcessedResponse<PersistedDocumentResource.Class>> {
		return this.documents.get( uri ).then(
			( processedResponse:HTTP.ProcessedResponse<RDFDocument.Class> ) => {
				var document:RDFDocument.Class = <RDFDocument.Class> processedResponse.result;
				var documentResourceNodes:RDFNode.Class[] = RDFDocument.Util.getDocumentResources( document );

				if ( documentResourceNodes.length > 1 ) throw new Error( 'NotSupported: Multiple document resources were returned.' );

				var documentResourceNode:RDFNode.Class = documentResourceNodes[ 0 ];
				var fragmentNodes:RDFNode.Class[] = RDFDocument.Util.getFragmentResources( document, documentResourceNode );
				var documentResource:DocumentResource.Class = DocumentResource.Factory.from( documentResourceNode, fragmentNodes );

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

}

export default Resources;