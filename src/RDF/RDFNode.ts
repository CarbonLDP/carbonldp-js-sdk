import * as Utils from "./../Utils";
import * as Value from "./Value";

export interface Class {
	"@id":string;
}

export class Factory {
	static is( value:any ):boolean {
		return (
			( ! Utils.isNull( value ) ) &&
			Utils.isObject( value ) &&
			Utils.hasProperty( value, "@id" )
		);
	}

	static create( uri:string ):Class {
		return {
			"@id": uri
		};
	}
}

export class Util {
	static areEqual( node1:Class, node2:Class ):boolean {
		return node1[ "@id" ] === node2[ "@id" ];
	}

	static getPropertyURI( node:Class, predicate:string ):string {
		if( ! ( predicate in node ) ) return null;
		if( ! Utils.isArray( node[ predicate ] ) ) return null;
		let uri:string = node[ predicate ].find( ( value:Value.Class ) => Factory.is( value ) );

		return typeof uri !== "undefined" ? uri[ "@id" ] : null;
	}
}
