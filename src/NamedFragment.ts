import { Document } from "./Document";
import { Fragment } from "./Fragment";
import * as RDF from "./RDF";
import * as Utils from "./Utils";

export interface Class extends Fragment {
	slug:string;
}

export class Factory {
	static hasClassProperties( object:object ):boolean {
		return (
			Utils.hasPropertyDefined( object, "slug" ) && ! object.propertyIsEnumerable( "slug" )
		);
	}

	static create( slug:string, document:Document ):Class {
		return this.createFrom( {}, slug, document );
	}

	static createFrom<T extends Object>( object:T, slug:string, document:Document ):T & Class {
		let uri:string = document.id + "#" + slug;

		let fragment:Fragment = Fragment.createFrom( object, document, uri );

		if( this.hasClassProperties( fragment ) ) return <any> fragment;

		Object.defineProperties( fragment, {
			"slug": {
				enumerable: false,
				configurable: true,
				get: function():string {
					return RDF.URI.Util.getFragment( fragment.id );
				},
				set: function( value:string ):void {
					this.id = this.document.id + "#" + value;
				},
			},
		} );

		return <any>fragment;
	}
}

export default Class;
