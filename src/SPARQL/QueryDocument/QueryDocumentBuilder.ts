import {
	FilterToken,
	IRIToken,
	LiteralToken,
	PredicateToken,
	PrefixedNameToken,
	SubjectToken,
	TermToken,
	ValuesToken,
} from "sparqler/tokens";

import { IllegalArgumentError } from "../../Errors/IllegalArgumentError";
import { IllegalStateError } from "../../Errors/IllegalStateError";
import {
	DigestedObjectSchema,
	DigestedObjectSchemaProperty,
	ObjectSchemaDigester,
	ObjectSchemaProperty,
	ObjectSchemaUtils,
} from "../../ObjectSchema";
import { Pointer } from "../../Pointer";
import { isObject } from "../../Utils";
import { QueryContextBuilder } from "./QueryContextBuilder";
import * as QueryObject from "./QueryObject";
import * as QueryPropertiesSchema from "./QueryPropertiesSchema";
import * as QueryProperty from "./QueryProperty";
import * as QueryPropertySchema from "./QueryPropertySchema";
import * as QueryValue from "./QueryValue";
import {
	createPropertyPatterns,
	getParentPath,
} from "./Utils";

const INHERIT:Readonly<{}> = Object.freeze( {} );

export const ALL:Readonly<{}> = Object.freeze( {} );

export class Class {
	inherit:Readonly<{}> = INHERIT;
	all:Readonly<{}> = ALL;

	readonly _context:QueryContextBuilder;

	protected _document:QueryProperty.Class;

	private _typesTriple:SubjectToken;
	private _values:ValuesToken;

	private _schema:DigestedObjectSchema;

	constructor( queryContext:QueryContextBuilder, property:QueryProperty.Class ) {
		this._context = queryContext;

		property._builder = this;
		this._document = property;

		this._typesTriple = new SubjectToken( property.variable ).addPredicate( new PredicateToken( "a" ) );
		this._values = new ValuesToken().addValues( property.variable );

		this._schema = this._context.getSchemaFor( { id: "" } );
	}

	property( name?:string ):QueryProperty.Class {
		if( name === void 0 ) return this._document;

		let parent:string = this._document.name;
		while( parent ) {
			const fullPath:string = `${ parent }.${ name }`;

			if( this._context.hasProperty( fullPath ) ) return this._context.getProperty( fullPath );

			const directPath:string = getParentPath( fullPath );
			if( this._context.hasProperty( directPath ) ) {
				const direct:QueryProperty.Class = this._context.getProperty( directPath );
				const directType:QueryProperty.PropertyType = direct.getType();
				if( directType === QueryProperty.PropertyType.FULL || directType === QueryProperty.PropertyType.ALL ) {
					const propertyName:string = fullPath.substr( directPath.length + 1 );
					return direct._builder._addProperty( propertyName, INHERIT );
				}
			}

			parent = getParentPath( parent );
		}

		throw new IllegalArgumentError( `The "${ name }" property was not declared.` );
	}

	value( value:string | number | boolean | Date ):QueryValue.Class {
		return new QueryValue.Class( this._context, value );
	}

	object( object:Pointer | string ):QueryObject.Class {
		return new QueryObject.Class( this._context, object );
	}

	withType( type:string ):this {
		if( this._context.hasProperties( this._document.name ) ) throw new IllegalStateError( "Types must be specified before the properties." );

		type = ObjectSchemaUtils.resolveURI( type, this._schema, { vocab: true, base: true } );
		if( ! this._typesTriple.predicates[ 0 ].objects.length )
			this._document.addPattern( this._typesTriple );

		this._typesTriple.predicates[ 0 ].addObject( this._context.compactIRI( type ) );

		if( ! this._context.context ) return this;

		const schema:DigestedObjectSchema = this._context.context.getObjectSchema( type );
		if( schema ) {
			this._schema = ObjectSchemaDigester.combineDigestedObjectSchemas( [ this._schema, schema ] );
		}

		return this;
	}

	properties( propertiesSchema:QueryPropertiesSchema.Class ):this {
		if( propertiesSchema === ALL ) {
			this._document.setType( QueryProperty.PropertyType.ALL );
			return this;
		}

		for( const propertyName in propertiesSchema ) {
			const queryPropertySchema:QueryPropertySchema.Class | string = propertiesSchema[ propertyName ];
			const propertyDefinition:QueryPropertySchema.Class = isObject( queryPropertySchema ) ? queryPropertySchema : { "@id": queryPropertySchema };

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

	values( ...values:( QueryValue.Class | QueryObject.Class )[] ):this {
		const termTokens:( LiteralToken | IRIToken | PrefixedNameToken )[] = values.map( value => {
			const token:TermToken = value.getToken();
			if( token.token === "blankNode" ) throw new IllegalArgumentError( `Blank node "${ token.label }" is not a valid value.` );

			return token;
		} );

		if( ! this._values.values[ 0 ].length ) this._document.addPattern( this._values );
		this._values.values[ 0 ].push( ...termTokens );

		let property:QueryProperty.Class = this._document;
		while( property.isOptional() ) {
			property.setOptional( false );

			const parentPath:string = getParentPath( property.name );
			property = this._context.getProperty( parentPath );
		}

		return this;
	}

	_addProperty( propertyName:string, propertyDefinition:QueryPropertySchema.Class ):QueryProperty.Class {
		const digestedDefinition:DigestedObjectSchemaProperty = this.addPropertyDefinition( propertyName, propertyDefinition );
		const name:string = `${ this._document.name }.${ propertyName }`;

		const property:QueryProperty.Class = this._context
			.addProperty( name )
			.addPattern( ...createPropertyPatterns(
				this._context,
				this._document.name,
				name,
				digestedDefinition
			) );

		if( "query" in propertyDefinition ) {
			if( digestedDefinition.literal === false ) {
				property.setType( QueryProperty.PropertyType.PARTIAL );
			}

			const builder:Class = new Class( this._context, property );
			if( builder !== propertyDefinition[ "query" ].call( void 0, builder ) )
				throw new IllegalArgumentError( "The provided query builder was not returned" );
		}

		this._document.addPattern( ...property.getPatterns() );

		return property;
	}

	private addPropertyDefinition( propertyName:string, propertyDefinition:ObjectSchemaProperty ):DigestedObjectSchemaProperty {
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

export default Class;
