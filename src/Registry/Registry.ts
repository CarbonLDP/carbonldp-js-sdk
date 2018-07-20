import { IDAlreadyInUseError } from "../Errors/IDAlreadyInUseError";
import { IllegalArgumentError } from "../Errors/IllegalArgumentError";

import { BiModelDecorator } from "../Model/BiModelDecorator";
import { ModelDecorator } from "../Model/ModelDecorator";
import { ModelPrototype } from "../Model/ModelPrototype";

import { Pointer } from "../Pointer/Pointer";
import { $PointerLibrary, PointerLibrary } from "../Pointer/PointerLibrary";
import { $PointerValidator, PointerValidator } from "../Pointer/PointerValidator";

import { BaseRegisteredPointer } from "./BaseRegisteredPointer";
import { $BaseRegistry, BaseRegistry } from "./BaseRegistry";
import { RegisteredPointer } from "./RegisteredPointer";


export interface Registry<MODEL extends RegisteredPointer = RegisteredPointer> extends PointerLibrary, PointerValidator {
	// TODO: Change to unknown
	readonly registry:Registry<any> | $Registry<any> | undefined;

	readonly __modelDecorator:ModelDecorator<MODEL, BaseRegisteredPointer>;
	readonly __resourcesMap:Map<string, MODEL>;


	inScope( idOrPointer:string | Pointer ):boolean;
	inScope( idOrPointer:string | Pointer, local:true ):boolean;


	hasPointer( id:string ):boolean;
	hasPointer( id:string, local:true ):boolean;

	getPointer( id:string ):RegisteredPointer;
	getPointer( id:string, local:true ):MODEL;

	getPointers():RegisteredPointer[];
	getPointers( local:true ):MODEL[];

	removePointer( idOrPointer:string | RegisteredPointer ):boolean;
	removePointer( idOrPointer:string | RegisteredPointer, local:true ):boolean;


	_addPointer<T extends object>( pointer:T & Pointer ):T & MODEL;

	_getLocalID( id:string ):string;
}

export interface $Registry<MODEL extends RegisteredPointer = RegisteredPointer> extends Pointer, $PointerLibrary, $PointerValidator {
	// TODO: Change to unknown
	readonly $registry:Registry<any> | $Registry<any> | undefined;

	readonly $__modelDecorator:ModelDecorator<MODEL, BaseRegisteredPointer>;
	readonly $__resourcesMap:Map<string, MODEL>;


	$inScope( idOrPointer:string | Pointer ):boolean;
	$inScope( idOrPointer:string | Pointer, local:true ):boolean;


	$hasPointer( id:string ):boolean;
	$hasPointer( id:string, local:true ):boolean;

	$getPointer( id:string ):RegisteredPointer;
	$getPointer( id:string, local:true ):MODEL;

	$getPointers():RegisteredPointer[];
	$getPointers( local:true ):MODEL[];

	$removePointer( idOrPointer:string | RegisteredPointer ):boolean;
	$removePointer( idOrPointer:string | RegisteredPointer, local:true ):boolean;


	$_getLocalID( id:string ):string;

	$_addPointer<T extends object>( pointer:T & Pointer ):T & MODEL;
}


type AnyRegistry<MODEL extends RegisteredPointer = RegisteredPointer> = $Registry<MODEL> | Registry<MODEL>;

function __getResourcesMaps( this:void, registry:AnyRegistry ):Map<string, RegisteredPointer> {
	return "$id" in registry ? registry.$__resourcesMap : registry.__resourcesMap;
}

function __getParentResource( this:void, registry:AnyRegistry ):AnyRegistry | undefined {
	return "$id" in registry ? registry.$registry : registry.registry;
}

function __getDecorator( this:void, registry:AnyRegistry ):ModelDecorator<RegisteredPointer, BaseRegisteredPointer> {
	return "$id" in registry ?
		registry.$__modelDecorator : registry.__modelDecorator;
}

function __getLocalID( this:void, registry:AnyRegistry, id:string ):string {
	return "$id" in registry ?
		registry.$_getLocalID( id ) : registry._getLocalID( id );
}

function __addPointer( this:void, registry:AnyRegistry, pointer:Pointer ):RegisteredPointer {
	return "$id" in registry ?
		registry.$_addPointer( pointer ) : registry._addPointer( pointer );
}


function _inScope( this:AnyRegistry | undefined, idOrPointer:string | Pointer, local?:true ):boolean {
	if( ! this ) return false;

	try {
		const id:string = Pointer.getID( idOrPointer );
		__getLocalID( this, id );

		return true;
	} catch {
		if( local === true ) return false;

		const parentRegistry:AnyRegistry | undefined = __getParentResource( this );
		return _inScope.call( parentRegistry, idOrPointer );
	}
}

function _hasPointer( this:AnyRegistry | undefined, id:string, local?:true ):boolean {
	if( ! this ) return false;

	if( _inScope.call( this, id, true ) ) {
		const localID:string = __getLocalID( this, id );

		const resourcesMap:Map<string, RegisteredPointer> = __getResourcesMaps( this );
		if( resourcesMap.has( localID ) ) return true;
	}

	if( local === true ) return false;

	const parentRegistry:AnyRegistry | undefined = __getParentResource( this );
	return _hasPointer.call( parentRegistry, id );
}

function _getPointer( this:AnyRegistry, id:string, local?:true ):RegisteredPointer {
	const parentRegistry:AnyRegistry | undefined = __getParentResource( this );

	if( ! _inScope.call( this, id, true ) ) {
		if( local === true || ! parentRegistry ) throw new IllegalArgumentError( `"${ id }" is out of scope.` );
		return _getPointer.call( parentRegistry, id );
	}

	const localID:string = __getLocalID( this, id );

	const resourcesMap:Map<string, RegisteredPointer> = __getResourcesMaps( this );
	if( resourcesMap.has( localID ) ) return resourcesMap.get( localID );

	if( local !== true && _hasPointer.call( parentRegistry, id ) )
		return _getPointer.call( parentRegistry, id );

	return __addPointer( this, { $id: id } );
}

function _getPointers( this:AnyRegistry, local?:true ):RegisteredPointer[] {
	const resourcesMap:Map<string, RegisteredPointer> = __getResourcesMaps( this );

	const pointers:RegisteredPointer[] = Array.from( resourcesMap.values() );

	const parentRegistry:AnyRegistry | undefined = __getParentResource( this );
	if( local === true || ! parentRegistry ) return pointers;

	return [
		..._getPointers.call( parentRegistry ),
		...pointers,
	];
}

function _removePointer( this:AnyRegistry | undefined, idOrPointer:string | RegisteredPointer, local?:true ):boolean {
	if( ! this ) return false;

	const id:string = Pointer.getID( idOrPointer );
	if( _inScope.call( this, id, true ) ) {
		const localID:string = __getLocalID( this, id );

		const resourcesMap:Map<string, RegisteredPointer> = __getResourcesMaps( this );
		if( resourcesMap.delete( localID ) ) return true;
	}

	if( local === true ) return false;

	const parentRegistry:AnyRegistry | undefined = __getParentResource( this );
	return _removePointer.call( parentRegistry, idOrPointer );
}


function _addPointer<T extends object>( this:AnyRegistry, pointer:T & Pointer ):T & RegisteredPointer {
	if( ! pointer.$id ) throw new IllegalArgumentError( "The pointer $id cannot be empty." );

	const localID:string = __getLocalID( this, pointer.$id );

	const resourcesMap:Map<string, RegisteredPointer> = __getResourcesMaps( this );
	if( resourcesMap.has( localID ) ) throw new IDAlreadyInUseError( `"${ pointer.$id }" is already being used.` );

	const resource:T & RegisteredPointer = __getDecorator( this )
		.decorate( Object.assign<T, BaseRegisteredPointer>( pointer, {
			$registry: this,
		} ) );

	resourcesMap.set( localID, resource );

	return resource;
}

function _getLocalID( this:AnyRegistry, id:string ):string {
	return id;
}


// TODO: Use unknown
export type RegistryFactory =
	& ModelPrototype<Registry<any>>
	& BiModelDecorator<Registry, $Registry, BaseRegistry, $BaseRegistry>
	;

export const Registry:RegistryFactory = {
	PROTOTYPE: {
		registry: void 0,

		get __modelDecorator():ModelDecorator<RegisteredPointer> {
			throw new IllegalArgumentError( `Property "__modelDecorator" is required` );
		},

		get __resourcesMap():Map<string, RegisteredPointer> { return new Map(); },


		inScope: _inScope,


		hasPointer: _hasPointer,

		getPointer: _getPointer,

		getPointers: _getPointers,

		removePointer: _removePointer,


		_addPointer: _addPointer,

		_getLocalID: _getLocalID,
	},


	isDecorated<T extends object>( object:object ):object is any {
		return BiModelDecorator
			.hasPropertiesFrom( Registry.PROTOTYPE, object );
	},

	decorate<T extends object>( object:T ):T & any {
		if( Registry.isDecorated( object ) ) return object;

		return BiModelDecorator
			.definePropertiesFrom( Registry.PROTOTYPE, object );
	},
};
