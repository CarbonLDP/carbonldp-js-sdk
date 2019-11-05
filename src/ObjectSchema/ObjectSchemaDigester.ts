import { IllegalArgumentError } from "../Errors/IllegalArgumentError";
import { InvalidJSONLDSyntaxError } from "../Errors/InvalidJSONLDSyntaxError";

import { URI } from "../RDF/URI";

import * as Utils from "../Utils";

import { XSD } from "../Vocabularies/XSD";

import { ContainerType } from "./ContainerType";
import { DigestedObjectSchema } from "./DigestedObjectSchema";
import { DigestedObjectSchemaProperty } from "./DigestedObjectSchemaProperty";
import { ObjectSchema } from "./ObjectSchema";
import { ObjectSchemaProperty } from "./ObjectSchemaProperty";
import { ObjectSchemaUtils } from "./ObjectSchemaUtils";
import { PointerType } from "./PointerType";


/**
 * Service with static methods to standardize a JSON-LD Context Schema.
 */
export class ObjectSchemaDigester {

	/**
	 * Processes a schema to standardize it before using it.
	 * @param schema The object schema to process.
	 */
	static digestSchema( schema:ObjectSchema ):DigestedObjectSchema;
	/**
	 * Processes multiple schemas into a single one to standardize it before using it.
	 * @param schemas The object schemas to process.
	 */
	static digestSchema( schemas:ObjectSchema[] ):DigestedObjectSchema;
	static digestSchema( schemas:ObjectSchema | ObjectSchema[] ):DigestedObjectSchema {
		if( !Array.isArray( schemas ) ) return ObjectSchemaDigester._digestSchema( schemas );

		const digestedSchemas:DigestedObjectSchema[] = schemas
			.map( schema => ObjectSchemaDigester._digestSchema( schema ) );

		return ObjectSchemaDigester._combineSchemas( digestedSchemas );
	}

	/**
	 * Processes a schema property definition before using it.
	 * @param name The name of the property.
	 * @param definition The definition object of the property.
	 * @param digestedSchema Optional schema used to resolve relative URIs in the definition.
	 */
	static digestProperty( name:string, definition:ObjectSchemaProperty, digestedSchema?:DigestedObjectSchema ):DigestedObjectSchemaProperty {
		const digestedDefinition:DigestedObjectSchemaProperty = new DigestedObjectSchemaProperty();

		if( "@id" in definition ) {
			const uri:any = definition[ "@id" ];

			if( URI.isPrefixed( name ) ) throw new IllegalArgumentError( "A prefixed property cannot have assigned another URI." );
			if( !Utils.isString( uri ) ) throw new IllegalArgumentError( "@id needs to point to a string" );

			digestedDefinition.uri = uri;
		} else {
			digestedDefinition.uri = name;
		}

		if( "@type" in definition ) {
			let type:any = definition[ "@type" ];
			if( !Utils.isString( type ) ) throw new IllegalArgumentError( "@type needs to point to a string" );

			if( type === "@id" || type === "@vocab" ) {
				digestedDefinition.literal = false;
				digestedDefinition.pointerType = type === "@id" ? PointerType.ID : PointerType.VOCAB;

			} else {
				if( URI.isRelative( type ) && type in XSD ) type = XSD[ type ];

				digestedDefinition.literal = true;
				digestedDefinition.literalType = type;
			}
		}

		if( "@language" in definition ) {
			const language:string | undefined | null = definition[ "@language" ];
			if( language !== null && !Utils.isString( language ) ) throw new IllegalArgumentError( "@language needs to point to a string or null." );

			digestedDefinition.literal = true;
			digestedDefinition.language = language;
		}

		if( "@container" in definition ) {
			switch( definition[ "@container" ] ) {
				case "@set":
					digestedDefinition.containerType = ContainerType.SET;
					break;

				case "@list":
					digestedDefinition.containerType = ContainerType.LIST;
					break;

				case "@language":
					if( Utils.isString( digestedDefinition.language ) ) throw new IllegalArgumentError( "@container cannot be set to @language when the property definition already contains an @language tag." );
					digestedDefinition.containerType = ContainerType.LANGUAGE;
					break;

				default:
					throw new IllegalArgumentError( "@container needs to be equal to '@list', '@set', or '@language'" );
			}
		}

		return digestedSchema ?
			ObjectSchemaUtils._resolveProperty( digestedSchema, digestedDefinition, true ) :
			digestedDefinition;
	}

	/**
	 * Combines several standardized schemas into one.
	 * @param digestedSchemas The schemas to combine.
	 */
	static combineDigestedObjectSchemas( digestedSchemas:DigestedObjectSchema[] ):DigestedObjectSchema {
		if( digestedSchemas.length === 0 ) throw new IllegalArgumentError( "At least one DigestedObjectSchema needs to be specified." );

		digestedSchemas.unshift( new DigestedObjectSchema() );
		return ObjectSchemaDigester._combineSchemas( digestedSchemas );
	}

	/**
	 * Actual implementation of the standardization of a schema.
	 * @param schema The schema to process.
	 */
	static _digestSchema( schema:ObjectSchema ):DigestedObjectSchema {
		const digestedSchema:DigestedObjectSchema = new DigestedObjectSchema();

		for( const propertyName of [ "@base", "@vocab" ] as [ "@base", "@vocab" ] ) {
			if( !(propertyName in schema) ) continue;
			const value:string | undefined | null = schema[ propertyName ];

			if( value !== null && !Utils.isString( value ) ) throw new IllegalArgumentError( `The value of '${ propertyName }' must be a string or null.` );
			if( (propertyName === "@vocab" && value === "") || (value && !URI.isAbsolute( value ) && !URI.isBNodeID( value )) ) throw new IllegalArgumentError( `The value of '${ propertyName }' must be an absolute URI${ propertyName === "@base" ? " or an empty string" : "" }.` );

			digestedSchema[ propertyName.substr( 1 ) ] = value;
		}
		digestedSchema.base = digestedSchema.base || "";

		if( "@language" in schema ) {
			const value:string | undefined | null = schema[ "@language" ];
			if( value !== null && !Utils.isString( value ) ) throw new InvalidJSONLDSyntaxError( `The value of '@language' must be a string or null.` );
			digestedSchema.language = value;
		}

		for( const propertyName in schema ) {
			if( !schema.hasOwnProperty( propertyName ) ) continue;

			if( propertyName === "@reverse" ) continue;
			if( propertyName === "@index" ) continue;
			if( propertyName === "@base" ) continue;
			if( propertyName === "@vocab" ) continue;
			if( propertyName === "@language" ) continue;

			let propertyValue:string | ObjectSchemaProperty | null | undefined = schema[ propertyName ];

			if( Utils.isString( propertyValue ) ) {
				if( URI.isPrefixed( propertyName ) ) throw new IllegalArgumentError( "A prefixed property cannot be equal to another URI." );
				digestedSchema.prefixes.set( propertyName, propertyValue );

			} else if( !!propertyValue && Utils.isObject( propertyValue ) ) {
				const definition:DigestedObjectSchemaProperty = ObjectSchemaDigester.digestProperty( propertyName, propertyValue );
				digestedSchema.properties.set( propertyName, definition );

			} else {
				throw new IllegalArgumentError( "ObjectSchema Properties can only have string values or object values." );
			}
		}

		return digestedSchema;
	}

	/**
	 * Actual implementation of the schema combination.
	 * This method uses the first schema as the target schema where to combine the data.
	 *
	 * @param digestedSchemas The schemas to combine.
	 */
	static _combineSchemas( digestedSchemas:DigestedObjectSchema[] ):DigestedObjectSchema {
		const [ targetSchema, ...restSchemas ] = digestedSchemas;

		restSchemas.forEach( schema => {
			if( schema.vocab !== void 0 ) targetSchema.vocab = schema.vocab;
			if( schema.base !== "" ) targetSchema.base = schema.base;
			if( schema.language !== null ) targetSchema.language = schema.language;

			Utils.MapUtils.extend( targetSchema.prefixes, schema.prefixes );
			Utils.MapUtils.extend( targetSchema.properties, schema.properties );
		} );

		return targetSchema;
	}

}
