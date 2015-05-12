/// <reference path="../typings/es6-promise/es6-promise.d.ts" />
import App from './App';
import Parent from './Parent';
import * as RDF from './RDF';
import * as Utils from './Utils';

class Apps {
	// TODO: Get parent reference
	private parent:Parent;
	private containerURI:string;

	constructor( parent:Parent, containerURI:string ) {
		this.parent = parent;
		this.containerURI = containerURI;
	}

	get( uri:string ):Promise<App> {
		if ( RDF.URI.Util.isRelative( uri ) ) {
			if ( ! Utils.S.startsWith( uri, this.containerURI ) ) uri = RDF.URI.Util.resolve( this.containerURI, uri );
			this.parent.resolve( uri )
		}

		return new Promise<App>( function ( resolve, reject ) {
			// TODO: Implement
			reject( "Not implemented" );
		} );
	}
}

export default Apps;