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


/**
 * Interface with the base methods of a service that stores and manages an specific type of resources.
 */
export interface Registry<MODEL extends RegisteredPointer = RegisteredPointer> extends PointerLibrary, PointerValidator {
	/**
	 * Parent registry of the registry.
	 */
	readonly registry:Registry<any> | $Registry<any> | undefined;

	/**
	 * Decorator object to personalize the pointers of the registry.
	 */
	readonly __modelDecorator:ModelDecorator<MODEL, BaseRegisteredPointer>;
	/**
	 * Map where the resources of the registry are stored.
	 */
	readonly __resourcesMap:Map<string, MODEL>;


	/**
	 * Returns if the provided ID string or pointer can be stored in any of the registry hierarchy.
	 * @param idOrPointer The id or pointer to be checked.
	 */
	inScope( idOrPointer:string | Pointer ):boolean;
	/**
	 * Returns if the provided ID string or pointer can be only stored in the current registry.
	 * @param idOrPointer The id or pointer to be checked.
	 * @param local Flag to ignore hierarchy and only check in the current registry.
	 */
	inScope( idOrPointer:string | Pointer, local:true ):boolean;


	/**
	 * Returns true if a resource identified by the provided ID exists in the registry hierarchy.
	 * @param id ID to check its existence.
	 */
	hasPointer( id:string ):boolean;
	/**
	 * Returns true if a resource identified by the provided ID exists in the registry hierarchy.
	 * @param id ID to check its existence.
	 * @param local Flag to ignore hierarchy and only check in the current registry.
	 */
	hasPointer( id:string, local:true ):boolean;

	/**
	 * Returns the resource identified by the provided ID from the first existence in the registry hierarchy.
	 * If non exists, a pointer is created in the first register where the ID in scope of.
	 *
	 * A error is thrown when no pointer could be returned or created in any registry.
	 *
	 * @param id ID to return its pointer representation.
	 */
	getPointer( id:string ):RegisteredPointer;
	/**
	 * Returns the resource identified by the provided ID from the current registry.
	 * If non exists, a resource is created from the current registry model.
	 *
	 * A error is thrown when no pointer could be returned or created.
	 *
	 * @param id ID to check its existence.
	 * @param local Flag to ignore hierarchy and only return pointers from the current registry.
	 */
	getPointer( id:string, local:true ):MODEL;

	/**
	 * Returns all the pointers stored the registry hierarchy.
	 */
	getPointers():RegisteredPointer[];
	/**
	 * Returns all the pointers stored in the current registry.
	 * @param local Flag to ignore hierarchy and only return pointers from the current registry.
	 */
	getPointers( local:true ):MODEL[];

	/**
	 * Removes the resource identified by the provided string ID or {@link Pointer.$id}, from the first occurrence in the registry hierarchy.
	 * Returns true if the resource could be removed, false otherwise.
	 * @param idOrPointer ID or Pointer to be removed.
	 */
	removePointer( idOrPointer:string | RegisteredPointer ):boolean;
	/**
	 * Removes the resource identified by the provided string ID or {@link Pointer.$id}, from the first occurrence in the registry hierarchy.
	 * Returns true if the resource could be removed, false otherwise.
	 * @param idOrPointer ID or Pointer to be removed.
	 * @param local Flag to ignore hierarchy and only remove from the current registry.
	 */
	removePointer( idOrPointer:string | RegisteredPointer, local:true ):boolean;


	/**
	 * Adds the provided object as a resource of the registry.
	 * @param pointer The base object to be added as a resource of the registry.
	 */
	_addPointer<T extends object>( pointer:T & Pointer ):T & MODEL;

	/**
	 * Returns the local identifier for the ID provided.
	 * Throws and error if the ID cannot be converted into a local one.
	 * @param id The ID to be converted.
	 */
	_getLocalID( id:string ):string;
}

/**
 * Interface with the base methods of a model that stores and manages an specific type of resources.
 */
export interface $Registry<MODEL extends RegisteredPointer = RegisteredPointer> extends Pointer, $PointerLibrary, $PointerValidator {
	/**
	 * Parent registry of the registry.
	 */
	readonly $registry:Registry<any> | $Registry<any> | undefined;

	/**
	 * Decorator object to personalize the pointers of the registry.
	 */
	readonly $__modelDecorator:ModelDecorator<MODEL, BaseRegisteredPointer>;
	/**
	 * Map where the resources of the registry are stored.
	 */
	readonly $__resourcesMap:Map<string, MODEL>;


	/**
	 * Returns if the provided ID string or pointer can be stored in any of the registry hierarchy.
	 * @param idOrPointer The id or pointer to be checked.
	 */
	$inScope( idOrPointer:string | Pointer ):boolean;
	/**
	 * Returns if the provided ID string or pointer can be only stored in the current registry.
	 * @param idOrPointer The id or pointer to be checked.
	 * @param local Flag to ignore hierarchy and only check in the current registry.
	 */
	$inScope( idOrPointer:string | Pointer, local:true ):boolean;


	/**
	 * Returns true if a resource identified by the provided ID exists in the registry hierarchy.
	 * @param id ID to check its existence.
	 */
	$hasPointer( id:string ):boolean;
	/**
	 * Returns true if a resource identified by the provided ID exists in the registry hierarchy.
	 * @param id ID to check its existence.
	 * @param local Flag to ignore hierarchy and only check in the current registry.
	 */
	$hasPointer( id:string, local:true ):boolean;

	/**
	 * Returns the resource identified by the provided ID from the first existence in the registry hierarchy.
	 * If non exists, a pointer is created in the first register where the ID in scope of.
	 *
	 * A error is thrown when no pointer could be returned or created in any registry.
	 *
	 * @param id ID to return its pointer representation.
	 */
	$getPointer( id:string ):RegisteredPointer;
	/**
	 * Returns the resource identified by the provided ID from the current registry.
	 * If non exists, a resource is created from the current registry model.
	 *
	 * A error is thrown when no pointer could be returned or created.
	 *
	 * @param id ID to check its existence.
	 * @param local Flag to ignore hierarchy and only return pointers from the current registry.
	 */
	$getPointer( id:string, local:true ):MODEL;

	/**
	 * Returns all the pointers stored the registry hierarchy.
	 */
	$getPointers():RegisteredPointer[];
	/**
	 * Returns all the pointers stored in the current registry.
	 * @param local Flag to ignore hierarchy and only return pointers from the current registry.
	 */
	$getPointers( local:true ):MODEL[];

	/**
	 * Removes the resource identified by the provided string ID or {@link Pointer.$id}, from the first occurrence in the registry hierarchy.
	 * Returns true if the resource could be removed, false otherwise.
	 * @param idOrPointer ID or Pointer to be removed.
	 */
	$removePointer( idOrPointer:string | RegisteredPointer ):boolean;
	/**
	 * Removes the resource identified by the provided string ID or {@link Pointer.$id}, from the first occurrence in the registry hierarchy.
	 * Returns true if the resource could be removed, false otherwise.
	 * @param idOrPointer ID or Pointer to be removed.
	 * @param local Flag to ignore hierarchy and only remove from the current registry.
	 */
	$removePointer( idOrPointer:string | RegisteredPointer, local:true ):boolean;


	/**
	 * Returns the local identifier for the ID provided.
	 * Throws and error if the ID cannot be converted into a local one.
	 * @param id The ID to be converted.
	 */
	$_getLocalID( id:string ):string;

	/**
	 * Adds the provided object as a resource of the registry.
	 * @param pointer The base object to be added as a resource of the registry.
	 */
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


function __inScope( this:AnyRegistry | undefined, idOrPointer:string | Pointer, local?:true ):boolean {
	if( ! this ) return false;

	try {
		const id:string = Pointer.getID( idOrPointer );
		__getLocalID( this, id );

		return true;
	} catch {
		if( local === true ) return false;

		const parentRegistry:AnyRegistry | undefined = __getParentResource( this );
		return __inScope.call( parentRegistry, idOrPointer );
	}
}

function __hasPointer( this:AnyRegistry | undefined, id:string, local?:true ):boolean {
	if( ! this ) return false;

	if( __inScope.call( this, id, true ) ) {
		const localID:string = __getLocalID( this, id );

		const resourcesMap:Map<string, RegisteredPointer> = __getResourcesMaps( this );
		if( resourcesMap.has( localID ) ) return true;
	}

	if( local === true ) return false;

	const parentRegistry:AnyRegistry | undefined = __getParentResource( this );
	return __hasPointer.call( parentRegistry, id );
}

function __getPointer( this:AnyRegistry, id:string, local?:true ):RegisteredPointer {
	const parentRegistry:AnyRegistry | undefined = __getParentResource( this );

	if( ! __inScope.call( this, id, true ) ) {
		if( local === true || ! parentRegistry ) throw new IllegalArgumentError( `"${id}" is out of scope.` );
		return __getPointer.call( parentRegistry, id );
	}

	const localID:string = __getLocalID( this, id );

	const resourcesMap:Map<string, RegisteredPointer> = __getResourcesMaps( this );
	if( resourcesMap.has( localID ) ) return resourcesMap.get( localID )!;

	if( local !== true && __hasPointer.call( parentRegistry, id ) )
		return __getPointer.call( parentRegistry!, id );

	return __addPointer( this, { $id: id } );
}

function __getPointers( this:AnyRegistry, local?:true ):RegisteredPointer[] {
	const resourcesMap:Map<string, RegisteredPointer> = __getResourcesMaps( this );

	const pointers:RegisteredPointer[] = Array.from( resourcesMap.values() );

	const parentRegistry:AnyRegistry | undefined = __getParentResource( this );
	if( local === true || ! parentRegistry ) return pointers;

	return [
		...__getPointers.call( parentRegistry ),
		...pointers,
	];
}

function __removePointer( this:AnyRegistry | undefined, idOrPointer:string | RegisteredPointer, local?:true ):boolean {
	if( ! this ) return false;

	const id:string = Pointer.getID( idOrPointer );
	if( __inScope.call( this, id, true ) ) {
		const localID:string = __getLocalID( this, id );

		const resourcesMap:Map<string, RegisteredPointer> = __getResourcesMaps( this );
		if( resourcesMap.delete( localID ) ) return true;
	}

	if( local === true ) return false;

	const parentRegistry:AnyRegistry | undefined = __getParentResource( this );
	return __removePointer.call( parentRegistry, idOrPointer );
}


/**
 * Factory, decorator and utils for {@link Registry} and {@link $Registry}.
 */
export type RegistryFactory =
	& ModelPrototype<Registry<any>>
	& BiModelDecorator<Registry<any>, $Registry<any>, BaseRegistry, $BaseRegistry>
	;

/**
 * Constant that implements for {@link RegistryFactory}.
 */
export const Registry:{
	/**
	 * The object with the properties/methods to use in the decoration of a {@link Registry}
	 */
	PROTOTYPE: RegistryFactory["PROTOTYPE"];

	/**
	 * Checks if the Registry has the decorated properties and methods from its prototype.
	 */
	isDecorated<T extends object>( object:object ):object is any;

	/**
	 * Defines the Registry's prototype properties and methods to the Registry object.
	 */
	decorate<T extends object>( object:T ):T & any;
} = {
	PROTOTYPE: {
		registry: void 0,

		get __modelDecorator():ModelDecorator<RegisteredPointer> {
			throw new IllegalArgumentError( `Property "__modelDecorator" is required` );
		},

		get __resourcesMap():Map<string, RegisteredPointer> { return new Map(); },


		inScope: __inScope,


		hasPointer: __hasPointer,

		getPointer: __getPointer,

		getPointers: __getPointers,

		removePointer: __removePointer,


		_addPointer<T extends object>( this:AnyRegistry, pointer:T & Pointer ):T & RegisteredPointer {
			if( ! pointer.$id ) throw new IllegalArgumentError( "The pointer $id cannot be empty." );

			const localID:string = __getLocalID( this, pointer.$id );

			const resourcesMap:Map<string, RegisteredPointer> = __getResourcesMaps( this );
			if( resourcesMap.has( localID ) ) throw new IDAlreadyInUseError( `"${pointer.$id}" is already being used.` );

			const resource:T & RegisteredPointer = __getDecorator( this )
				.decorate( Object.assign<T, BaseRegisteredPointer>( pointer, {
					$registry: this,
				} ) );

			resourcesMap.set( localID, resource );

			return resource;
		},

		_getLocalID( this:AnyRegistry, id:string ):string {
			return id;
		},
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
