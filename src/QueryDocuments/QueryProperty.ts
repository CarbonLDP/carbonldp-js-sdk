import { Path, PathBuilder } from "sparqler/patterns";
import {
	FilterToken,
	GraphToken,
	GroupPatternToken,
	IRIToken,
	OptionalToken,
	PathToken,
	PatternToken,
	PropertyToken,
	SubjectToken,
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
import { _getBestType, _getRootPath } from "./Utils";


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


	constructor( data:QueryPropertyData ) {
		this.queryContainer = data.queryContainer;
		this.parent = data.parent;

		this.name = data.name;
		this.fullName = data.parent
			? data.parent.fullName + "." + data.name
			: data.name;

		this.definition = data.definition;

		this.propertyType = data.propertyType;
		this.containerType = data.containerType;

		this.optional = data.optional === void 0
			? true
			: data.optional;

		this.subProperties = new Map();
	}


	// Sub-properties helpers

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

		return this._addSubProperty( {
			name: propertyName,

			definition,
			pathBuilderFn: propertyDefinition.path,
		} );
	}

	_addSubProperty( data:QuerySubPropertyData ):QueryProperty {
		const property:QueryProperty = this.__createPropertyFrom( {
			...data,
			queryContainer: this.queryContainer,
			parent: this,
		} );

		this.subProperties.set( data.name, property );

		return property;
	}

	protected __createPropertyFrom( data:QueryPropertyData ):QueryProperty {
		return new QueryProperty( data );
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
		return;
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


	setType( type:QueryPropertyType ):void {
		this.propertyType = _getBestType( this.propertyType, type );
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
				return this.__createMemberSelfPattern();
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

	protected __createMemberSelfPattern():PatternToken {
		const membershipResource:QueryVariable = this.queryContainer.getVariable( "membershipResource" );
		const hasMemberRelation:QueryVariable = this.queryContainer.getVariable( "hasMemberRelation" );

		const memberRelations:PatternToken = new SubjectToken( this.__createIRIToken() )
			.addProperty( new PropertyToken( this.queryContainer.compactIRI( LDP.membershipResource ) )
				.addObject( membershipResource )
			)
			.addProperty( new PropertyToken( this.queryContainer.compactIRI( LDP.hasMemberRelation ) )
				.addObject( hasMemberRelation )
			);

		const memberSelection:PatternToken = new SubjectToken( membershipResource )
			.addProperty( new PropertyToken( hasMemberRelation )
				.addObject( this.variable )
			);

		return new GroupPatternToken()
			.addPattern( memberRelations, memberSelection );
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

		const selfTriple:PatternToken = this.__createSelfPattern();
		patterns.push( selfTriple );

		const selfTypeFilter:PatternToken | undefined = this.__createSelfTypeFilter();
		if( selfTypeFilter ) patterns.push( selfTypeFilter );

		switch( this.propertyType ) {
			case QueryPropertyType.EMPTY:
				patterns.push( ...this.__createTypesSearchPatterns() );
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
				break;
		}

		return patterns;
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
		const patterns:PatternToken[] = this.__createTypesSearchPatterns();

		this.subProperties.forEach( subProperty => {
			patterns.push( ...subProperty.getSearchPatterns() );
		} );

		return patterns;
	}

	protected __createTypesSearchPatterns():PatternToken[] {
		const patterns:PatternToken[] = [];

		patterns.push( new OptionalToken()
			.addPattern( this.__createTypesPattern() )
		);

		return patterns;
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

}
