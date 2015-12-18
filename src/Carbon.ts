/// <reference path="../typings/tsd.d.ts" />

import * as APIDescription from "./APIDescription";
import Apps from "./Apps";
import * as Auth from "./Auth";
import AbstractContext from "./AbstractContext";
import * as Document from "./Document";
import Documents from "./Documents";
import * as HTTP from "./HTTP";
import Platform from "./Platform";
import * as RDF from "./RDF";
import defaultSettings from "./settings";
import * as Utils from "./Utils";

class Carbon extends AbstractContext {

	/* tslint:disable: variable-name */
	static Apps:typeof Apps = Apps;
	static Auth:typeof Auth = Auth;
	static Document:typeof Document = Document;
	static Documents:typeof Documents = Documents;
	static HTTP:typeof HTTP = HTTP;
	static RDF:typeof RDF = RDF;
	static Utils:typeof Utils = Utils;
	/* tslint:enable: variable-name */

	static get version():string { return "0.12.0-ALPHA"; }

	// TODO: Rename it to Apps. TypeScript is throwing an error regarding a static variable that will not be accessible if this instance variable has the same name
	apps:Apps;
	platform:Platform;

	constructor( settings:any ) {
		super();

		settings = settings ? settings : defaultSettings;

		Utils.M.extend( this.settings, Utils.M.from( settings ) );

		this.platform = new Platform( this );
		this.apps = new Apps( this.platform );
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
}

export default Carbon;
