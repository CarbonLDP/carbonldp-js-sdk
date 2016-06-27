import * as Utils from "./../Utils";

import * as Document from "./Document";
import * as Value from "./Value";

export interface Class {
	"@id":string;
}

export class Factory {
	static is( value:Object ):boolean {
		return Utils.hasProperty( value, "@id" )
			&& Utils.isString( value[ "@id" ] );
	}

	static create( uri:string ):Class {
		return {
			"@id": uri,
		};
	}
}

export class Util {
	static areEqual( node1:Class, node2:Class ):boolean {
		return node1[ "@id" ] === node2[ "@id" ];
	}

	static hasType( node:Class, type:string ):boolean {
		return Util.getTypes( node ).indexOf( type ) !== - 1;
	}

	static getTypes( node:Class ):string[] {
		if( ! ( "@type" in node ) ) return [];
		return node[ "@type" ];
	}

	static getPropertyURI( node:Class, predicate:string ):string {
		if( ! ( predicate in node ) ) return null;
		if( ! Utils.isArray( node[ predicate ] ) ) return null;
		let uri:string = node[ predicate ].find( ( value:Value.Class ) => Factory.is( value ) );

		return typeof uri !== "undefined" ? uri[ "@id" ] : null;
	}

	static getFreeNodes<T extends Object>( value:T ):Class[] {
		if( ! Utils.isArray( value ) ) return [];

		let array:any[] = <any> value;
		return array
			.filter( ( element ) => ! Document.Factory.is( element ) )
			.filter( ( element ) => Factory.is( element ) );
	}
}
