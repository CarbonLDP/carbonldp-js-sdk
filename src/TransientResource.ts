import { ModelDecorator } from "./core/ModelDecorator";
import { ModelFactory } from "./core/ModelFactory";
import { Pointer } from "./Pointer";
import * as Utils from "./Utils";


export interface TransientResource extends Pointer {
	types:string[];


	addType( type:string ):void;

	hasType( type:string ):boolean;

	removeType( type:string ):void;
}

export interface TransientResourceFactory extends ModelFactory<TransientResource>, ModelDecorator<TransientResource> {
	isDecorated( object:object ):object is TransientResource;

	is( object:object ):object is TransientResource;


	create( id?:string, types?:string[] ):TransientResource;

	createFrom<T extends object>( object:T, id?:string, types?:string[] ):T & TransientResource;

	decorate<T extends object>( object:T ):T & TransientResource;
}


export function addTypeInResource( this:TransientResource, type:string ):void {
	if( this.types.indexOf( type ) !== - 1 ) return;

	this.types.push( type );
}

export function hasTypeInResource( this:TransientResource, type:string ):boolean {
	return this.types.indexOf( type ) !== - 1;
}

export function removeTypeInResource( this:TransientResource, type:string ):void {
	const index:number = this.types.indexOf( type );
	if( index !== - 1 ) this.types.splice( index, 1 );
}

export const TransientResource:TransientResourceFactory = {
	isDecorated( object:object ):object is TransientResource {
		return (
			Utils.hasPropertyDefined( object, "types" )

			&& Utils.hasFunction( object, "addType" )
			&& Utils.hasFunction( object, "hasType" )
			&& Utils.hasFunction( object, "removeType" )
		);
	},

	is( object:object ):object is TransientResource {
		return Pointer.is( object )
			&& TransientResource.isDecorated( object );
	},

	create( id?:string, types?:string[] ):TransientResource {
		return TransientResource.createFrom( {}, id, types );
	},

	createFrom<T extends object>( object:T, id?:string, types?:string[] ):T & TransientResource {
		const resource:T & TransientResource = TransientResource.decorate<T>( object );

		if( id ) resource.id = id;
		if( types ) resource.types = types;

		return resource;
	},

	decorate<T extends object>( object:T ):T & TransientResource {
		const resource:T & TransientResource = object as T & TransientResource;
		if( TransientResource.isDecorated( object ) ) return resource;

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
				value: addTypeInResource,
			},
			"hasType": {
				writable: true,
				enumerable: false,
				configurable: true,
				value: hasTypeInResource,
			},
			"removeType": {
				writable: true,
				enumerable: false,
				configurable: true,
				value: removeTypeInResource,
			},
		} );

		return resource;
	},
};
