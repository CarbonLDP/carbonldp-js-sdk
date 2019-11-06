import { GeneralRegistry } from "../GeneralRegistry/GeneralRegistry";
import { GeneralRepository } from "../GeneralRepository/GeneralRepository";

import { JSONLDConverter } from "../JSONLD/JSONLDConverter";

import { ModelSchema } from "../Model/ModelSchema";

import { DigestedObjectSchema } from "../ObjectSchema/DigestedObjectSchema";
import { ObjectSchema } from "../ObjectSchema/ObjectSchema";

import { RegisteredPointer } from "../Registry/RegisteredPointer";
import { ResolvablePointer } from "../Repository/ResolvablePointer";


/**
 * Interface that every context in the SDK must implement.
 */
export interface Context<REGISTRY extends RegisteredPointer | undefined = RegisteredPointer, REPOSITORY extends ResolvablePointer | undefined = ResolvablePointer> {
	/**
	 * Registry where the context stores its associated resources.
	 */
	readonly registry:REGISTRY extends {} ? GeneralRegistry<REGISTRY> : undefined;
	/**
	 * Repository that can fetch the data of the resources of the context.
	 */
	readonly repository:REPOSITORY extends {} ? GeneralRepository<REPOSITORY> : undefined;

	/**
	 * Base URI of the resources that can be used by the context.
	 */
	readonly baseURI:string;
	/**
	 * Parent context from where the context inherit some data, configurations and more.
	 */
	readonly parentContext:Context<any, any> | undefined;

	/**
	 * Converter of JSONLD objects associated to the current context.
	 */
	readonly jsonldConverter:JSONLDConverter;

	/**
	 * Resolved the relative URI provided with the base URI of the context.
	 * @param relativeURI The URI to be resolved.
	 */
	resolve( relativeURI:string ):string;

	/**
	 * Returns true if there is an object schema fot the specified type.
	 * @param type The URI of the type to check if has a schema.
	 */
	hasObjectSchema( type:string ):boolean;

	/**
	 * Returns the object schema for the specified type if provided, otherwise
	 * the general object schema will be the one returned.
	 * @param type The URI of the type to look for tis schema.
	 */
	getObjectSchema( type?:string ):DigestedObjectSchema;

	/**
	 * Extends the general object schema.
	 *
	 * If the first extension, the general schema of the parent context
	 * will be duplicated into the current before its extended.
	 *
	 * @param objectSchema The schema data from where to extend the general schema.
	 */
	extendObjectSchema( objectSchema:ObjectSchema ):this;
	/**
	 * Extends the schema of the type specified.
	 *
	 * If the first extension, the typed schema of the parent context
	 * will be duplicated into the current before its extended.
	 *
	 * @param type The URI of the type to extend its schema.
	 * @param objectSchema The schema data from where to extend the typed schema.
	 */
	extendObjectSchema( type:string, objectSchema:ObjectSchema ):this;
	/**
	 * Extends the schema of the type specified.
	 *
	 * The signature behaves as the previous one but uses {@link ModelSchema#TYPE `ModelSchema.TYPE`}
	 * as the type and {@link ModelSchema#SCHEMA `ModelSchema.SCHEMA`} as the schema data extender.
	 *
	 * @param modelSchema The object with the type and the schema to extend.
	 */
	// TODO: Fix link syntax
	extendObjectSchema( modelSchema:ModelSchema ):this;
	/**
	 * Extends a multiple of typed schemas using the interface {@link ModelSchema}
	 * or also extends the general schema when a direct object schema is provided.
	 *
	 * @param schemas The array of typed schemas and/or schemas to extend.
	 */
	extendObjectSchema( schemas:(ModelSchema | ObjectSchema)[] ):this;

	/**
	 * Remove the schema of a specific type if provided,
	 * or clear the general schema if no type is provided.
	 *
	 * @param type The URI of the type to remove its schema.
	 */
	clearObjectSchema( type?:string ):void;
}
