import { Path, PathBuilder } from "sparqler/patterns";
import { IRIToken, LiteralToken } from "sparqler/tokens";

import { IllegalArgumentError } from "../Errors/IllegalArgumentError";

import { DigestedObjectSchema } from "../ObjectSchema/DigestedObjectSchema";
import { DigestedObjectSchemaProperty } from "../ObjectSchema/DigestedObjectSchemaProperty";

import { QueryablePropertyData } from "./QueryablePropertyData";
import { QueryPropertyType } from "./QueryPropertyType";
import { _getBestType } from "./Utils";


/**
 * Metadata of a resource that has been queried.
 *
 * It is used in {@link QueryablePointer#$_queryableMetadata `QueryablePointer.$_queryableMetadata`}.
 */
// TODO: Fix link syntax
export class QueryableProperty {
	readonly definition:DigestedObjectSchemaProperty;
	readonly pathBuilderFn?:( pathBuilder:PathBuilder ) => Path;

	propertyType?:QueryPropertyType;
	optional:boolean;

	readonly subProperties:Map<string, QueryableProperty>;

	readonly values:(IRIToken | LiteralToken)[];


	constructor( data:QueryablePropertyData ) {
		this.definition = data.definition;
		this.pathBuilderFn = data.pathBuilderFn;

		this.propertyType = data.propertyType;

		this.optional = data.optional;

		this.subProperties = new Map();

		this.values = data.values
			? data.values
			: [];
	}


	/**
	 * Sets the type of content of the property.
	 * @param type
	 */
	setType( type:QueryPropertyType ):void {
		this.propertyType = _getBestType( this.propertyType!, type );
	}


	/**
	 * Stores the property with the specified name.
	 * @param propertyName Name of the property to store.
	 * @param property The property to be stored.
	 */
	setProperty( propertyName:string, property:QueryableProperty ):void {
		this.subProperties.set( propertyName, property );
	}

	/**
	 * Gets an existing property identified by the specified name, optionally merging with a {@param data} provided.
	 * If the property doesn't exists, one will be created using the suggested {@param data}.
	 * @param propertyName Name of the property to get/create.
	 * @param data The optional data of the property to create.
	 */
	getProperty( propertyName:string, data?:QueryablePropertyData ):QueryableProperty {
		if( !this.subProperties.has( propertyName ) ) {
			if( !data )
				throw new Error( `Property "${ propertyName }" doesn't exists.` );

			const property:QueryableProperty = new QueryableProperty( data );

			this.subProperties.set( propertyName, property );
			return property;

		} else {
			const property:QueryableProperty = this.subProperties.get( propertyName )!;

			if( data ) property
				.mergeData( propertyName, data );

			return property;
		}
	}


	/**
	 * Merge the provided {@param data} into the current property.
	 * @param propertyName Name of the current property.
	 * @param data Data to be merged.
	 */
	mergeData( propertyName:string, data:QueryablePropertyData ):void {
		if( this === data ) return;

		this.setType( data.propertyType! );
		this.__mergeDefinition( propertyName, data.definition );
	}

	// TODO: Improve merging
	protected __mergeDefinition( propertyName:string, newDefinition:DigestedObjectSchemaProperty ):void {
		for( const key in newDefinition ) {
			const oldValue:any = this.definition[ key ];
			const newValue:any = newDefinition[ key ];

			if( oldValue === null )
				this.definition[ key ] = newValue;

			if( newValue !== oldValue ) {
				throw new IllegalArgumentError( `Property "${ propertyName }" has different "${ key }": "${ oldValue }", "${ newValue }".` );
			}
		}
	}


	/**
	 * Returns the schema generated with the definitions of the stored properties.
	 */
	getSchema():DigestedObjectSchema {
		const schema:DigestedObjectSchema = new DigestedObjectSchema();

		this.subProperties.forEach( ( property, propertyName ) => {
			schema.properties.set( propertyName, property.definition );
		} );

		return schema;
	}

}
