import { Context } from "../Context/Context";

import { IllegalArgumentError } from "../Errors/IllegalArgumentError";

import { ModelDecorator } from "../Model/ModelDecorator";
import { ModelFactory } from "../Model/ModelFactory";
import { ModelPrototype } from "../Model/ModelPrototype";

import { ObjectSchemaResolver } from "../ObjectSchema/ObjectSchemaResolver";

import { Pointer } from "../Pointer/Pointer";

import { URI } from "../RDF/URI";
import { BaseRegistry } from "../Registry/BaseRegistry";

import { RegisteredPointer } from "../Registry/RegisteredPointer";
import { Registry } from "../Registry/Registry";

import { BaseResolvablePointer } from "../Repository/BaseResolvablePointer";

import { MapUtils } from "../Utils";

import { BaseGeneralRegistry } from "./BaseGeneralRegistry";
import { TypedModelDecorator } from "./TypedModelDecorator";


export interface GeneralRegistry<M extends RegisteredPointer = RegisteredPointer> extends Registry<M>, ObjectSchemaResolver {
	readonly context:Context<M>;
	readonly registry:GeneralRegistry | undefined;


	__modelDecorators:Map<string, TypedModelDecorator>;

	addDecorator( decorator:TypedModelDecorator ):this;

	decorate( object:{ types?:string[] } ):void;


	_addPointer<T extends object>( pointer:T & Pointer ):T & M;

	_getLocalID( id:string ):string;
}


export type OverloadedFns =
	| "context"
	| "registry"
	| "_addPointer"
	| "_getLocalID"
	;

export type GeneralRegistryFactory =
	& ModelPrototype<GeneralRegistry, Registry & ObjectSchemaResolver, OverloadedFns>
	& ModelDecorator<GeneralRegistry<any>, BaseGeneralRegistry>
	& ModelFactory<GeneralRegistry<any>, BaseGeneralRegistry>
	;

export const GeneralRegistry:GeneralRegistryFactory = {
	PROTOTYPE: {
		get context():Context {
			throw new IllegalArgumentError( "Property context is required." );
		},

		get registry( this:GeneralRegistry ):GeneralRegistry<any> | undefined {
			if( ! this.context || ! this.context.parentContext ) return;
			return this.context.parentContext.registry;
		},
		set registry( value:GeneralRegistry<any> ) {},


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
				.map( type => this.__modelDecorators.get( type ) )
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
				throw new IllegalArgumentError( `"${ uri }" is out of scope.` );

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
			.decorateMultiple( object, Registry as ModelDecorator<Registry, BaseRegistry>, ObjectSchemaResolver );

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
