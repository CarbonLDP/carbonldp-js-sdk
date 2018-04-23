import { Pointer } from "../Pointer";
import * as Utils from "../Utils";
import { BaseResource } from "./BaseResource";


export interface TransientResource extends Pointer {
	types:string[];


	addType( type:string ):void;

	hasType( type:string ):boolean;

	removeType( type:string ):void;
}

export interface TransientResourceFactory {
	isDecorated( object:object ):object is TransientResource;

	is( value:any ):value is TransientResource;


	create<T extends object>( data?:T & BaseResource ):T & TransientResource;

	createFrom<T extends object>( object:T & BaseResource ):T & TransientResource;

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

	is( value:any ):value is TransientResource {
		return Pointer.is( value )
			&& TransientResource.isDecorated( value );
	},

	create<T extends object>( data?:T & BaseResource ):T & TransientResource {
		const clone:T = Object.assign( {}, data );
		return TransientResource.createFrom<T>( clone );
	},

	createFrom<T extends object>( object:T & BaseResource ):T & TransientResource {
		return TransientResource.decorate<T>( object );
	},

	decorate<T extends object>( object:T ):T & TransientResource {
		if( TransientResource.isDecorated( object ) ) return object;

		const resource:T & TransientResource = object as T & TransientResource;
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
