/// <reference path="../typings/es6/es6.d.ts" />
import Apps from './Apps';
import Auth from './Auth';
import Documents from './Documents';
import * as HTTP from './HTTP';
import Parent from './Parent';
import * as RDF from './RDF';
import settings from './settings';
import * as Utils from './Utils';

class Carbon extends Parent {
	Apps:Apps;

	constructor( settings:any ) {
		super();

		Utils.M.extend( this.settings, Utils.M.from( settings ) );

		this.Apps = new Apps( this );
	}

	static Apps = Apps;
	static Auth = Auth;
	static Documents = Documents;
	static HTTP = HTTP;
	static RDF = RDF;
	static Utils = Utils;

	static version = '0.8.2-ALPHA';

	resolve( uri:string ):string {
		if ( RDF.URI.Util.isAbsolute( uri ) ) return uri;

		var finalURI:string = this.settings.get( "http.ssl" ) ? 'https://' : 'http://';
		finalURI += this.settings.get( "domain" );
		return RDF.URI.Util.resolve( finalURI, uri );
	}
}

//@formatter:off
export default new Carbon( settings );

export {
	Carbon
};
//@formatter:on