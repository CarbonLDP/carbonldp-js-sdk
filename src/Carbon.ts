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
	Documents:Documents;
	Resources:Resources;

	private configuration:any;
	private definitions:Map<string, Map<string, RDF.PropertyDescription>>;

	constructor( configuration:any ) {
		this.Apps = new Apps( this, configuration.appsContainer );

		this.Documents = new Documents( this );
		this.Resources = new Resources( this );
	}

	resolve( relativeURI:string ):string {
		var finalURI:string = this.configuration.useSSL ? 'https://' : 'http://';
		finalURI += this.configuration.domain;
		return RDF.URI.Util.resolve( finalURI, relativeURI );
	}

	hasDefinition( uri:string ):boolean {
		return this.definitions.has( uri );
	}

	getDefinition( uri:string ):Map<string, RDF.PropertyDescription> {
		var descriptions:Map<string, RDF.PropertyDescription> = new Map<string, RDF.PropertyDescription>();
		if ( this.definitions.has( uri ) ) {
			Utils.M.extend<string, RDF.PropertyDescription>( descriptions, this.definitions.get( uri ) );
		}
		return descriptions;
	}
	getDefinitionURIs():string[] {
		return Utils.A.from<string>( this.definitions.keys() );
	}

	addDefinition( uri:string, descriptions:Map<string, RDF.PropertyDescription> ):void;
	addDefinition( uri:string, descriptions:Object ):void {
		var extender:Map<string, RDF.PropertyDescription>;
		if ( Utils.isMap( descriptions ) ) {
			extender = <any> descriptions;
		} else if ( Utils.isObject( descriptions ) ) {
			extender = <any> Utils.M.from( descriptions );
		} else throw new Error( 'IllegalArgument' );

		if ( this.definitions.has( uri ) ) Utils.M.extend( this.definitions.get( uri ), extender );
		else this.definitions.set( uri, extender );
	}

	setDefinition( uri:string, descriptions:Map<string, RDF.PropertyDescription> ):void;
	setDefinition( uri:string, descriptions:Object ):void {
		var extender:Map<string, RDF.PropertyDescription>;
		if ( Utils.isMap( descriptions ) ) {
			extender = <any> descriptions;
		} else if ( Utils.isObject( descriptions ) ) {
			extender = <any> Utils.M.from( descriptions );
		} else throw new Error( 'IllegalArgument' );

		this.definitions.set( uri, extender );
	}

	deleteDefinition( uri:string ):void {
		this.definitions.delete( uri );
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