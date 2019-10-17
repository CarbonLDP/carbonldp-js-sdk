import { Context } from "../Context/Context";

import { IllegalArgumentError } from "../Errors/IllegalArgumentError";

import { ModelDecorator } from "../Model/ModelDecorator";
import { ModelFactory } from "../Model/ModelFactory";
import { ModelPrototype } from "../Model/ModelPrototype";

import { ObjectSchemaResolver } from "../ObjectSchema/ObjectSchemaResolver";

import { Pointer } from "../Pointer/Pointer";

import { URI } from "../RDF/URI";

import { RegisteredPointer } from "../Registry/RegisteredPointer";
import { Registry } from "../Registry/Registry";

import { BaseResolvablePointer } from "../Repository/BaseResolvablePointer";

import { MapUtils } from "../Utils";

import { BaseGeneralRegistry } from "./BaseGeneralRegistry";
import { TypedModelDecorator } from "./TypedModelDecorator";


/**
 * Base registry used by {@link Context}.
 */
export interface GeneralRegistry<M extends RegisteredPointer = RegisteredPointer> extends Registry<M>, ObjectSchemaResolver {
	/**
	 * Context where the registry belongs to.
	 */
	readonly context:Context<M, any>;
	/**
	 * Parent registry used to inherit resources and more data.
	 */
	readonly registry:GeneralRegistry | undefined;


	/**
	 * Map that stores the decorators in the registry.
	 */
	__modelDecorators:Map<string, TypedModelDecorator>;

	/**
	 * Stores a decorator in the current registry.
	 * @param decorator The information of the decorator to store.
	 */
	addDecorator( decorator:TypedModelDecorator ):this;

	/**
	 * Applies the corresponding decorators in the entire registry tree.
	 * @param object with an array of types used to match the decorator to be applied.
	 */
	decorate( object:{ types?:string[] } ):void;


	/**
	 * @see {@link Registry._addPointer}
	 */
	_addPointer<T extends object>( pointer:T & Pointer ):T & M;

	/**
	 * @see {@link Registry._getLocalID}
	 */
	_getLocalID( id:string ):string;
}


export type OverloadedFns =
	| "context"
	| "registry"
	| "_addPointer"
	| "_getLocalID"
	;

/**
 * Factory, decorator and utils for {@link GeneralRegistry}.
 */
export type GeneralRegistryFactory =
	& ModelPrototype<GeneralRegistry, Registry & ObjectSchemaResolver, OverloadedFns>
	& ModelDecorator<GeneralRegistry<any>, BaseGeneralRegistry>
	& ModelFactory<GeneralRegistry<any>, BaseGeneralRegistry>
	;

/**
 * Constant with the factory, decorator and/or utils for a {@link GeneralRegistry} object.
 */
export const GeneralRegistry:{
	/**
	 * The object with the properties/methods to use in the decoration of a {@link GeneralRegistry}.
	 */
	PROTOTYPE: GeneralRegistryFactory["PROTOTYPE"];

	/**
	 * Checks if the GeneralRegistry has the decorated properties and methods from its prototype.
	 */
	isDecorated( object:object): object is GeneralRegistry;

	/**
	 * Defines the GeneralRegistry's prototype properties and methods to the GeneralRegistry object.
	 */
	decorate<T extends object>( object:T &  BaseGeneralRegistry ):T & GeneralRegistry<any>;

	/**
	 * Creates a {@link GeneralRegistry} with the provided data.
	 */
	create<T extends object>( data:T & BaseGeneralRegistry ):T & GeneralRegistry<any>

	/**
	 * Creates a {@link GeneralRegistry} from the provided object.
	 */
	createFrom<T extends object>( object:T & BaseGeneralRegistry ):T & GeneralRegistry<any>
} = <GeneralRegistryFactory> {
	PROTOTYPE: {
		get context():Context {
			throw new IllegalArgumentError( "Property context is required." );
		},

		get registry( this:GeneralRegistry ):GeneralRegistry<any> | undefined {
			if( ! this.context || ! this.context.parentContext ) return;
			return this.context.parentContext.registry;
		},
		set registry( value:GeneralRegistry<any> | undefined ) {},


		get __modelDecorators():Map<string, TypedModelDecorator> { return new Map(); },


		addDecorator( this:GeneralRegistry, decorator:TypedModelDecorator ):GeneralRegistry {
			if( ! decorator.TYPE ) throw new IllegalArgumentError( "No TYPE specified in the model decorator." );

			this.__modelDecorators.set( decorator.TYPE, decorator );
			return this;
		},

		decorate( this:GeneralRegistry, object:{ types?:string[] } ):void {
			if( ! object.types ) return;

			object.types
				.filter( type => this.__modelDecorators.has( type ) )
				.map( type => this.__modelDecorators.get( type )! )
				.forEach( decorator => decorator.decorate( object ) )
			;
		},


		_addPointer<T extends object>( this:GeneralRegistry, pointer:T & Pointer ):T & RegisteredPointer {
			if( this.context.repository )
				Object.assign<T, BaseResolvablePointer>( pointer, { $repository: this.context.repository } );

			const resource:T & RegisteredPointer = Registry.PROTOTYPE._addPointer.call( this, pointer );

			resource.$id = this.context.getObjectSchema().resolveURI( resource.$id, { base: true } );

			return resource;
		},

		_getLocalID( this:GeneralRegistry, id:string ):string {
			const uri:string = this.context.getObjectSchema().resolveURI( id, { base: true } );

			if( ! URI.isAbsolute( uri ) || ! URI.isBaseOf( this.context.baseURI, uri ) )
				throw new IllegalArgumentError( `"${uri}" is out of scope.` );

			return URI.getRelativeURI( uri, this.context.baseURI );
		},
	},


	isDecorated( object:object ):object is GeneralRegistry {
		return ModelDecorator
			.hasPropertiesFrom( GeneralRegistry.PROTOTYPE, object )
			;
	},

	decorate<T extends BaseGeneralRegistry>( object:T ):T & GeneralRegistry {
		if( GeneralRegistry.isDecorated( object ) ) return object;

		const target:T & Registry & ObjectSchemaResolver = ModelDecorator
			.decorateMultiple( object, Registry, ObjectSchemaResolver );

		if( ! target.context ) delete target.context;

		return ModelDecorator
			.definePropertiesFrom( GeneralRegistry.PROTOTYPE, target );
	},


	create<T extends object>( data:T & BaseGeneralRegistry ):T & GeneralRegistry {
		// FIXME: TS 3.0
		return GeneralRegistry.createFrom( { ...data as any } );
	},

	createFrom<T extends object>( object:T & BaseGeneralRegistry ):T & GeneralRegistry {
		const registry:T & GeneralRegistry = GeneralRegistry.decorate( object );

		if( registry.registry )
			MapUtils.extend( registry.__modelDecorators, registry.registry.__modelDecorators );

		return registry;
	},
};
