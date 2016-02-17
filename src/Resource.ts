import * as Document from "./Document";
import * as Errors from "./Errors";
import * as Pointer from "./Pointer";
import * as RDF from "./RDF";
import * as Utils from "./Utils";

export interface Class extends Pointer.Class {
	types:string[];
}

function hasType( type:string ):boolean {
	return this.types.indexOf( type ) !== -1;
}

export class Factory {
	static hasClassProperties( resource:Object ):boolean {
		return (
			Utils.hasPropertyDefined( resource, "types" )
		);
	}

	static create( id:string = null, types:string[] = null ):Class {
		return Factory.createFrom( {}, id, types );
	}

	static createFrom<T extends Object>( object:T, id:string = null, types:string[] = null ):T & Class {
		id = !! id ? id : "";
		types = !! types ? types : [];

		let resource:Class = Factory.decorate( object );
		resource.id = id;
		resource.types = types;

		return <any> resource;
	}

	static decorate<T extends Object>( object:T ):T & Class {
		Pointer.Factory.decorate<T>( object );

		if( Factory.hasClassProperties( object ) ) return <any> object;

		Object.defineProperties( object, {
			"types": {
				writable: true,
				enumerable: false,
				configurable: true,
				value: [],
			},
		} );

		return <any> object;
	}
}
