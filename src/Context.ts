/// <reference path="../typings/es6/es6.d.ts" />

import Auth from "./Auth";
import Documents from "./Documents";
import * as Errors from "./Errors";
import * as RDF from "./RDF";
import * as Utils from "./Utils";

class Context {
	/* tslint:disable: variable-name */
	Auth:Auth;
	Documents:Documents;
	/* tslint:enable: variable-name */

	parentContext:Context;
	protected settings:Map<string, any>;
	protected definitions:Map<string, Map<string, RDF.PropertyDescription>>;

	constructor() {
		this.settings = new Map<string, any>();
		this.definitions = new Map<string, Map<string, RDF.PropertyDescription>>();

		this.Auth = new Auth( this );
		this.Documents = new Documents( this );
	}

	resolve( relativeURI:string ):string {
		throw new Errors.IllegalStateError( "Method needs to be implemented by child." );
	}

	hasSetting( name:string ):boolean {
		return (
			this.settings.has( name ) ||
			( this.parentContext && this.parentContext.hasSetting( name ) )
		);
	}

	getSetting( name:string ):any {
		if( this.settings.has( name ) ) return this.settings.get( name );
		if( this.parentContext && this.parentContext.hasSetting( name ) ) return this.parentContext.getSetting( name );
		return null;
	}

	setSetting( name:string, value:any ):any {
		this.settings.set( name, value );
	}

	deleteSetting( name:string ):any {
		this.settings.delete( name );
	}

	hasDefinition( uri:string ):boolean {
		if ( this.definitions.has( uri ) ) return true;
		if ( this.parentContext && this.parentContext.hasDefinition( uri ) ) return true;
		return false;
	}

	getDefinition( uri:string ):Map<string, RDF.PropertyDescription> {
		let descriptions:Map<string, RDF.PropertyDescription> = new Map<string, RDF.PropertyDescription>();
		if ( this.definitions.has( uri ) ) {
			Utils.M.extend<string, RDF.PropertyDescription>( descriptions, this.definitions.get( uri ) );
			if ( this.parentContext && this.parentContext.hasDefinition( uri ) ) Utils.M.extend( descriptions, this.parentContext.getDefinition( uri ) );
		}
		return descriptions;
	}

	getDefinitionURIs():string[] {
		let uris:string[] = Utils.A.from<string>( this.definitions.keys() );
		if ( this.parentContext ) uris = Utils.A.joinWithoutDuplicates<string>( uris, this.parentContext.getDefinitionURIs() );
		return uris;
	}

	addDefinition( uri:string, descriptions:Map<string, RDF.PropertyDescription> ):void;
	addDefinition( uri:string, descriptions:Object ):void;
	addDefinition( uri:string, descriptions:any ):void {
		let extender:Map<string, RDF.PropertyDescription>;
		if ( Utils.isMap( descriptions ) ) {
			extender = <any> descriptions;
		} else if ( Utils.isObject( descriptions ) ) {
			extender = <any> Utils.M.from( descriptions );
		} else throw new Errors.IllegalArgumentError( "descriptions must be a Map or an Object" );

		if ( this.definitions.has( uri ) ) {
			Utils.M.extend( this.definitions.get( uri ), extender );
		} else {
			this.definitions.set( uri, extender );
		}
	}

	setDefinition( uri:string, descriptions:Map<string, RDF.PropertyDescription> ):void;
	setDefinition( uri:string, descriptions:Object ):void {
		let extender:Map<string, RDF.PropertyDescription>;
		if ( Utils.isMap( descriptions ) ) {
			extender = <any> descriptions;
		} else if ( Utils.isObject( descriptions ) ) {
			extender = <any> Utils.M.from( descriptions );
		} else throw new Errors.IllegalArgumentError( "descriptions must be a Map or an Object" );

		this.definitions.set( uri, extender );
	}

	deleteDefinition( uri:string ):void {
		this.definitions.delete( uri );
	}
}

export default Context;
