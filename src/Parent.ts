/// <reference path="../typings/es6/es6.d.ts" />

import Auth from './Auth';
import Documents from './Documents';
import Resources from './Resources';
import * as RDF from './RDF';
import * as Utils from './Utils';

class Parent {
	Auth:Auth;
	Documents:Documents;
	Resources:Resources;

	parent:Parent;
	protected settings:Map<string, any>;
	protected definitions:Map<string, Map<string, RDF.PropertyDescription>>;

	constructor() {
		this.settings = new Map<string, any>();
		this.definitions = new Map<string, Map<string, RDF.PropertyDescription>>();

		this.Auth = new Auth( this );
		this.Documents = new Documents( this );
		this.Resources = new Resources( this );
	}

	resolve( relativeURI:string ):string {
		throw new Error( 'Method needs to be implemented by child.' );
	}

	hasSetting( name:string ):boolean {
		//@formatter:off
		return (
			this.settings.has( name ) ||
			( this.parent && this.parent.hasSetting( name ) )
		);
		//@formatter:off
	}

	getSetting( name:string ):any {
		if( this.settings.has( name ) ) return this.settings.get( name );
		if( this.parent && this.parent.hasSetting( name ) ) return this.parent.getSetting( name );
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
		if ( this.parent && this.parent.hasDefinition( uri ) ) return true;
		return false;
	}

	getDefinition( uri:string ):Map<string, RDF.PropertyDescription> {
		var descriptions:Map<string, RDF.PropertyDescription> = new Map<string, RDF.PropertyDescription>();
		if ( this.definitions.has( uri ) ) {
			Utils.M.extend<string, RDF.PropertyDescription>( descriptions, this.definitions.get( uri ) );
			if ( this.parent && this.parent.hasDefinition( uri ) ) Utils.M.extend( descriptions, this.parent.getDefinition( uri ) );
		}
		return descriptions;
	}

	getDefinitionURIs():string[] {
		var uris:string[] = Utils.A.from<string>( this.definitions.keys() );
		if ( this.parent ) uris = Utils.A.joinWithoutDuplicates<string>( uris, this.parent.getDefinitionURIs() );
		return uris;
	}

	addDefinition( uri:string, descriptions:Map<string, RDF.PropertyDescription> ):void;
	addDefinition( uri:string, descriptions:Object ):void;
	addDefinition( uri:string, descriptions:any ):void {
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

export default Parent;