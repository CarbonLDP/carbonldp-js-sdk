import { FilterToken, IRIToken, OptionalToken, PredicateToken, PrefixedNameToken, SubjectToken, VariableToken } from "sparqler/tokens";

import { DigestedObjectSchema, DigestedPropertyDefinition, Digester, PropertyDefinition } from "../../ObjectSchema";
import { isObject } from "../../Utils";
import * as Pointer from "./../../Pointer";
import * as QueryContext from "./QueryContext";
import * as QueryObject from "./QueryObject";
import * as QueryPropertiesSchema from "./QueryPropertiesSchema";
import * as QueryProperty from "./QueryProperty";
import * as QueryPropertySchema from "./QueryPropertySchema";
import * as QueryValue from "./QueryValue";

const inherit:Readonly<{}> = Object.freeze( {} );

export class Class {
	inherit:Readonly<{}> = inherit;

	private _context:QueryContext.Class;
	private _schema:DigestedObjectSchema;
	private _document:QueryProperty.Class;
	private _typesPredicate:PredicateToken;

	constructor( queryContext:QueryContext.Class, property:QueryProperty.Class ) {
		this._context = queryContext;
		this._schema = queryContext.context.documents.getSchemaFor( {} );
		this._document = property
			.addPattern( new SubjectToken( property.variable )
				.addPredicate( this._typesPredicate = new PredicateToken( "a" )
					.addObject( queryContext.getVariable( property.name + "___type" ) ) ) );
	}

	property( name:string ):QueryProperty.Class {
		return this._context.getProperty( `${ this._document.name }.${ name }` );
	}

	value( value:string | number | boolean | Date ):QueryValue.Class {
		return new QueryValue.Class( this._context, value );
	}

	object( object:Pointer.Class | string ):QueryObject.Class {
		return new QueryObject.Class( this._context, object );
	}

	withType( type:string ):this {
		if( this._context.hasProperties( this._document.name ) ) throw new Error( "Types must be specified before the properties." );

		type = this._context.expandIRI( type );
		this._typesPredicate.addObject( this._context.compactIRI( type ) );

		const schema:DigestedObjectSchema = this._context.context.getObjectSchema( type );
		if( schema ) this._schema = Digester.combineDigestedObjectSchemas( [ this._schema, schema ] );

		return this;
	}

	properties( propertiesSchema:QueryPropertiesSchema.Class ):this {
		for( const propertyName in propertiesSchema ) {
			const queryProperty:QueryPropertySchema.Class | string = propertiesSchema[ propertyName ];
			const propertyDefinition:PropertyDefinition = isObject( queryProperty ) ? queryProperty : { "@id": queryProperty };
			const { uri, literalType } = this.addPropertyDefinition( propertyName, propertyDefinition );

			const name:string = `${ this._document.name }.${ propertyName }`;
			const propertyPath:IRIToken | PrefixedNameToken = this._context.compactIRI( uri.stringValue );
			const propertyObject:VariableToken = this._context.getVariable( name );

			const propertyPattern:OptionalToken = new OptionalToken()
				.addPattern( new SubjectToken( this._document.variable )
					.addPredicate( new PredicateToken( propertyPath )
						.addObject( propertyObject ) ) )
			;

			if( literalType ) propertyPattern
				.addPattern( new FilterToken( `datatype( ${ propertyObject } ) = ${ this._context.compactIRI( literalType.stringValue ) }` ) );

			// TODO: Process query

			this._context.addProperty( name, propertyPattern );
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

