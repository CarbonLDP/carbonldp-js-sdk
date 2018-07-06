import { isFunction } from "util";
import { ModelDecorator } from "../Model";
import {
	isObject,
	ObjectUtils,
	PickSelfProps,
} from "../Utils";
import { Resource } from "./Resource";


export interface PersistedResource extends Resource {
	_snapshot:object | undefined;

	_syncSnapshot():void;

	isDirty():boolean;

	revert():void;
}


function internalRevert( target:any, source:any ):void {
	if( ! isObject( target ) || ! isObject( source ) ) return;

	new Set<string>( [
		...Object.keys( target ),
		...Object.keys( source ),
	] ).forEach( key => {
		const sourceValue:any = Array.isArray( source[ key ] ) ?
			[ ...source[ key ] ] : source[ key ];

		if( sourceValue === null || sourceValue === void 0 ) {
			delete target[ key ];
			return;
		}

		if( isFunction( sourceValue ) ) return;

		target[ key ] = sourceValue;
	} );
}

const PROTOTYPE:PickSelfProps<PersistedResource, Resource> = {
	get _snapshot():{} { return {}; },

	_syncSnapshot( this:PersistedResource ):void {
		const clone:PersistedResource = ObjectUtils.clone( this, { arrays: true } );
		clone.types = [ ...this.types ];

		this._snapshot = clone;
	},

	isDirty( this:PersistedResource ):boolean {
		return ! ObjectUtils
			.areEqual( this, this._snapshot, { arrays: true } );
	},

	revert( this:PersistedResource ):void {
		internalRevert( this, this._snapshot );
		if( ! this.types ) this.types = [];
	},
};

export interface PersistedResourceFactory {
	PROTOTYPE:PickSelfProps<PersistedResource, Resource>;


	isDecorated( object:object ):object is PersistedResource;

	is( value:any ):value is PersistedResource;


	decorate<T extends object>( object:T ):T & PersistedResource;
}


export const PersistedResource:PersistedResourceFactory = {
	PROTOTYPE,


	isDecorated( object:object ):object is PersistedResource {
		return isObject( object )
			&& ModelDecorator
				.hasPropertiesFrom( PROTOTYPE, object )
			;
	},

	is( value:any ):value is PersistedResource {
		return isObject( value )
			&& PersistedResource.isDecorated( value )
			;
	},


	decorate<T extends object>( object:T ):T & PersistedResource {
		if( PersistedResource.isDecorated( object ) ) return object;

		const resource:T & Resource = Resource.decorate( object );

		return ModelDecorator
			.definePropertiesFrom( PROTOTYPE, resource );
	},
};
