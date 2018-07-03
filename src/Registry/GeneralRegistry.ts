import {
	ModelDecorator,
	ModelFactory,
	ModelPrototype
} from "../core";
import { IllegalArgumentError } from "../Errors";
import {
	DigestedObjectSchema,
	ObjectSchemaUtils
} from "../ObjectSchema";
import { Pointer } from "../Pointer";
import { URI } from "../RDF";
import { BaseRegistry } from "./BaseRegistry";
import { RegisteredPointer } from "./RegisteredPointer";
import { Registry } from "./Registry";
import { TypedModelDecorator } from "./TypedModelDecorator";


export interface GeneralRegistry<M extends RegisteredPointer = RegisteredPointer> extends Registry<M> {
	__modelDecorators:Map<string, TypedModelDecorator>;

	addDecorator( decorator:TypedModelDecorator ):this;

	decorate( object:{ types?:string[] } ):void;
}


export type OverloadedFns =
	| "_addPointer"
	| "__getLocalID"
	;

export type GeneralRegistryFactory =
	& ModelPrototype<GeneralRegistry, Registry, OverloadedFns>
	& ModelDecorator<GeneralRegistry<any>>
	& ModelFactory<GeneralRegistry<any>, BaseRegistry>
	;

export const GeneralRegistry:GeneralRegistryFactory = {
	PROTOTYPE: {
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
			const resource:T & RegisteredPointer = Registry.PROTOTYPE._addPointer.call( this, pointer );

			const schema:DigestedObjectSchema = this.$context.getObjectSchema();
			resource.$id = ObjectSchemaUtils.resolveURI( resource.$id, schema, { base: true } );

			return resource;
		},

		__getLocalID( this:GeneralRegistry, id:string ):string {
			const uri:string = Registry.PROTOTYPE.__getLocalID.call( this, id );

			if( ! URI.isBaseOf( this.$context.baseURI, uri ) )
				throw new IllegalArgumentError( `"${ uri }" is outside the scope of the registry.` );

			return URI.getRelativeURI( uri, this.$context.baseURI );
		},
	},


	isDecorated( object:object ):object is GeneralRegistry {
		return ModelDecorator
			.hasPropertiesFrom( GeneralRegistry.PROTOTYPE, object )
			;
	},

	decorate<T extends object>( object:T ):T & GeneralRegistry {
		if( GeneralRegistry.isDecorated( object ) ) return object;

		const resource:T & Registry = ModelDecorator
			.decorateMultiple( object, Registry );

		return ModelDecorator
			.definePropertiesFrom( GeneralRegistry.PROTOTYPE, resource );
	},


	create<T extends object>( data:T & BaseRegistry ):T & GeneralRegistry {
		// FIXME: TS 3.0
		return GeneralRegistry.createFrom( { ...data as any } );
	},

	createFrom<T extends object>( object:T & BaseRegistry ):T & GeneralRegistry {
		const registry:T & Registry = Registry.createFrom( object );
		return GeneralRegistry.decorate( registry );
	},
};
