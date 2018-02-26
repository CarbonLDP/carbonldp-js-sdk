import { IllegalArgumentError } from "../../Errors";
import {
	DigestedObjectSchema,
	DigestedObjectSchemaProperty,
	ObjectSchemaUtils as SchemaUtils,
} from "../../ObjectSchema";

export const ALL:Readonly<DigestedObjectSchema> = Object.freeze( new DigestedObjectSchema() );

export class Class {
	readonly schema:DigestedObjectSchema;

	constructor( schema:DigestedObjectSchema, previousPartial?:Class ) {
		this.schema = this.mergeSchemas( previousPartial ? previousPartial.schema : new DigestedObjectSchema(), schema );
	}

	private mergeSchemas( oldSchema:DigestedObjectSchema, newSchema:DigestedObjectSchema ):DigestedObjectSchema {
		if( newSchema === ALL || oldSchema === ALL ) return ALL;

		newSchema.prefixes.forEach( ( newURI, namespace ) => {
			newURI = SchemaUtils.resolveURI( newURI, newSchema );
			if( ! oldSchema.prefixes.has( namespace ) ) return oldSchema.prefixes.set( namespace, newURI );

			const oldURI:string = oldSchema.prefixes.get( namespace );
			if( oldURI !== newURI ) throw new IllegalArgumentError( `Prefix "${ namespace }" has different values: "${ oldURI }", "${ newURI }"` );
		} );

		newSchema.properties.forEach( ( newDefinition, propertyName ) => {
			if( ! oldSchema.properties.has( propertyName ) ) return oldSchema.properties.set( propertyName, newDefinition );

			const oldDefinition:DigestedObjectSchemaProperty = oldSchema.properties.get( propertyName );
			for( const key in newDefinition ) {
				const newValue:any = newDefinition[ key ];
				const oldValue:any = oldDefinition[ key ];

				if( newValue !== oldValue ) throw new IllegalArgumentError( `Property "${ propertyName }" has different "${ key }": "${ oldValue }", "${ newValue }"` );
			}
		} );

		return oldSchema;
	}

}

export default Class;
