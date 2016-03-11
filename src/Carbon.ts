/// <reference path="../typings/typings.d.ts" />

import * as APIDescription from "./APIDescription";
import Apps from "./Apps";
import * as Auth from "./Auth";
import AbstractContext from "./AbstractContext";
import * as Document from "./Document";
import Documents from "./Documents";
import * as HTTP from "./HTTP";
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

	// TODO: Get package.json version directly
	static get version():string { return "0.17.0-ALPHA"; }

	apps:Apps;

	// TODO: Define settings type
	constructor( settings?:any ) {
		super();

		settings = settings ? settings : defaultSettings;

		Utils.M.extend( this.settings, Utils.M.from( settings ) );

		this.apps = new Apps( this );
	}

	resolve( uri:string ):string {
		if ( RDF.URI.Util.isAbsolute( uri ) ) return uri;

		let finalURI:string = this.settings.get( "http.ssl" ) ? "https://" : "http://";
		finalURI += this.settings.get( "domain" ) + "/" + this.getSetting( "platform.container" );
		return RDF.URI.Util.resolve( finalURI, uri );
	}

	getAPIDescription():Promise<APIDescription.Class> {
		return this.documents.get( "api/" ).then(
			( [ description, response ]:[ Document.Class, HTTP.Response.Class ] ) => {
				return <any> description;
			}
		);
	}
}

export default Carbon;
