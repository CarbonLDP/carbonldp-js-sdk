import { IllegalArgumentError } from "../Errors/IllegalArgumentError";

import { DigestedObjectSchema } from "../ObjectSchema/DigestedObjectSchema";
import { DigestedObjectSchemaProperty } from "../ObjectSchema/DigestedObjectSchemaProperty";


export class QueryableMetadata {

	static readonly ALL:Readonly<DigestedObjectSchema> = Object.freeze( new DigestedObjectSchema() );

	readonly schema:DigestedObjectSchema;

	constructor( schema:DigestedObjectSchema, previousPartial?:QueryableMetadata ) {
		this.schema = this.__mergeSchemas( previousPartial ? previousPartial.schema : new DigestedObjectSchema(), schema );
	}

	private __mergeSchemas( oldSchema:DigestedObjectSchema, newSchema:DigestedObjectSchema ):DigestedObjectSchema {
		if( newSchema === QueryableMetadata.ALL || oldSchema === QueryableMetadata.ALL ) return QueryableMetadata.ALL;

		newSchema.prefixes.forEach( ( newURI, namespace ) => {
			newURI = newSchema.resolveURI( newURI );
			if( ! oldSchema.prefixes.has( namespace ) ) return oldSchema.prefixes.set( namespace, newURI );

			const oldURI:string = oldSchema.prefixes.get( namespace );
			if( oldURI !== newURI ) throw new IllegalArgumentError( `Prefix "${ namespace }" has different value: "${ oldURI }", "${ newURI }".` );
		} );

		newSchema.properties.forEach( ( newDefinition, propertyName ) => {
			if( ! oldSchema.properties.has( propertyName ) ) return oldSchema.properties.set( propertyName, newDefinition );

			const oldDefinition:DigestedObjectSchemaProperty = oldSchema.properties.get( propertyName );
			for( const key in newDefinition ) {
				const newValue:any = newDefinition[ key ];
				const oldValue:any = oldDefinition[ key ];

				if( newValue !== oldValue ) throw new IllegalArgumentError( `Property "${ propertyName }" has different "${ key }": "${ oldValue }", "${ newValue }".` );
			}
		} );

		return oldSchema;
	}

}
