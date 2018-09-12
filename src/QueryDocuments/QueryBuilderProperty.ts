import {
	FilterToken,
	IRIToken,
	LiteralToken,
	PatternToken,
	PropertyToken,
	SubjectToken,
	ValuesToken
} from "sparqler/tokens";

import { DigestedObjectSchema } from "../ObjectSchema/DigestedObjectSchema";
import { DigestedObjectSchemaProperty } from "../ObjectSchema/DigestedObjectSchemaProperty";
import { ObjectSchemaDigester } from "../ObjectSchema/ObjectSchemaDigester";

import { QueryBuilderPropertyData } from "./QueryBuilderPropertyData";
import { QueryProperty2 } from "./QueryProperty2";
import { SubQueryPropertyDefinition } from "./SubQueryPropertyDefinition";
import { _getMatchingDefinition } from "./Utils";


export class QueryBuilderProperty extends QueryProperty2 {
	readonly parent?:QueryBuilderProperty;

	protected readonly _types:string[];
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

		if( this._types.length ) {
			const types:IRIToken[] = this._types
				.map( type => this.queryContainer.compactIRI( type ) );

			patterns.push( new SubjectToken( this.variable )
				.addProperty( new PropertyToken( "a" )
					.addObject( ...types )
				)
			);
		}

		return patterns;
	}


	hasProperties():boolean {
		return this._subProperties.size !== 0
			|| this.__isComplete()
			;
	}

	addProperty( propertyName:string, propertyDefinition:SubQueryPropertyDefinition ):QueryBuilderProperty {
		return super
			.addProperty( propertyName, propertyDefinition ) as any;
	}

	protected __getInheritDefinition( propertyName:string, propertyURI?:string ):DigestedObjectSchemaProperty | undefined {
		const searchSchema:DigestedObjectSchema = this._getSearchSchema();
		const localDefinition:DigestedObjectSchemaProperty | undefined =
			_getMatchingDefinition( searchSchema, searchSchema, propertyName, propertyURI );

		if( localDefinition ) return localDefinition;

		const schemas:DigestedObjectSchema[] = this.queryContainer.context
			._getTypeObjectSchemas( this._types );

		for( const targetSchema of schemas ) {
			const definition:DigestedObjectSchemaProperty | undefined = _getMatchingDefinition(
				searchSchema,
				targetSchema,
				propertyName,
				propertyURI
			);

			if( definition ) return definition;
		}
	}

	protected __createPropertyFrom( data:QueryBuilderPropertyData ):QueryBuilderProperty {
		return new QueryBuilderProperty( data );
	}


	// Helpers for property specialization

	addType( type:string ):void {
		const schema:DigestedObjectSchema = this._getSearchSchema();
		const iri:string = schema.resolveURI( type, { vocab: true } );
		this._types.push( iri );

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
		return this._searchSchema = this.queryContainer.getGeneralSchema();
	}

}
