import { FilterToken, IRIToken, OptionalToken, PredicateToken, PrefixedNameToken, SubjectToken, ValuesToken, VariableToken } from "sparqler/tokens";

import { DigestedObjectSchema, DigestedPropertyDefinition, Digester, PropertyDefinition } from "../../ObjectSchema";
import { isObject } from "../../Utils";
import * as Pointer from "./../../Pointer";
import * as QueryContext from "./QueryContext";
import * as QueryObject from "./QueryObject";
import * as QueryPropertiesSchema from "./QueryPropertiesSchema";
import * as QueryProperty from "./QueryProperty";
import * as QueryPropertySchema from "./QueryPropertySchema";
import * as QueryValue from "./QueryValue";
import * as QueryVariable from "./QueryVariable";

const inherit:Readonly<{}> = Object.freeze( {} );

export class Class {
	inherit:Readonly<{}> = inherit;

	private _context:QueryContext.Class;
	private _schema:DigestedObjectSchema;
	private _document:QueryVariable.Class;

	constructor( queryContext:QueryContext.Class, name:string = "document" ) {
		this._context = queryContext;
		this._schema = queryContext.context.documents.getSchemaFor( {} );
		this._document = this._context.getVariable( name );
	}

	property( name:string ):QueryProperty.Class {
		return this._context.getProperty( name );
	}

	value( value:string | number | boolean | Date ):QueryValue.Class {
		return new QueryValue.Class( this._context, value );
	}

	object( object:Pointer.Class | string ):QueryObject.Class {
		return new QueryObject.Class( this._context, object );
	}

	withType( iriClass:string ):Class {
		// TODO:
		throw new Error( "Not implemented" );
	}

	properties( propertiesSchema:QueryPropertiesSchema.Class ):Class /*& QueryDocumentGetter*/ {
		for( const propertyName in propertiesSchema ) {
			const queryProperty:QueryPropertySchema.Class | string = propertiesSchema[ propertyName ];
			const propertyDefinition:PropertyDefinition = isObject( queryProperty ) ? queryProperty : { "@id": queryProperty };
			const { uri, literalType } = this.addPropertyDefinition( propertyName, propertyDefinition );

			const propertyPredicate:VariableToken = this._context.getVariable( propertyName + "_predicate" );
			const propertyPath:IRIToken | PrefixedNameToken = this._context.compactIRI( uri.stringValue );
			const propertyObject:VariableToken = this._context.getVariable( propertyName + "_object" );

			const propertyPattern:OptionalToken = new OptionalToken()
				.addPattern( new ValuesToken()
					.addValues( propertyPredicate, propertyPath ) )
				.addPattern( new SubjectToken( this._document )
					.addPredicate( new PredicateToken( propertyPredicate )
						.addObject( propertyObject ) ) )
			;

			if( literalType ) propertyPattern
				.addPattern( new FilterToken( `datatype( ${ propertyObject } ) = ${ this._context.compactIRI( literalType.stringValue ) }` ) );

			// TODO: Process query

			this._context.addProperty( propertyName, propertyPattern );
		}

		return this;
	}

	private addPropertyDefinition( propertyName:string, propertyDefinition:PropertyDefinition ):DigestedPropertyDefinition {
		const digestedDefinition:DigestedPropertyDefinition = Digester.digestPropertyDefinition( this._schema, propertyName, propertyDefinition );
		const inheritDefinition:DigestedPropertyDefinition = this._schema.properties.has( propertyName ) ?
			this._schema.properties.get( propertyName ) : this._context.getInheritTypeDefinition( propertyName, digestedDefinition.uri && digestedDefinition.uri.stringValue );

		if( inheritDefinition ) {
			for( const key in inheritDefinition ) {
				if( key !== "uri" && key in digestedDefinition ) continue;
				digestedDefinition[ key ] = inheritDefinition[ key ];
			}
		}

		if( ! digestedDefinition.uri ) throw new Error( `Invalid property "${ propertyName }" definition, URI "@id" is missing.` );

		this._schema.properties.set( propertyName, digestedDefinition );
		return digestedDefinition;
	}

}

export default Class;

