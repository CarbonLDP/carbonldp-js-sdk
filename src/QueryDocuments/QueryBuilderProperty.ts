import {
	FilterToken,
	IRIToken,
	LiteralToken,
	PatternToken,
	PropertyToken,
	SubjectToken,
	ValuesToken
} from "sparqler/tokens";

import { IllegalArgumentError } from "../Errors/IllegalArgumentError";

import { DigestedObjectSchema } from "../ObjectSchema/DigestedObjectSchema";
import { DigestedObjectSchemaProperty } from "../ObjectSchema/DigestedObjectSchemaProperty";
import { ObjectSchemaDigester } from "../ObjectSchema/ObjectSchemaDigester";

import { QueryableProperty } from "./QueryableProperty";
import { QueryBuilderPropertyData } from "./QueryBuilderPropertyData";
import { QueryPropertyType } from "./QueryPropertyType";
import { SubQueryPropertyDefinition } from "./SubQueryPropertyDefinition";
import { _getMatchDefinition, _getRootPath } from "./Utils";


export class QueryBuilderProperty extends QueryableProperty {
	readonly parent?:QueryBuilderProperty;

	protected readonly _types:IRIToken[];
	protected readonly _values:(LiteralToken | IRIToken)[];
	protected readonly _filters:string[];

	protected _searchSchema:DigestedObjectSchema | undefined;
	protected readonly _subProperties:Map<string, QueryBuilderProperty>;


	constructor( data:QueryBuilderPropertyData ) {
		super( data );

		this.parent = data.parent;

		this._types = [];
		this._values = [];
		this._filters = [];

		this._subProperties = new Map();
	}


	isComplete():boolean {
		return this.propertyType === QueryPropertyType.ALL
			|| this.propertyType === QueryPropertyType.FULL
			;
	}


	// Override for adding values and filters
	protected __createSearchPatterns():PatternToken[] {
		const patterns:PatternToken[] = [];

		const values:PatternToken | undefined = this.__createValuesPattern();
		if( values ) patterns.push( values );

		const supperPatterns:PatternToken[] = super.__createSearchPatterns();
		patterns.push( ...supperPatterns );

		if( this._filters.length ) {
			const filters:FilterToken[] = this._filters
				.map( constraint => new FilterToken( constraint ) );
			patterns.push( ...filters );
		}

		return patterns;
	}

	protected __createValuesPattern():ValuesToken | undefined {
		if( ! this._values.length ) return;

		const values:ValuesToken = new ValuesToken()
			.addVariables( this.variable );

		this._values
			.forEach( value => values.addValues( value ) );

		return values;
	}

	// Override for adding types specification
	protected __createTypesSearchPatterns():PatternToken[] {
		const patterns:PatternToken[] = super.__createTypesSearchPatterns();

		if( this._types.length ) patterns
			.push( new SubjectToken( this.variable )
				.addProperty( new PropertyToken( "a" )
					.addObject( ...this._types )
				)
			);

		return patterns;
	}


	hasProperties():boolean {
		return this._subProperties.size !== 0
			|| this.isComplete()
			;
	}

	getProperty( path?:string, flags?:{ create:true, inherit?:false } ):QueryBuilderProperty | undefined {
		if( ! path ) return this;

		const rootPath:string = _getRootPath( path );
		const property:QueryBuilderProperty | undefined = this._subProperties.get( rootPath );

		if( ! property ) {
			// If immediate child and can be created in valid property
			if( rootPath === path && flags && flags.create && this.isComplete() ) {
				const newProperty:QueryBuilderProperty = this.addProperty( rootPath, flags );
				newProperty.setType( QueryPropertyType.ALL );

				return newProperty;
			}

			return;
		}

		const restPath:string = path.substr( rootPath.length + 1 );
		return property.getProperty( restPath );
	}

	addProperty( propertyName:string, propertyDefinition:SubQueryPropertyDefinition ):QueryBuilderProperty {
		const definition:DigestedObjectSchemaProperty = this
			.__getDefinition( propertyName, propertyDefinition );

		const property:QueryBuilderProperty = new QueryBuilderProperty( {
			queryContainer: this.queryContainer,
			parent: this,

			name: propertyName,

			definition,
			pathBuilderFn: propertyDefinition.path,
			optional: true,
		} );

		this._subProperties.set( propertyName, property );
		return property;
	}

	protected __getDefinition( propertyName:string, propertyDefinition:SubQueryPropertyDefinition ):DigestedObjectSchemaProperty {
		const digestedDefinition:DigestedObjectSchemaProperty = ObjectSchemaDigester
			.digestProperty( propertyName, propertyDefinition, this._getSearchSchema() );

		if( propertyDefinition.inherit === false ) return digestedDefinition;

		const propertyURI:string | undefined = "@id" in propertyDefinition ? digestedDefinition.uri : void 0;
		const inheritDefinition:DigestedObjectSchemaProperty | undefined = this.__getInheritDefinition( propertyName, propertyURI );

		if( inheritDefinition ) {
			for( const key in inheritDefinition ) {
				if( digestedDefinition[ key ] !== null && key !== "uri" ) continue;
				digestedDefinition[ key ] = inheritDefinition[ key ];
			}
		}

		if( ! digestedDefinition.uri )
			throw new IllegalArgumentError( `Invalid property "${ propertyName }" definition, "@id" is necessary.` );

		return digestedDefinition;
	}

	protected __getInheritDefinition( propertyName:string, propertyURI?:string ):DigestedObjectSchemaProperty | undefined {
		const searchSchema:DigestedObjectSchema = this._getSearchSchema();
		const localDefinition:DigestedObjectSchemaProperty | undefined =
			_getMatchDefinition( searchSchema, searchSchema, propertyName, propertyURI );

		if( localDefinition ) return localDefinition;

		return this.queryContainer
			._getInheritDefinition( searchSchema, propertyName, propertyURI );
	}


	// Helpers for property specialization

	addType( type:string ):void {
		const schema:DigestedObjectSchema = this._getSearchSchema();
		const iri:string = schema.resolveURI( type, { vocab: true } );

		const iriToken:IRIToken = this.queryContainer.compactIRI( iri );
		this._types.push( iriToken );

		if( ! this.queryContainer.context.hasObjectSchema( iri ) ) return;

		const typedSchema:DigestedObjectSchema = this.queryContainer.context.getObjectSchema( iri );
		ObjectSchemaDigester._combineSchemas( [ schema, typedSchema ] );
	}

	addValues( values:(LiteralToken | IRIToken)[] ):void {
		this._values.push( ...values );
	}

	addFilter( constraint:string ):void {
		this._filters.push( constraint );
	}

	setObligatory( flags?:{ inheritParents:true } ):void {
		if( ! this.optional ) return;

		this.optional = false;

		if( flags && flags.inheritParents && this.parent )
			this.parent.setObligatory( flags );
	}


	// Helper for schema related actions
	protected _getSearchSchema():DigestedObjectSchema {
		if( this._searchSchema ) return this._searchSchema;
		return this._searchSchema = this.queryContainer.context.getObjectSchema();
	}

}
