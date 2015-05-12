/// <reference path="../typings/es6/es6.d.ts" />

import Documents from './Documents';
import Parent from './Parent';
import Resources from './Resources';
import * as RDF from './RDF';

class App implements Parent {
	Definitions:Map<string, RDF.PropertyDescription[]>;
	Documents:Documents;
	Resources:Resources;

	private parent:Parent;
	private base:string;

	constructor( parent:Parent, base:string ) {
		this.parent = parent;
		this.base = base;

		this.Definitions = new Map<string, RDF.PropertyDescription[]>();
		// TODO: Save app base URI
		this.Documents = new Documents( this );
		this.Resources = new Resources( this.Documents );
	}

	resolve( relativeURI:string ):string {
		var finalURI:string = this.parent.resolve( this.base );
		return RDF.URI.Util.resolve( finalURI, relativeURI );
	}
}
export default App;