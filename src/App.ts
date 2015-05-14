/// <reference path="../typings/es6/es6.d.ts" />

import Documents from './Documents';
import Parent from './Parent';
import Resources from './Resources';
import * as RDF from './RDF';
import * as Utils from './Utils';

class App implements Parent {

	Documents:Documents;
	Resources:Resources;

	private definitions:Map<string, Map<string, RDF.PropertyDescription>>;
	private parent:Parent;
	private base:string;

	constructor( parent:Parent, base:string ) {
		this.parent = parent;
		this.base = base;

		this.definitions = new Map<string, Map<string, RDF.PropertyDescription>>();
		// TODO: Save app base URI
		this.Documents = new Documents( this );
		this.Resources = new Resources( this );
	}

	resolve( relativeURI:string ):string {
		var finalURI:string = this.parent.resolve( this.base );
		return RDF.URI.Util.resolve( finalURI, relativeURI );
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
export default App;