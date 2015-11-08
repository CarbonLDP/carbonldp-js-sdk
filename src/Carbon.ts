/// <reference path="../typings/tsd.d.ts" />

import * as APIDescription from './APIDescription';
import Apps from './Apps';
import Auth from './Auth';
import * as Document from './Document';
import Documents from './Documents';
import * as HTTP from './HTTP';
import Parent from './Parent';
import * as RDF from './RDF';
import defaultSettings from './settings';
import * as Utils from './Utils';

class Carbon extends Parent {
	Apps:Apps;

	constructor( settings:any ) {
		super();

		settings = settings ? settings : defaultSettings;

		Utils.M.extend( this.settings, Utils.M.from( settings ) );

		this.registerDefaultDefinitions();

		this.Apps = new Apps( this );
	}

	static Apps = Apps;
	static Auth = Auth;
	static Document = Document;
	static Documents = Documents;
	static HTTP = HTTP;
	static RDF = RDF;
	static Utils = Utils;

	static version = '0.9.2-ALPHA';

	resolve( uri:string ):string {
		if ( RDF.URI.Util.isAbsolute( uri ) ) return uri;

		var finalURI:string = this.settings.get( "http.ssl" ) ? 'https://' : 'http://';
		finalURI += this.settings.get( "domain" );
		return RDF.URI.Util.resolve( finalURI, uri );
	}

	getAPIDescription():Promise<APIDescription.Class> {
		return this.Documents.get( 'platform/api/' ).then(
			( processedResponse:HTTP.ProcessedResponse<Document.Class> ) => {
				return <any> processedResponse.result;
			}
		);
	}

	private registerDefaultDefinitions():void {
		this.addDefinition( APIDescription.RDFClass, APIDescription.Definition );
	}
}

export default Carbon;