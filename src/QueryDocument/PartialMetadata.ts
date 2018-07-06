import { IllegalArgumentError } from "../Errors";
import {
	DigestedObjectSchema,
	DigestedObjectSchemaProperty,
	ObjectSchemaUtils,
} from "../ObjectSchema";


export class PartialMetadata {

	static readonly ALL:Readonly<DigestedObjectSchema> = Object.freeze( new DigestedObjectSchema() );

	readonly schema:DigestedObjectSchema;

	constructor( schema:DigestedObjectSchema, previousPartial?:PartialMetadata ) {
		this.schema = this.mergeSchemas( previousPartial ? previousPartial.schema : new DigestedObjectSchema(), schema );
	}

	private mergeSchemas( oldSchema:DigestedObjectSchema, newSchema:DigestedObjectSchema ):DigestedObjectSchema {
		if( newSchema === PartialMetadata.ALL || oldSchema === PartialMetadata.ALL ) return PartialMetadata.ALL;

		newSchema.prefixes.forEach( ( newURI, namespace ) => {
			newURI = ObjectSchemaUtils.resolveURI( newURI, newSchema );
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
