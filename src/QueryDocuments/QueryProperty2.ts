import { Path, PathBuilder } from "sparqler/patterns";
import {
	FilterToken,
	GraphToken,
	IRIToken,
	LiteralToken,
	OptionalToken,
	PathToken,
	PatternToken,
	PropertyToken,
	SubjectToken,
	ValuesToken
} from "sparqler/tokens";
import { IllegalActionError } from "../Errors/IllegalActionError";

import { IllegalArgumentError } from "../Errors/IllegalArgumentError";

import { DigestedObjectSchema } from "../ObjectSchema/DigestedObjectSchema";
import { DigestedObjectSchemaProperty } from "../ObjectSchema/DigestedObjectSchemaProperty";
import { ObjectSchemaDigester } from "../ObjectSchema/ObjectSchemaDigester";

import { QueryContainer } from "./QueryContainer";
import { QueryPropertyData } from "./QueryPropertyData";
import { QueryPropertyType } from "./QueryPropertyType";
import { QueryVariable } from "./QueryVariable";
import { SubQueryPropertyDefinition } from "./SubQueryPropertyDefinition";
import { _getMatchDefinition, _getRootPath } from "./Utils";


export class QueryProperty2 {
	readonly queryContainer:QueryContainer;
	readonly parent?:QueryProperty2;

	readonly name:string;
	readonly fullName:string;

	get variable():QueryVariable {
		return this.queryContainer.getVariable( this.fullName );
	}

	readonly definition:DigestedObjectSchemaProperty;
	readonly pathBuilderFn?:( pathBuilder:PathBuilder ) => Path;

	protected _type?:QueryPropertyType;
	protected _optional:boolean;

	protected readonly _types:IRIToken[];
	protected readonly _values:(LiteralToken | IRIToken)[];
	protected readonly _filters:string[];

	protected _searchSchema:DigestedObjectSchema | undefined;
	protected readonly _subProperties:Map<string, QueryProperty2>;


	constructor( data:QueryPropertyData ) {
		this.queryContainer = data.queryContainer;
		this.parent = data.parent;

		this.name = data.name;
		this.fullName = data.parent
			? data.parent.fullName + "." + data.name
			: data.name;

		this.definition = data.definition;

		this._optional = true;

		this._types = [];
		this._values = [];
		this._filters = [];

		this._subProperties = new Map();
	}


	setType( type:QueryPropertyType ):void {
		if( type <= this._type ) return;
		this._type = type;
	}

	isVoid():boolean {
		return this._type === void 0;
	}

	isEmpty():boolean {
		return this._type === QueryPropertyType.EMPTY;
	}

	isPartial():boolean {
		return this._type === QueryPropertyType.PARTIAL;
	}

	isComplete():boolean {
		return this.isAll()
			|| this.isFully()
			;
	}

	isAll():boolean {
		return this._type === QueryPropertyType.ALL;
	}

	isFully():boolean {
		return this._type === QueryPropertyType.FULL;
	}


	getSelfPattern():PatternToken {
		const pattern:PatternToken = this.__getSimpleSelfPattern();

		if( ! this._optional ) return pattern;
		return new OptionalToken()
			.addPattern( pattern );
	}

	protected __getSimpleSelfPattern():PatternToken {
		if( ! this.parent )
			throw new IllegalActionError( "Cannot create pattern without a parent." );

		return new SubjectToken( this.parent.variable )
			.addProperty( new PropertyToken( this.__createPathToken() )
				.addObject( this.variable ) );
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


	getSearchPatterns():PatternToken[] {
		const patterns:PatternToken[] = [];

		if( this._values.length ) {
			const values:ValuesToken = new ValuesToken()
				.addVariables( this.variable );

			this._values
				.forEach( value => values.addValues( value ) );

			patterns.push( values );
		}

		const selfTriple:PatternToken = this.__getSimpleSelfPattern();
		patterns.push( selfTriple );

		const typeFilter:PatternToken | undefined = this.__createTypeFilter();
		if( typeFilter ) patterns.push( typeFilter );


		switch( this._type ) {
			case QueryPropertyType.EMPTY:
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
				break;
		}

		if( this._filters.length ) {
			const filters:FilterToken[] = this._filters
				.map( constraint => new FilterToken( constraint ) );
			patterns.push( ...filters );
		}


		if( ! this._optional ) return patterns;
		return [ new OptionalToken()
			.addPattern( ...patterns ),
		];
	}

	protected __createTypeFilter():PatternToken | undefined {
		if( this.definition.literal ) {
			const literalToken:IRIToken = this.queryContainer
				.compactIRI( this.definition.literalType );

			return new FilterToken( `datatype( ${ this.variable } ) = ${ literalToken }` );
		}

		if( this.definition.pointerType !== null )
			return new FilterToken( `! isLiteral( ${ this.variable } )` );
	}

	protected __createPartialSearchPatterns():PatternToken[] {
		const patterns:PatternToken[] = [];

		patterns.push( new OptionalToken()
			.addPattern( this.__createTypesPattern() )
		);

		if( this._types.length ) patterns
			.push( new SubjectToken( this.variable )
				.addProperty( new PropertyToken( "a" )
					.addObject( ...this._types )
				)
			);


		this._subProperties.forEach( subProperty => {
			patterns.push( ...subProperty.getSearchPatterns() );
		} );

		return patterns;
	}


	getConstructPatterns():SubjectToken[] {
		const patterns:SubjectToken[] = [];

		const selfPattern:SubjectToken | undefined = this
			.__createSelfConstructPattern();
		if( selfPattern ) patterns.push( selfPattern );

		this._subProperties.forEach( property => {
			const subPatterns:SubjectToken[] = property
				.getConstructPatterns();

			patterns.push( ...subPatterns );
		} );

		return patterns;
	}

	protected __createSelfConstructPattern():SubjectToken | undefined {
		switch( this._type ) {
			case QueryPropertyType.EMPTY:
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

		this._subProperties.forEach( subProperty => {
			subject.addProperty( new PropertyToken( subProperty.__createIRIToken() )
				.addObject( subProperty.variable )
			);
		} );

		return subject;
	}


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


	protected __getVariable( name:string ):QueryVariable {
		return this.queryContainer
			.getVariable( `${ this.fullName }.${ name }` );
	}

	protected __createIRIToken():IRIToken {
		return this
			.queryContainer
			.compactIRI( this.definition.uri );
	}


	hasProperties():boolean {
		return this._subProperties.size !== 0
			|| this.isComplete()
			;
	}


	getProperty( path?:string, flags?:{ create:true, inherit?:false } ):QueryProperty2 | undefined {
		if( ! path ) return this;

		const rootPath:string = _getRootPath( path );
		const property:QueryProperty2 | undefined = this._subProperties.get( rootPath );

		if( ! property ) {
			// If immediate child and can be created in valid property
			if( rootPath === path && flags && flags.create && this.isComplete() ) {
				const newProperty:QueryProperty2 = this.addProperty( rootPath, flags );
				newProperty.setType( QueryPropertyType.ALL );

				return newProperty;
			}

			return;
		}

		const restPath:string = path.substr( rootPath.length + 1 );
		return property.getProperty( restPath );
	}


	addProperty( propertyName:string, propertyDefinition:SubQueryPropertyDefinition ):QueryProperty2 {
		const definition:DigestedObjectSchemaProperty = this
			.__getDefinition( propertyName, propertyDefinition );

		const property:QueryProperty2 = new QueryProperty2( {
			queryContainer: this.queryContainer,
			parent: this,

			name: propertyName,

			definition,
			pathBuilderFn: propertyDefinition.path,
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
		if( ! this._optional ) return;

		this._optional = false;

		if( flags && flags.inheritParents && this.parent )
			this.parent.setObligatory( flags );
	}


	getSchema():DigestedObjectSchema {
		const schema:DigestedObjectSchema = new DigestedObjectSchema();

		this._subProperties.forEach( property => {
			schema.properties.set( property.name, property.definition );
		} );

		return schema;
	}

	protected _getSearchSchema():DigestedObjectSchema {
		if( this._searchSchema ) return this._searchSchema;
		return this._searchSchema = this.queryContainer.context.getObjectSchema();
	}

}
