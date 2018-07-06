import {
	ModelDecorator,
	ModelFactory,
	ModelPrototype,
	ModelTypeGuard
} from "../Model";
import { Pointer } from "../Pointer";
import {
	isFunction,
	isObject,
	ObjectUtils
} from "../Utils";
import { BaseResolvablePointer } from "./BaseResolvablePointer";
import { Repository } from "./Repository";


export interface ResolvablePointer extends Pointer {
	$repository:Repository;
	$eTag:string | undefined;

	_resolved:boolean;
	_snapshot:object;

	isResolved():boolean;


	_syncSnapshot():void;

	isDirty():boolean;

	revert():void;
}


function __internalRevert( target:any, source:any ):void {
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

export type ResolvablePointerFactory =
	& ModelPrototype<ResolvablePointer, Pointer & BaseResolvablePointer>
	& ModelDecorator<ResolvablePointer, BaseResolvablePointer>
	& ModelTypeGuard<ResolvablePointer>
	& ModelFactory<ResolvablePointer, BaseResolvablePointer>
	;

export const ResolvablePointer:ResolvablePointerFactory = {
	PROTOTYPE: {
		$eTag: void 0,


		_resolved: false,

		isResolved( this:ResolvablePointer ):boolean {
			return this._resolved;
		},


		_snapshot: {},

		_syncSnapshot( this:{ types?:string[] } & ResolvablePointer ):void {
			const clone:{ types?:string[] } & ResolvablePointer = ObjectUtils.clone( this, { arrays: true } );
			if( clone.types ) clone.types = [ ...this.types ];

			this._snapshot = clone;
		},

		isDirty( this:ResolvablePointer ):boolean {
			return ! ObjectUtils
				.areEqual( this, this._snapshot, { arrays: true } );
		},

		revert( this:{ types?:string[] } & ResolvablePointer ):void {
			__internalRevert( this, this._snapshot );
			if( ! this.types ) this.types = [];
		},
	},


	isDecorated( object:object ):object is ResolvablePointer {
		return ModelDecorator
			.hasPropertiesFrom( ResolvablePointer.PROTOTYPE, object )
			;
	},

	decorate<T extends BaseResolvablePointer>( object:T ):T & ResolvablePointer {
		if( ResolvablePointer.isDecorated( object ) ) return object;

		const resource:T & Pointer = ModelDecorator
			.decorateMultiple( object, Pointer );

		return ModelDecorator
			.definePropertiesFrom( ResolvablePointer.PROTOTYPE, resource );
	},


	is( value:any ):value is ResolvablePointer {
		return Pointer.is( value )
			&& ResolvablePointer.isDecorated( value )
			;
	},


	create<T extends object>( data:T & BaseResolvablePointer ):T & ResolvablePointer {
		// FIXME
		return ResolvablePointer.createFrom( { ...data as any } );
	},

	createFrom<T extends object>( object:T & BaseResolvablePointer ):T & ResolvablePointer {
		return ResolvablePointer.decorate( object );
	},
};
