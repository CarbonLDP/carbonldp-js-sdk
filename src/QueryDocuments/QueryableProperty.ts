import { Path, PathBuilder } from "sparqler/patterns";
import { IllegalArgumentError } from "../Errors/IllegalArgumentError";
import { DigestedObjectSchema } from "../ObjectSchema/DigestedObjectSchema";

import { DigestedObjectSchemaProperty } from "../ObjectSchema/DigestedObjectSchemaProperty";
import { QueryablePropertyData } from "./QueryablePropertyData";

import { QueryContainerType } from "./QueryContainerType";
import { QueryPropertyType } from "./QueryPropertyType";
import { _getBestType } from "./Utils";


export class QueryableProperty {
	readonly name:string;
	readonly definition:DigestedObjectSchemaProperty;
	readonly pathBuilderFn?:( pathBuilder:PathBuilder ) => Path;

	propertyType?:QueryPropertyType;
	containerType?:QueryContainerType;

	optional:boolean;

	readonly subProperties:Map<string, QueryableProperty>;

	constructor( data:QueryablePropertyData, mergeData?:QueryablePropertyData ) {
		this.name = data.name;
		this.definition = data.definition;
		this.pathBuilderFn = data.pathBuilderFn;

		this.propertyType = data.propertyType;
		this.containerType = data.containerType;

		this.optional = data.optional;

		this.subProperties = new Map();

		if( mergeData ) this.__mergeData( mergeData );
	}


	getProperty( data:QueryablePropertyData ):QueryableProperty {
		if( ! this.subProperties.has( data.name ) ) {
			const property:QueryableProperty = new QueryableProperty( data );

			this.subProperties.set( data.name, property );
			return property;

		} else {
			const property:QueryableProperty = this.subProperties.get( data.name );

			property.__mergeData( data );
			return property;
		}
	}


	protected __mergeData( data:QueryablePropertyData ):void {
		this.propertyType = _getBestType( this.propertyType, data.propertyType );
		this.__mergeDefinition( data.definition );
	}

	protected __mergeDefinition( newDefinition:DigestedObjectSchemaProperty ):void {
		for( const key in newDefinition ) {
			const newValue:any = newDefinition[ key ];
			const oldValue:any = this.definition[ key ];

			if( newValue !== oldValue )
				throw new IllegalArgumentError( `Property "${ this.name }" has different "${ key }": "${ oldValue }", "${ newValue }".` );
		}
	}


	getSchema():DigestedObjectSchema {
		const schema:DigestedObjectSchema = new DigestedObjectSchema();

		this.subProperties.forEach( property => {
			schema.properties.set( property.name, property.definition );
		} );

		return schema;
	}

}
