import { Path, PathBuilder } from "sparqler/patterns";
import {
	FilterToken,
	GraphToken, GroupPatternToken,
	IRIToken,
	LiteralToken,
	OptionalToken,
	PathToken,
	PatternToken,
	PropertyToken,
	SubjectToken,
	SubSelectToken,
	ValuesToken
} from "sparqler/tokens";

import { IllegalActionError } from "../Errors/IllegalActionError";

import { DigestedObjectSchema } from "../ObjectSchema/DigestedObjectSchema";
import { DigestedObjectSchemaProperty } from "../ObjectSchema/DigestedObjectSchemaProperty";
import { ObjectSchemaDigester } from "../ObjectSchema/ObjectSchemaDigester";

import { LDP } from "../Vocabularies/LDP";

import { QueryablePropertyData } from "./QueryablePropertyData";
import { QueryContainer } from "./QueryContainer";
import { QueryContainerType } from "./QueryContainerType";
import { QueryPropertyData } from "./QueryPropertyData";
import { QueryPropertyType } from "./QueryPropertyType";
import { QuerySubPropertyData } from "./QuerySubPropertyData";
import { QueryVariable } from "./QueryVariable";
import { SubQueryPropertyDefinition } from "./SubQueryPropertyDefinition";
import { _getBestType, _getMatchingDefinition, _getRootPath } from "./Utils";


export class QueryProperty implements QueryablePropertyData {
	readonly queryContainer:QueryContainer;
	readonly parent?:QueryProperty;

	readonly name:string;
	readonly fullName:string;

	get variable():QueryVariable {
		return this.queryContainer.getVariable( this.fullName );
	}

	readonly definition:DigestedObjectSchemaProperty;
	readonly pathBuilderFn?:( pathBuilder:PathBuilder ) => Path;

	propertyType?:QueryPropertyType;
	containerType?:QueryContainerType;

	optional:boolean;


	readonly subProperties:Map<string, QueryProperty>;


	protected readonly _types:string[];
	protected readonly _values:(LiteralToken | IRIToken)[];
	protected readonly _filters:string[];

	protected _searchSchema:DigestedObjectSchema | undefined;


	constructor( data:QueryPropertyData ) {
		this.queryContainer = data.queryContainer;
		this.parent = data.parent;

		this.name = data.name;
		this.fullName = data.parent
			? data.parent.fullName + "." + data.name
			: data.name;

		this.definition = data.definition;
		this.pathBuilderFn = data.pathBuilderFn;

		this.propertyType = data.propertyType;
		this.containerType = data.containerType;

		this.optional = data.optional === void 0
			? true
			: data.optional;

		this.subProperties = new Map();

		this._types = [];
		this._values = [];
		this._filters = [];
	}


	// Sub-properties helpers

	hasProperties():boolean {
		return this.subProperties.size !== 0
			|| this._isComplete()
			;
	}

	getProperty( path?:string, flags?:{ create:true, inherit?:false } ):QueryProperty | undefined {
		if( ! path ) return this;

		const rootPath:string = _getRootPath( path );
		const property:QueryProperty | undefined = this.subProperties.get( rootPath );

		if( ! property ) {
			// If immediate child and can be created in valid property
			if( rootPath === path && flags && flags.create && this._isComplete() ) {
				const newProperty:QueryProperty = this.addProperty( rootPath, flags );
				newProperty.setType( QueryPropertyType.ALL );

				return newProperty;
			}

			return;
		}

		const restPath:string = path.substr( rootPath.length + 1 );
		return property.getProperty( restPath );
	}

	addProperty( propertyName:string, propertyDefinition:SubQueryPropertyDefinition ):QueryProperty {
		const definition:DigestedObjectSchemaProperty = this
			.__getDefinition( propertyName, propertyDefinition );

		return this._addSubProperty( propertyName, {
			definition,
			pathBuilderFn: propertyDefinition.path,
		} );
	}

	_addSubProperty( propertyName:string, data:QuerySubPropertyData ):QueryProperty {
		const property:QueryProperty = new QueryProperty( {
			...data,
			name: propertyName,
			queryContainer: this.queryContainer,
			parent: this,
		} );

		this.subProperties.set( propertyName, property );

		return property;
	}

	protected __getDefinition( propertyName:string, propertyDefinition:SubQueryPropertyDefinition ):DigestedObjectSchemaProperty {
		const digestedDefinition:DigestedObjectSchemaProperty = this.queryContainer
			.digestProperty( propertyName, propertyDefinition );

		if( propertyDefinition.inherit === false ) return digestedDefinition;

		const propertyURI:string | undefined = "@id" in propertyDefinition ? digestedDefinition.uri : void 0;
		const inheritDefinition:DigestedObjectSchemaProperty | undefined = this
			.__getInheritDefinition( propertyName, propertyURI );

		if( inheritDefinition ) {
			for( const key in inheritDefinition ) {
				if( digestedDefinition[ key ] !== null && key !== "uri" ) continue;
				digestedDefinition[ key ] = inheritDefinition[ key ];
			}
		}

		return digestedDefinition;
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

	_isComplete():boolean {
		return this.propertyType === QueryPropertyType.ALL
			|| this.propertyType === QueryPropertyType.FULL
			;
	}

	_isPartial():boolean {
		return this.propertyType === QueryPropertyType.PARTIAL
			|| this.propertyType === QueryPropertyType.ALL
			|| ! ! this.subProperties.size
			;
	}


	// Helpers for property specialization

	setType( type:QueryPropertyType ):void {
		this.propertyType = _getBestType( this.propertyType, type );
	}

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


	// Tokens creation helpers

	protected __getVariable( name:string ):QueryVariable {
		return this.queryContainer
			.getVariable( `${ this.fullName }.${ name }` );
	}

	protected __createIRIToken():IRIToken {
		return this
			.queryContainer
			.compactIRI( this.definition.uri );
	}

	protected __createPathToken():PathToken {
		if( ! this.pathBuilderFn )
			return this.__createIRIToken();

		const pathBuilder:PathBuilder = PathBuilder
			.createFrom( this.queryContainer, {} );

		return this.pathBuilderFn
			.call( void 0, pathBuilder )
			.getPath();
	}


	// Self description patterns

	getSelfPattern():PatternToken {
		const pattern:PatternToken = this.__createSelfPattern();

		if( ! this.optional ) return pattern;
		return new OptionalToken()
			.addPattern( pattern );
	}

	protected __createSelfPattern():PatternToken {
		switch( this.containerType ) {
			case QueryContainerType.DOCUMENT:
				return this.__createDocumentSelfPattern();

			case QueryContainerType.CHILDREN:
				return this.__createChildSelfPattern();

			case QueryContainerType.MEMBERS:
				return new GroupPatternToken()
					.addPattern( ...this.__createMemberSelfPattern() );

			default:
				return this.__createSimpleSelfPattern();
		}
	}

	protected __createSimpleSelfPattern():PatternToken {
		if( ! this.parent )
			throw new IllegalActionError( "Cannot create pattern without a parent." );

		return new SubjectToken( this.parent.variable )
			.addProperty( new PropertyToken( this.__createPathToken() )
				.addObject( this.variable ) );
	}

	protected __createDocumentSelfPattern():PatternToken {
		return new ValuesToken()
			.addVariables( this.variable )
			.addValues( this.__createIRIToken() )
			;
	}

	protected __createChildSelfPattern():PatternToken {
		return new SubjectToken( this.__createIRIToken() )
			.addProperty( new PropertyToken( this.queryContainer.compactIRI( LDP.contains ) )
				.addObject( this.variable )
			);
	}

	protected __createMemberSelfPattern():PatternToken[] {
		const membershipResource:QueryVariable = this.queryContainer.getVariable( "membershipResource" );
		const hasMemberRelation:QueryVariable = this.queryContainer.getVariable( "hasMemberRelation" );

		const memberRelations:PatternToken = new SubSelectToken()
			.addVariable( membershipResource, hasMemberRelation )
			.addPattern( new SubjectToken( this.__createIRIToken() )
				.addProperty( new PropertyToken( this.queryContainer.compactIRI( LDP.membershipResource ) )
					.addObject( membershipResource )
				)
				.addProperty( new PropertyToken( this.queryContainer.compactIRI( LDP.hasMemberRelation ) )
					.addObject( hasMemberRelation )
				)
			);

		const memberSelection:PatternToken = new SubjectToken( membershipResource )
			.addProperty( new PropertyToken( hasMemberRelation )
				.addObject( this.variable )
			);

		return [ memberRelations, memberSelection ];
	}


	// Search patterns

	getSearchPatterns():PatternToken[] {
		const patterns:PatternToken[] = this
			.__createSearchPatterns();

		if( ! this.optional ) return patterns;
		return [ new OptionalToken()
			.addPattern( ...patterns ),
		];
	}

	protected __createSearchPatterns():PatternToken[] {
		const patterns:PatternToken[] = [];

		const values:PatternToken | undefined = this.__createValuesPattern();
		if( values ) patterns.push( values );

		const selfTriple:PatternToken = this.__createSelfPattern();
		patterns.push( selfTriple );

		switch( this.propertyType ) {
			case QueryPropertyType.EMPTY:
				patterns.push( this.__createTypesSearchPatterns() );
				break;

			case QueryPropertyType.PARTIAL:
				patterns.push( ...this.__createPartialSearchPatterns() );
				break;

			case QueryPropertyType.ALL:
				patterns.push( this.__createAllPattern() );
				break;

			case QueryPropertyType.FULL:
				patterns.push( this.__createGraphPattern() );
				break;

			default:
				const selfTypeFilter:PatternToken | undefined = this.__createSelfTypeFilter();
				if( selfTypeFilter ) patterns.push( selfTypeFilter );
				break;
		}

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

	protected __createSelfTypeFilter():PatternToken | undefined {
		if( this.definition.literal ) {
			const literalToken:IRIToken = this.queryContainer
				.compactIRI( this.definition.literalType );

			return new FilterToken( `datatype( ${ this.variable } ) = ${ literalToken }` );
		}

		if( this.definition.pointerType !== null )
			return new FilterToken( `! isLiteral( ${ this.variable } )` );
	}

	protected __createPartialSearchPatterns():PatternToken[] {
		const patterns:PatternToken[] = [
			this.__createTypesSearchPatterns(),
		];

		this.subProperties.forEach( subProperty => {
			patterns.push( ...subProperty.getSearchPatterns() );
		} );

		return patterns;
	}

	protected __createTypesSearchPatterns():PatternToken {
		const pattern:SubjectToken = this.__createTypesPattern();

		// Return optional types
		if( ! this._types.length )
			return new OptionalToken()
				.addPattern( pattern );

		// Add types to the same subject
		this.__addTypesTo( pattern );

		return pattern;
	}

	protected __addTypesTo( pattern:SubjectToken ):void {
		// Parse string types
		const types:IRIToken[] = this._types
			.map( type => this.queryContainer.compactIRI( type ) );

		pattern
			.properties[ 0 ] // Should be the `a` predicate
			.objects
			.unshift( ...types ); // Add them as first matches
	}


	// Construct patterns

	getConstructPatterns():SubjectToken[] {
		const patterns:SubjectToken[] = [];

		const selfPattern:SubjectToken | undefined = this.__createSelfConstructPattern();
		if( selfPattern ) patterns.push( selfPattern );

		this.subProperties.forEach( property => {
			const subPatterns:SubjectToken[] = property
				.getConstructPatterns();

			patterns.push( ...subPatterns );
		} );

		return patterns;
	}

	protected __createSelfConstructPattern():SubjectToken | undefined {
		switch( this.propertyType ) {
			case QueryPropertyType.EMPTY:
				return this.__createTypesPattern();

			case QueryPropertyType.PARTIAL:
				return this.__createPartialConstructPattern();

			case QueryPropertyType.ALL:
				return this.__createAllPattern();

			case QueryPropertyType.FULL:
				return this.__createGraphSubPattern();

			default:
				return;
		}
	}

	protected __createPartialConstructPattern():SubjectToken {
		const subject:SubjectToken = this.__createTypesPattern();

		this.subProperties.forEach( subProperty => {
			subject.addProperty( new PropertyToken( subProperty.__createIRIToken() )
				.addObject( subProperty.variable )
			);
		} );

		return subject;
	}


	// Shared Construct & Search patterns

	protected __createTypesPattern():SubjectToken {
		return new SubjectToken( this.variable )
			.addProperty( new PropertyToken( "a" )
				.addObject( this.__getVariable( "types" ) )
			);
	}

	protected __createAllPattern():SubjectToken {
		return new SubjectToken( this.variable )
			.addProperty( new PropertyToken( this.__getVariable( "_predicate" ) )
				.addObject( this.__getVariable( "_object" ) )
			);
	}

	protected __createGraphPattern():GraphToken {
		return new GraphToken( this.variable )
			.addPattern( this.__createGraphSubPattern() )
			;
	}

	protected __createGraphSubPattern():SubjectToken {
		return new SubjectToken( this.__getVariable( "_subject" ) )
			.addProperty( new PropertyToken( this.__getVariable( "_predicate" ) )
				.addObject( this.__getVariable( "_object" ) )
			);
	}


	// Helper for property result compaction

	getSchemaFor( object:object ):DigestedObjectSchema {
		switch( this.propertyType ) {
			case void 0:
				return new DigestedObjectSchema();

			case QueryPropertyType.EMPTY:
			case QueryPropertyType.PARTIAL:
				return this.__createSchema();

			default:
				return ObjectSchemaDigester._combineSchemas( [
					this.queryContainer.context.registry.getSchemaFor( object ),
					this.__createSchema(),
				] );
		}
	}

	protected __createSchema():DigestedObjectSchema {
		const schema:DigestedObjectSchema = new DigestedObjectSchema();

		this.subProperties.forEach( property => {
			schema.properties.set( property.name, property.definition );
		} );

		return schema;
	}


	// Helper for schema related actions
	protected _getSearchSchema():DigestedObjectSchema {
		if( this._searchSchema ) return this._searchSchema;
		return this._searchSchema = this.queryContainer.getGeneralSchema();
	}

}
