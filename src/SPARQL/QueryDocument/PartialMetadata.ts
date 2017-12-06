import { IllegalArgumentError } from "../../Errors";
import { DigestedObjectSchema, DigestedPropertyDefinition } from "../../ObjectSchema";
import * as URI from "../../RDF/URI";

export class Class {
	readonly schema:DigestedObjectSchema;

	constructor( schema:DigestedObjectSchema, previousPartial?:Class ) {
		this.schema = previousPartial ? this.mergeSchemas( previousPartial.schema, schema ) : schema;
	}

	private mergeSchemas( oldSchema:DigestedObjectSchema, newSchema:DigestedObjectSchema ):DigestedObjectSchema {
		oldSchema.prefixes.forEach( ( oldURI, namespace ) => {
			if( ! newSchema.prefixes.has( namespace ) ) return newSchema.prefixes.set( namespace, oldURI );

			const newURI:URI.Class = newSchema.prefixes.get( namespace );
			if( newURI.stringValue !== oldURI.stringValue ) throw new IllegalArgumentError( `Prefix "${ namespace }" has different values: "${ oldURI.stringValue }", "${ newURI.stringValue }"` );
		} );

		oldSchema.properties.forEach( ( oldDefinition, propertyName ) => {
			if( ! newSchema.properties.has( propertyName ) ) return newSchema.properties.set( propertyName, oldDefinition );

			const newDefinition:DigestedPropertyDefinition = newSchema.properties.get( propertyName );
			for( const key in newDefinition ) {
				const newValue:any = newDefinition[ key ] instanceof URI.Class ? newDefinition[ key ].stringValue : newDefinition[ key ];
				const oldValue:any = oldDefinition[ key ] instanceof URI.Class ? oldDefinition[ key ].stringValue : oldDefinition[ key ];

				if( newValue !== oldValue ) throw new IllegalArgumentError( `Property "${ propertyName }" has different "${ key }": "${ oldValue }", "${ newValue }"` );
			}
		} );

		return newSchema;
	}

}

export default Class;
