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
import { IllegalStateError } from "../Errors/IllegalStateError";

import { DigestedObjectSchema } from "../ObjectSchema/DigestedObjectSchema";
import { DigestedObjectSchemaProperty } from "../ObjectSchema/DigestedObjectSchemaProperty";
import { ObjectSchemaDigester } from "../ObjectSchema/ObjectSchemaDigester";

import { QueryContainer } from "./QueryContainer";
import { SubQueryDocumentsBuilder } from "./QueryDocumentBuilder2";
import { QueryPropertyData } from "./QueryPropertyData";
import { QueryPropertyType } from "./QueryPropertyType";
import { QueryRootProperty } from "./QueryRootProperty";
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

	protected _type:QueryPropertyType;
	protected _optional:boolean;

	private readonly _types:IRIToken[];
	private readonly _values:(LiteralToken | IRIToken)[];

	private _searchSchema:DigestedObjectSchema | undefined;
	private readonly _subProperties:Map<string, QueryProperty2>;


	constructor( data:QueryPropertyData ) {
		this.queryContainer = data.queryContainer;
		this.parent = data.parent;

		this.name = data.name;
		this.fullName = data.parent
			? data.parent.fullName + "." + data.name
			: data.name;

		this.definition = data.definition;

		this._type = QueryPropertyType.EMPTY;
		this._optional = true;

		this._types = [];
		this._values = [];

		this._subProperties = new Map();
	}


	setType( type:QueryPropertyType ):void {
		if( type <= this._type ) return;
		this._type = type;
	}

	isEmpty():boolean {
		return this._type === QueryPropertyType.EMPTY;
	}

	isPartial():boolean {
		return this._type === QueryPropertyType.PARTIAL;
	}

	isComplete():boolean {
		return this._type > QueryPropertyType.PARTIAL;
	}


	getTriple():PatternToken {
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

		const values:PatternToken | undefined = this.__createValuesPattern();
		if( values ) patterns.push( values );

		const selfTriple:PatternToken = this.getTriple();
		patterns.push( selfTriple );

		const typeFilter:PatternToken | undefined = this.__createTypeFilter();
		if( typeFilter ) patterns.push( typeFilter );


		switch( this._type ) {
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


		if( this._types.length ) patterns
			.push( new SubjectToken( this.variable )
				.addProperty( new PropertyToken( "a" )
					.addObject( ...this._types )
				)
			);


		if( ! this._optional ) return patterns;
		return [ new OptionalToken()
			.addPattern( ...patterns ),
		];
	}

	protected __createValuesPattern():PatternToken | undefined {
		if( ! this._values.length ) return;

		const values:ValuesToken = new ValuesToken().addVariables( this.variable );
		this._values.forEach( value => values.addValues( value ) );

		return values;
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

		this._subProperties.forEach( subProperty => {
			patterns.push( ...subProperty.getSearchPatterns() );
		} );

		return patterns;
	}


	getConstructPattern():PatternToken | undefined {
		switch( this._type ) {
			case QueryPropertyType.PARTIAL:
				return this.__createPartialConstructPattern();

			case QueryPropertyType.ALL:
				return this.__createAllPattern();

			case QueryPropertyType.FULL:
				return this.__createGraphPattern();

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
			.addPattern( new SubjectToken( this.__getVariable( "_subject" ) )
				.addProperty( new PropertyToken( this.__getVariable( "_predicate" ) )
					.addObject( this.__getVariable( "_object" ) ) )
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
			|| this.isPartial()
			|| this.isComplete()
			;
	}


	getProperty( path?:string, flags?:{ create:true } ):QueryProperty2 | undefined {
		if( ! path ) return this;

		const rootPath:string = _getRootPath( path );
		const property:QueryProperty2 | undefined = this._subProperties.get( rootPath );

		if( ! property ) {
			// If immediate child and can be created in valid property
			if( rootPath === path && flags && flags.create && this.isComplete() )
				return this.addProperty( rootPath );

			return;
		}

		const restPath:string = path.substr( rootPath.length + 1 );
		return property.getProperty( restPath );
	}

	getRootProperty():QueryRootProperty {
		if( this.parent ) return this.parent.getRootProperty();
		throw new IllegalStateError( `The builder has not a valid Root property.` );
	}


	addProperty( propertyName:string, propertyDefinition:SubQueryPropertyDefinition = SubQueryDocumentsBuilder.INHERIT ):QueryProperty2 {
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
		const localDefinition:DigestedObjectSchemaProperty | undefined =
			_getMatchDefinition( this._getSearchSchema(), propertyURI, propertyURI );

		if( localDefinition ) return localDefinition;

		return this.queryContainer
			._getInheritDefinition( propertyName, propertyURI );
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
		return this._searchSchema = this.queryContainer.getGeneralSchema();
	}

}
