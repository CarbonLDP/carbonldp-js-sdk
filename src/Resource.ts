import { ModelDecorator } from "./ModelDecorator";
import { ModelFactory } from "./ModelFactory";
import { Pointer } from "./Pointer";
import * as Utils from "./Utils";


export interface Resource extends Pointer {
	types:string[];


	addType( type:string ):void;

	hasType( type:string ):boolean;

	removeType( type:string ):void;
}

export interface ResourceFactory extends ModelFactory<Resource>, ModelDecorator<Resource> {
	isDecorated( object:object ):object is Resource;

	is( object:object ):object is Resource;


	create( id?:string, types?:string[] ):Resource;

	createFrom<T extends object>( object:T, id?:string, types?:string[] ):T & Resource;

	decorate<T extends object>( object:T ):T & Resource;
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

export const Resource:ResourceFactory = {
	isDecorated( object:object ):object is Resource {
		return (
			Utils.hasPropertyDefined( object, "types" )

			&& Utils.hasFunction( object, "addType" )
			&& Utils.hasFunction( object, "hasType" )
			&& Utils.hasFunction( object, "removeType" )
		);
	},

	is( object:object ):object is Resource {
		return Pointer.is( object )
			&& Resource.isDecorated( object );
	},

	create( id?:string, types?:string[] ):Resource {
		return Resource.createFrom( {}, id, types );
	},

	createFrom<T extends object>( object:T, id?:string, types?:string[] ):T & Resource {
		const resource:T & Resource = Resource.decorate<T>( object );

		if( id ) resource.id = id;
		if( types ) resource.types = types;

		return resource;
	},

	decorate<T extends object>( object:T ):T & Resource {
		const resource:T & Resource = object as T & Resource;
		if( Resource.isDecorated( object ) ) return resource;

		Pointer.decorate<T>( resource );

		Object.defineProperties( resource, {
			"types": {
				writable: true,
				enumerable: false,
				configurable: true,
				value: resource.types || [],
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

		return resource;
	},
};

export default Resource;
