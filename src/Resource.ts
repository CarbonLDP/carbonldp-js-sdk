import * as Pointer from "./Pointer";
import * as Utils from "./Utils";

export interface Class extends Pointer.Class {
	types:string[];

	addType( type:string ):void;
	hasType( type:string ):boolean;
	removeType( type:string ):void;
}

function addType( type:string ):void {
	this.types.push( type );
}
function hasType( type:string ):boolean {
	return this.types.indexOf( type ) !== - 1;
}
function removeType( type:string ):void {
	let index:number = this.types.indexOf( type );
	if( index !== - 1 ) this.types.splice( index, 1 );
}

export class Factory {
	static hasClassProperties( object:Object ):boolean {
		return (
			Utils.hasPropertyDefined( object, "types" )

			&& Utils.hasFunction( object, "addType" )
			&& Utils.hasFunction( object, "hasType" )
			&& Utils.hasFunction( object, "removeType" )
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

			"addType": {
				writable: true,
				enumerable: false,
				configurable: true,
				value: addType,
			},
			"hasType": {
				writable: true,
				enumerable: false,
				configurable: true,
				value: hasType,
			},
			"removeType": {
				writable: true,
				enumerable: false,
				configurable: true,
				value: removeType,
			},
		} );

		return <any> object;
	}
}

export class Util {

	static hasType( resource:Object, type:string ):boolean {
		return Util.getTypes( resource ).indexOf( type ) !== - 1;
	}

	static getTypes( resource:Object ):string[] {
		return ( <Class> resource).types || [];
	}

}

export default Class;
