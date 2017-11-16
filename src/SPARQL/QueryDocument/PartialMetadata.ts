import { DigestedObjectSchema, DigestedPropertyDefinition } from "../../ObjectSchema";
import { IRIToken, LiteralToken, OptionalToken, PredicateToken, PrefixedNameToken, PrefixToken, SubjectToken, VariableToken } from "sparqler/tokens";
import { M as MUtils } from "../../Utils";
import * as URI from "../../RDF/URI";
import { IllegalArgumentError } from "../../Errors";

export class Class {
	readonly schema:DigestedObjectSchema;
	readonly query:OptionalToken[];

	constructor( schema:DigestedObjectSchema, query:OptionalToken[], partialData?:Class ) {
		this.schema = partialData ? this.mergeSchemas( partialData.schema, schema ) : schema;
		this.query = partialData ? this.mergeQueries( partialData.query, query ) : query;
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
			for( const definitionProperty in newDefinition ) {
				const newValue:any = newDefinition[ definitionProperty ] instanceof URI.Class ? newDefinition[ definitionProperty ].stringValue : newDefinition[ definitionProperty ];
				const oldValue:any = oldDefinition[ definitionProperty ] instanceof URI.Class ? oldDefinition[ definitionProperty ].stringValue : oldDefinition[ definitionProperty ];

				if( newValue !== oldValue ) throw new IllegalArgumentError( `Property "${ propertyName }" has different "${ propertyName }": "${ oldValue }", "${ newValue }"` );
			}
		} );

		return newSchema;
	}

	private mergeQueries( oldQuery:OptionalToken[], newQuery:OptionalToken[] ):OptionalToken[] {
		const getPredicate:( optional:OptionalToken ) => string = optional =>
			`${ ( optional.patterns[ 0 ] as SubjectToken ).predicates[ 0 ] }`;

		const newPredicates:Set<string> = new Set( newQuery.map( getPredicate ) );

		oldQuery.forEach( optional => {
			const oldPredicate:string = getPredicate( optional );
			if( ! newPredicates.has( oldPredicate ) ) newQuery.push( optional );
		} );

		return newQuery;
	}

}

export default Class;
