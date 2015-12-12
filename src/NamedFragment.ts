import * as Document from "./Document";
import * as Fragment from "./Fragment";
import * as RDF from "./RDF";
import * as Utils from "./Utils";

export interface Class extends Fragment.Class {
	slug:string;
}

export class Factory {
	hasClassProperties( resource:Fragment.Class ):boolean {
		return (
			Utils.hasPropertyDefined( resource, "slug" )
		);
	}

	create( slug:string, document:Document.Class ):Class {
		return this.createFrom( {}, slug, document );
	}

	createFrom<T extends Object>( object:T, slug:string, document:Document.Class ):T & Class {
		let uri:string = document.uri + "#" + slug;

		let fragment:Fragment.Class = Fragment.factory.createFrom( object, uri, document );

		if( this.hasClassProperties( fragment ) ) return <any> fragment;

		Object.defineProperties( fragment, {
			"slug": {
				enumerable: false,
				configurable: true,
				get: function():string {
					return RDF.URI.Util.getFragment( fragment.uri );
				},
				set: function( value:string ):void {
					this.uri = this.document.uri + "#" + value;
				},
			},
		} );

		return <any>fragment;
	}
}

export var factory:Factory = new Factory();

export default Class;
