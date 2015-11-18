/// <reference path="../typings/tsd.d.ts" />

import * as APIDescription from "./APIDescription";
import Apps from "./Apps";
import * as Auth from "./Auth";
import * as Document from "./Document";
import Documents from "./Documents";
import * as HTTP from "./HTTP";
import Context from "./Context";
import * as RDF from "./RDF";
import defaultSettings from "./settings";
import * as Utils from "./Utils";

class Carbon extends Context {
	/* tslint:disable: variable-name typedef */
	static Apps = Apps;
	static Auth = Auth;
	static Document = Document;
	static Documents = Documents;
	static HTTP = HTTP;
	static RDF = RDF;
	static Utils = Utils;
	/* tslint:disable: variable-name typedef */

	static get version():string { return "0.11.0-ALPHA"; }

	// TODO:
	apps:Apps;

	constructor( settings:any ) {
		super();

		settings = settings ? settings : defaultSettings;

		Utils.M.extend( this.settings, Utils.M.from( settings ) );

		this.registerDefaultDefinitions();

		this.apps = new Apps( this );
	}

	resolve( uri:string ):string {
		if ( RDF.URI.Util.isAbsolute( uri ) ) return uri;

		let finalURI:string = this.settings.get( "http.ssl" ) ? "https://" : "http://";
		finalURI += this.settings.get( "domain" );
		return RDF.URI.Util.resolve( finalURI, uri );
	}

	getAPIDescription():Promise<APIDescription.Class> {
		return this.Documents.get( "platform/api/" ).then(
			( processedResponse:HTTP.ProcessedResponse<Document.Class> ) => {
				return <any> processedResponse.result;
			}
		);
	}

	private registerDefaultDefinitions():void {
		this.addDefinition( APIDescription.RDF_CLASS, APIDescription.DEFINITION );
	}
}

export default Carbon;
