import { IllegalArgumentError } from "../../Errors";
import {
	DigestedObjectSchema,
	DigestedPropertyDefinition,
} from "../../ObjectSchema";
import * as URI from "../../RDF/URI";

export const ALL:Readonly<DigestedObjectSchema> = Object.freeze( new DigestedObjectSchema() );

export class Class {
	readonly schema:DigestedObjectSchema;

	constructor( schema:DigestedObjectSchema, previousPartial?:Class ) {
		this.schema = this.mergeSchemas( previousPartial ? previousPartial.schema : new DigestedObjectSchema(), schema );
	}

	private mergeSchemas( oldSchema:DigestedObjectSchema, newSchema:DigestedObjectSchema ):DigestedObjectSchema {
		if( newSchema === ALL || oldSchema === ALL ) return ALL;

		newSchema.prefixes.forEach( ( newURI, namespace ) => {
			if( ! oldSchema.prefixes.has( namespace ) ) return oldSchema.prefixes.set( namespace, newURI );

			const oldURI:URI.Class = oldSchema.prefixes.get( namespace );
			if( oldURI.stringValue !== newURI.stringValue ) throw new IllegalArgumentError( `Prefix "${ namespace }" has different values: "${ oldURI.stringValue }", "${ newURI.stringValue }"` );
		} );

		newSchema.properties.forEach( ( newDefinition, propertyName ) => {
			if( ! oldSchema.properties.has( propertyName ) ) return oldSchema.properties.set( propertyName, newDefinition );

			const oldDefinition:DigestedPropertyDefinition = oldSchema.properties.get( propertyName );
			for( const key in newDefinition ) {
				const newValue:any = newDefinition[ key ] instanceof URI.Class ? newDefinition[ key ].stringValue : newDefinition[ key ];
				const oldValue:any = oldDefinition[ key ] instanceof URI.Class ? oldDefinition[ key ].stringValue : oldDefinition[ key ];

				if( newValue !== oldValue ) throw new IllegalArgumentError( `Property "${ propertyName }" has different "${ key }": "${ oldValue }", "${ newValue }"` );
			}
		} );

		return oldSchema;
	}

}

export default Class;
