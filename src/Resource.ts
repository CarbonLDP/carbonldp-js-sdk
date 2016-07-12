import * as Pointer from "./Pointer";
import * as Utils from "./Utils";

export interface Class extends Pointer.Class {
	types:string[];
}

export class Factory {
	static hasClassProperties( resource:Object ):boolean {
		return (
			Utils.hasPropertyDefined( resource, "types" )
		);
	}

	static is( object:Object ):boolean {
		return Pointer.Factory.is( object )
			&& Factory.hasClassProperties( object );
	}

	static create( id:string = null, types:string[] = null ):Class {
		return Factory.createFrom( {}, id, types );
	}

	static createFrom<T extends Object>( object:T, id:string = null, types:string[] = null ):T & Class {
		id = ! ! id ? id : ( (<any> object).id || "" );
		types = ! ! types ? types : ( (<any> object).types || [] );

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

export class Util {

	static hasType( resource:Class, type:string ):boolean {
		return Util.getTypes( resource ).indexOf( type ) !== - 1;
	}

	static getTypes( resource:Class ):string[] {
		return resource.types || [];
	}

}

export default Class;
