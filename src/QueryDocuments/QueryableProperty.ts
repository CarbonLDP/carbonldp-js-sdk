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
	ValuesToken,
	VariableToken
} from "sparqler/tokens";

import { IllegalActionError } from "../Errors/IllegalActionError";
import { IllegalArgumentError } from "../Errors/IllegalArgumentError";
import { DigestedObjectSchema } from "../ObjectSchema/DigestedObjectSchema";

import { DigestedObjectSchemaProperty } from "../ObjectSchema/DigestedObjectSchemaProperty";
import { LDP } from "../Vocabularies/LDP";

import { QueryablePropertyData } from "./QueryablePropertyData";
import { QueryContainer } from "./QueryContainer";
import { QueryContainerType } from "./QueryContainerType";
import { QueryPropertyType } from "./QueryPropertyType";
import { QueryVariable } from "./QueryVariable";


export class QueryableProperty implements QueryablePropertyData {
	readonly queryContainer:QueryContainer;
	readonly parent?:QueryableProperty;

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


	protected readonly _subProperties:Map<string, QueryableProperty>;


	constructor( data:QueryablePropertyData ) {
		this.queryContainer = data.queryContainer;
		this.parent = data.parent;

		this.name = data.name;
		this.fullName = data.parent
			? data.parent.fullName + "." + data.name
			: data.name;

		this.definition = data.definition;

		this.propertyType = data.propertyType;
		this.containerType = data.containerType;

		this.optional = data.optional;

		this._subProperties = new Map();
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
		if( type <= this.propertyType ) return;
		this.propertyType = type;
	}


	// Merge helpers

	merge( data:QueryablePropertyData ):void {
		if( data.pathBuilderFn )
			throw new IllegalArgumentError( `Cannot merge properties with a "path".` );

		this.setType( data.propertyType );
		this.__mergeDefinition( data.definition );
	}

	protected __mergeDefinition( newDefinition:DigestedObjectSchemaProperty ):void {
		for( const key in newDefinition ) {
			const newValue:any = newDefinition[ key ];
			const oldValue:any = this.definition[ key ];

			if( newValue !== oldValue )
				throw new IllegalArgumentError( `Property "${ this.fullName }" has different "${ key }": "${ oldValue }", "${ newValue }".` );
		}
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
		const membershipResource:VariableToken = this.queryContainer.getVariable( "membershipResource" );
		const hasMemberRelation:VariableToken = this.queryContainer.getVariable( "hasMemberRelation" );

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

		this._subProperties.forEach( subProperty => {
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

		this._subProperties.forEach( property => {
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

		this._subProperties.forEach( subProperty => {
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

	getSchema():DigestedObjectSchema {
		const schema:DigestedObjectSchema = new DigestedObjectSchema();

		this._subProperties.forEach( property => {
			schema.properties.set( property.name, property.definition );
		} );

		return schema;
	}

}
