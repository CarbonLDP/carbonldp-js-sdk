import * as Utils from "../Utils";

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
}
