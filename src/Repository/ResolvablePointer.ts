import { _parseResourceParams, _parseURIParams } from "../DocumentsRepository/Utils";
import { IllegalArgumentError } from "../Errors/IllegalArgumentError";

import { ModelDecorator } from "../Model/ModelDecorator";
import { ModelPrototype } from "../Model/ModelPrototype";
import { ModelTypeGuard } from "../Model/ModelTypeGuard";

import { Pointer } from "../Pointer/Pointer";

import { isFunction, isObject, ObjectUtils } from "../Utils";

import { BaseResolvablePointer } from "./BaseResolvablePointer";
import { $Repository, Repository } from "./Repository";


/**
 * Interface that represents the base to any model that can be fetched by any {@link Repository}/{@link $Repository}.
 */
export interface ResolvablePointer extends Pointer, $Repository {
	/**
	 * Repository with request methods associated to the resource.
	 */
	$repository:Repository | $Repository;
	/**
	 * Identifier that describes the state of the last data retrieved.
	 */
	$eTag:string | undefined;

	$_resolved:boolean;
	/**
	 * Shallow copy of the pointer, which is used to track its changes.
	 */
	$_snapshot:object;


	/**
	 * Returns true when the pointer has been retrieved.
	 */
	$isResolved():boolean;


	/**
	 * Updates the snapshot with the current data of the resource.
	 */
	$_syncSnapshot():void;

	/**
	 * Returns true if the resource presents differences from its snapshot.
	 */
	$isDirty():boolean;

	/**
	 * Reverts the changes made to the resource into the state of the snapshot.
	 */
	$revert():void;


	/**
	 * Calls the `get` method of the associated repository,
	 * except the URI since it will be taken from the current resource.
	 * @param params Rest params required by the respective repository method.
	 */
	$get( ...params:any[] ):Promise<ResolvablePointer>;
	/**
	 * Calls the `get` method of the associated repository,
	 * with the specified URI.
	 * @param uri URI of the specific document.
	 * @param params Rest params required by the respective repository method.
	 */
	$get( uri:string, ...params:any[] ):Promise<ResolvablePointer>;

	/**
	 * Calls the `resolve` method of the associated repository,
	 * except the resource since it will be taken as the current resource.
	 * @param params Rest params required by the respective repository method.
	 */
	$resolve( ...params:any[] ):Promise<ResolvablePointer>;
	/**
	 * Calls the `resolve` method of the associated repository,
	 * with the specified resource.
	 * @param resource The specific resource.
	 * @param params The params required by the respective repository method.
	 */
	$resolve( resource:ResolvablePointer, ...params:any[] ):Promise<ResolvablePointer>;

	/**
	 * Calls the `exists` method of the associated repository,
	 * except the URI since it will be taken from the current resource.
	 * @param params Rest params required by the respective repository method.
	 */
	$exists( ...params:any[] ):Promise<boolean>;
	/**
	 * Calls the `exists` method of the associated repository,
	 * with the specified URI.
	 * @param uri URI of the specific document.
	 * @param params Rest params required by the respective repository method.
	 */
	$exists( uri:string, ...params:any[] ):Promise<boolean>;


	/**
	 * Calls the `refresh` method of the associated repository,
	 * except the resource since it will be taken as the current resource.
	 * @param params Rest params required by the respective repository method.
	 */
	$refresh( ...params:any[] ):Promise<ResolvablePointer>;
	/**
	 * Calls the `refresh` method of the associated repository,
	 * with the specified resource.
	 * @param resource The specific resource.
	 * @param params The params required by the respective repository method.
	 */
	$refresh( resource:ResolvablePointer, ...params:any[] ):Promise<ResolvablePointer>;

	/**
	 * Calls the `save` method of the associated repository,
	 * except the resource since it will be taken as the current resource.
	 * @param params Rest params required by the respective repository method.
	 */
	$save( ...params:any[] ):Promise<ResolvablePointer>;
	/**
	 * Calls the `save` method of the associated repository,
	 * with the specified resource.
	 * @param resource The specific resource.
	 * @param params The params required by the respective repository method.
	 */
	$save( resource:ResolvablePointer, ...params:any[] ):Promise<ResolvablePointer>;

	/**
	 * Calls the `saveAndRefresh` method of the associated repository,
	 * except the resource since it will be taken as the current resource.
	 * @param params Rest params required by the respective repository method.
	 */
	$saveAndRefresh( ...params:any[] ):Promise<ResolvablePointer>;
	/**
	 * Calls the `saveAndRefresh` method of the associated repository,
	 * with the specified resource.
	 * @param resource The specific resource.
	 * @param params The params required by the respective repository method.
	 */
	$saveAndRefresh( resource:ResolvablePointer, ...params:any[] ):Promise<ResolvablePointer>;


	/**
	 * Calls the `delete` method of the associated repository,
	 * except the URI since it will be taken from the current resource.
	 * @param params Rest params required by the respective repository method.
	 */
	$delete( ...params:any[] ):Promise<void>;
	/**
	 * Calls the `delete` method of the associated repository,
	 * with the specified URI.
	 * @param uri URI of the specific document.
	 * @param params Rest params required by the respective repository method.
	 */
	$delete( uri:string, ...params:any[] ):Promise<void>;
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


/**
 * Factory, decorator and utils for {@link ResolvablePointer}.
 */
export type ResolvablePointerFactory =
	& ModelPrototype<ResolvablePointer, Pointer>
	& ModelDecorator<ResolvablePointer, BaseResolvablePointer>
	& ModelTypeGuard<ResolvablePointer>
	;

/**
 * Constant that implements {@link ResolvablePointerFactory}.
 */
export const ResolvablePointer:ResolvablePointerFactory = {
	PROTOTYPE: {
		get $repository():Repository | $Repository {
			throw new IllegalArgumentError( `Property "$repository" is required.` );
		},

		$eTag: void 0,


		$_resolved: false,

		$isResolved( this:ResolvablePointer ):boolean {
			return this.$_resolved;
		},


		$_snapshot: {},

		$_syncSnapshot( this:{ types?:string[] } & ResolvablePointer ):void {
			const clone:{ types?:string[] } & ResolvablePointer = ObjectUtils.clone( this, { arrays: true } );
			if( this.types ) clone.types = [ ...this.types ];

			this.$_snapshot = clone;
		},

		$isDirty( this:ResolvablePointer ):boolean {
			return ! ObjectUtils
				.areEqual( this, this.$_snapshot, { arrays: true } );
		},

		$revert( this:{ types?:string[] } & ResolvablePointer ):void {
			__internalRevert( this, this.$_snapshot );
			if( ! this.types ) this.types = [];
		},


		$get( this:ResolvablePointer, uri?:string ):Promise<ResolvablePointer> {
			const { _uri, _args } = _parseURIParams( this, uri, arguments );
			return "$id" in this.$repository ?
				this.$repository.$get( _uri, ..._args ) :
				this.$repository.get( _uri, ..._args );
		},

		$resolve( this:ResolvablePointer, resource?:ResolvablePointer ):Promise<ResolvablePointer> {
			const { _resource, _args } = _parseResourceParams( this, resource, arguments );
			return "$id" in this.$repository ?
				this.$repository.$resolve( _resource, ..._args ) :
				this.$repository.resolve( _resource, ..._args );
		},

		$exists( this:ResolvablePointer, uri?:string ):Promise<boolean> {
			const { _uri, _args } = _parseURIParams( this, uri, arguments );
			return "$id" in this.$repository ?
				this.$repository.$exists( _uri, ..._args ) :
				this.$repository.exists( _uri, ..._args );
		},


		$refresh( this:ResolvablePointer, resource?:ResolvablePointer, ...args:any[] ):Promise<ResolvablePointer> {
			const { _resource, _args } = _parseResourceParams( this, resource, arguments );
			return "$id" in this.$repository ?
				this.$repository.$refresh( _resource, ..._args ) :
				this.$repository.refresh( _resource, ..._args );
		},

		$save( this:ResolvablePointer, resource?:ResolvablePointer, ...args:any[] ):Promise<ResolvablePointer> {
			const { _resource, _args } = _parseResourceParams( this, resource, arguments );
			return "$id" in this.$repository ?
				this.$repository.$save( _resource, ..._args ) :
				this.$repository.save( _resource, ..._args );
		},

		$saveAndRefresh( this:ResolvablePointer, resource?:ResolvablePointer, ...args:any[] ):Promise<ResolvablePointer> {
			const { _resource, _args } = _parseResourceParams( this, resource, arguments );
			return "$id" in this.$repository ?
				this.$repository.$saveAndRefresh( _resource, ..._args ) :
				this.$repository.saveAndRefresh( _resource, ..._args );
		},


		$delete( uri?:string, ...args:any[] ):Promise<void> {
			const { _uri, _args } = _parseURIParams( this, uri, arguments );
			return "$id" in this.$repository ?
				this.$repository.$delete( _uri, ..._args ) :
				this.$repository.delete( _uri, ..._args );
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
};
