import { Path, PathBuilder } from "sparqler/patterns";
import { IRIToken, LiteralToken } from "sparqler/tokens";

import { IllegalArgumentError } from "../Errors/IllegalArgumentError";

import { DigestedObjectSchema } from "../ObjectSchema/DigestedObjectSchema";
import { DigestedObjectSchemaProperty } from "../ObjectSchema/DigestedObjectSchemaProperty";

import { QueryablePropertyData } from "./QueryablePropertyData";
import { QueryPropertyType } from "./QueryPropertyType";
import { _getBestType } from "./Utils";


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


	setType( type:QueryPropertyType ):void {
		this.propertyType = _getBestType( this.propertyType, type );
	}


	setProperty( propertyName:string, property:QueryableProperty ):void {
		this.subProperties.set( propertyName, property );
	}

	getProperty( propertyName:string, data?:QueryablePropertyData ):QueryableProperty {
		if( ! this.subProperties.has( propertyName ) ) {
			if( ! data )
				throw new Error( `Property "${ propertyName }" doesn't exists.` );

			const property:QueryableProperty = new QueryableProperty( data );

			this.subProperties.set( propertyName, property );
			return property;

		} else {
			const property:QueryableProperty = this.subProperties.get( propertyName );

			if( data ) property
				.mergeData( propertyName, data );

			return property;
		}
	}


	mergeData( propertyName:string, data:QueryablePropertyData ):void {
		if( this === data ) return;

		this.setType( data.propertyType );
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


	getSchema():DigestedObjectSchema {
		const schema:DigestedObjectSchema = new DigestedObjectSchema();

		this.subProperties.forEach( ( property, propertyName ) => {
			schema.properties.set( propertyName, property.definition );
		} );

		return schema;
	}

}
