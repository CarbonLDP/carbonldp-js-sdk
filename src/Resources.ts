/// <reference path="../typings/es6-promise/es6-promise.d.ts" />
/// <reference path="../typings/jsonld.js/jsonld.js.d.ts" />
/// <amd-dependency path="jsonld" name="jsonld" />
declare
var jsonld;

import * as HTTP from './HTTP';
import Documents from './Documents';
import * as Utils from './Utils';
import { RDFDocument, Resource } from './RDF';
import * as RDFSource from './ldp/RDFSource';
import * as PersistedRDFSource from './ldp/PersistedRDFSource';

class Resources {
	private documents:Documents;

	constructor( documents:Documents ) {
		this.documents = documents;
	}

	get( uri:string ):Promise<HTTP.ProcessedResponse<PersistedRDFSource.Class>> {
		return this.documents.get( uri ).then(
			function ( processedResponse:HTTP.ProcessedResponse<RDFDocument.Class> ) {
				// TODO: Implement
				return null;
			}
		);
	}

}

export default Resources;