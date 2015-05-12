/// <reference path="../typings/es6/es6.d.ts" />
import Apps from './Apps';
import Documents from './Documents';
import Parent from './Parent';
import * as RDF from './RDF';
import Resources from './Resources';
import * as REST from './REST';
import * as configuration from './configuration';
import * as Utils from './Utils';

class Carbon implements Parent {
	Apps:Apps;
	Definitions:Map<string, RDF.PropertyDescription[]> = new Map<string, RDF.PropertyDescription[]>();
	Documents:Documents;
	Resources:Resources;

	private configuration:any;

	constructor( configuration:any ) {
		this.Apps = new Apps( this, configuration.appsContainer );

		this.Documents = new Documents( this );
		this.Resources = new Resources( this.Documents );
	}

	resolve( relativeURI:string ):string {
		var finalURI:string = this.configuration.useSSL ? 'https://' : 'http://';
		finalURI += this.configuration.domain;
		return RDF.URI.Util.resolve( finalURI, relativeURI );
	}
}

//@formatter:off
export default new Carbon( configuration );

export {
	Carbon,
	RDF,
	REST
};
//@formatter:on