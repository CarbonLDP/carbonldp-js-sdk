import { FilterToken, IRIToken, LiteralToken, PropertyToken, SubjectToken, TermToken, ValuesToken } from "sparqler/tokens";

import { IllegalArgumentError } from "../Errors/IllegalArgumentError";
import { IllegalStateError } from "../Errors/IllegalStateError";

import { DigestedObjectSchema } from "../ObjectSchema/DigestedObjectSchema";
import { DigestedObjectSchemaProperty } from "../ObjectSchema/DigestedObjectSchemaProperty";
import { ObjectSchemaDigester } from "../ObjectSchema/ObjectSchemaDigester";
import { ObjectSchemaProperty } from "../ObjectSchema/ObjectSchemaProperty";

import { Pointer } from "../Pointer/Pointer";

import { isObject } from "../Utils";

import { QueryContextBuilder } from "./QueryContextBuilder";
import { QueryObject } from "./QueryObject";
import { QueryProperty, QueryPropertyType } from "./QueryProperty";
import { QuerySchema } from "./QuerySchema";
import { QuerySchemaProperty } from "./QuerySchemaProperty";
import { QueryValue } from "./QueryValue";
import { _createPropertyPatterns, _getParentPath } from "./Utils";


const INHERIT:Readonly<{}> = Object.freeze( {} );

export class QueryDocumentBuilder {
	static readonly ALL:Readonly<{}> = Object.freeze( {} );

	inherit:Readonly<{}> = INHERIT;
	all:Readonly<{}> = QueryDocumentBuilder.ALL;

	readonly _context:QueryContextBuilder;

	protected _document:QueryProperty;

	private _typesTriple:SubjectToken;
	private _values:ValuesToken;

	private _schema:DigestedObjectSchema;

	constructor( queryContext:QueryContextBuilder, property:QueryProperty ) {
		this._context = queryContext;

		property._builder = this;
		this._document = property;

		this._typesTriple = new SubjectToken( property.variable ).addProperty( new PropertyToken( "a" ) );
		this._values = new ValuesToken().addVariables( property.variable );

		this._schema = this._context.getGeneralSchema();
	}

	property( name?:string ):QueryProperty {
		if( name === void 0 ) return this._document;

		let parent:string = this._document.name;
		while( parent ) {
			const fullPath:string = `${ parent }.${ name }`;

			if( this._context.hasProperty( fullPath ) ) return this._context.getProperty( fullPath );

			const directPath:string = _getParentPath( fullPath );
			if( this._context.hasProperty( directPath ) ) {
				const direct:QueryProperty = this._context.getProperty( directPath );
				const directType:QueryPropertyType = direct.getType();
				if( directType === QueryPropertyType.FULL || directType === QueryPropertyType.ALL ) {
					const propertyName:string = fullPath.substr( directPath.length + 1 );
					return direct._builder._addProperty( propertyName, INHERIT );
				}
			}

			parent = _getParentPath( parent );
		}

		throw new IllegalArgumentError( `The "${ name }" property was not declared.` );
	}

	value( value:string | number | boolean | Date ):QueryValue {
		return new QueryValue( this._context, value );
	}

	object( object:Pointer | string ):QueryObject {
		return new QueryObject( this._context, object );
	}

	withType( type:string ):this {
		if( this._context.hasProperties( this._document.name ) ) throw new IllegalStateError( "Types must be specified before the properties." );

		type = this._schema.resolveURI( type, { vocab: true } );
		if( ! this._typesTriple.properties[ 0 ].objects.length )
			this._document.addPattern( this._typesTriple );

		this._typesTriple.properties[ 0 ].addObject( this._context.compactIRI( type ) );

		if( ! this._context.context ) return this;

		if( this._context.context.hasObjectSchema( type ) )
			ObjectSchemaDigester._combineSchemas( [
				this._schema,
				this._context.context.getObjectSchema( type ),
			] );

		return this;
	}

	properties( propertiesSchema:QuerySchema ):this {
		if( propertiesSchema === QueryDocumentBuilder.ALL ) {
			this._document.setType( QueryPropertyType.ALL );
			return this;
		}

		for( const propertyName in propertiesSchema ) {
			const queryPropertySchema:QuerySchemaProperty | string = propertiesSchema[ propertyName ];
			const propertyDefinition:QuerySchemaProperty = isObject( queryPropertySchema ) ? queryPropertySchema : { "@id": queryPropertySchema };

			this._addProperty( propertyName, propertyDefinition );
		}

		return this;
	}

	filter( constraint:string ):this {
		const [ baseName ]:string[] = this._document.name.split( "." );
		this._context
			.getProperty( baseName )
			.addPattern( new FilterToken( constraint ) );

		return this;
	}

	values( ...values:(QueryValue | QueryObject)[] ):this {
		const termTokens:(LiteralToken | IRIToken)[] = values.map( value => {
			const token:TermToken = value.getToken();
			if( token.token === "blankNode" ) throw new IllegalArgumentError( `Blank node "${ token.label }" is not a valid value.` );

			return token;
		} );

		// Add values pattern when used
		if( ! this._values.values[ 0 ].length ) {
			// Added in first for better performance
			this._document._patterns.unshift( this._values );
		}
		this._values.values[ 0 ].push( ...termTokens );

		let property:QueryProperty = this._document;
		while( property.isOptional() ) {
			property.setOptional( false );

			const parentPath:string = _getParentPath( property.name );
			property = this._context.getProperty( parentPath );
		}

		return this;
	}

	_addProperty( propertyName:string, propertyDefinition:QuerySchemaProperty ):QueryProperty {
		const digestedDefinition:DigestedObjectSchemaProperty = this.__addPropertyDefinition( propertyName, propertyDefinition );
		const name:string = `${ this._document.name }.${ propertyName }`;

		const property:QueryProperty = this._context
			.addProperty( name )
			.addPattern( ..._createPropertyPatterns(
				this._context,
				this._document.name,
				name,
				digestedDefinition
			) );

		if( "query" in propertyDefinition ) {
			if( digestedDefinition.literal === false ) {
				property.setType( QueryPropertyType.PARTIAL );
			}

			const builder:QueryDocumentBuilder = new QueryDocumentBuilder( this._context, property );
			if( builder !== propertyDefinition[ "query" ].call( void 0, builder ) )
				throw new IllegalArgumentError( "The provided query builder was not returned" );
		}

		this._document.addPattern( ...property.getPatterns() );

		return property;
	}

	private __addPropertyDefinition( propertyName:string, propertyDefinition:ObjectSchemaProperty ):DigestedObjectSchemaProperty {
		const digestedDefinition:DigestedObjectSchemaProperty = ObjectSchemaDigester.digestProperty( propertyName, propertyDefinition, this._schema );

		const uri:string = "@id" in propertyDefinition ? digestedDefinition.uri : void 0;
		const inheritDefinition:DigestedObjectSchemaProperty = this._context.getInheritTypeDefinition( this._schema, propertyName, uri );
		if( inheritDefinition ) {
			for( const key in inheritDefinition ) {
				if( digestedDefinition[ key ] !== null && key !== "uri" ) continue;
				digestedDefinition[ key ] = inheritDefinition[ key ];
			}
		}

		if( ! digestedDefinition.uri ) throw new IllegalArgumentError( `Invalid property "${ propertyName }" definition, "@id" is necessary.` );

		this._document.getSchema()
			.properties.set( propertyName, digestedDefinition );
		return digestedDefinition;
	}

}
