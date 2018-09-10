import {
	FilterToken,
	GraphToken,
	IRIToken,
	OptionalToken,
	PatternToken,
	PropertyToken,
	SubjectToken,
	VariableToken
} from "sparqler/tokens";

import { DigestedObjectSchema } from "../ObjectSchema/DigestedObjectSchema";
import { DigestedObjectSchemaProperty } from "../ObjectSchema/DigestedObjectSchemaProperty";
import { ObjectSchemaUtils } from "../ObjectSchema/ObjectSchemaUtils";

import { isObject } from "../Utils";

import { QueryContext } from "./QueryContext";


export function _getLevelRegExp( property:string ):RegExp {
	if( property ) property += ".";
	const parsedName:string = property.replace( /\./g, "\\." );

	return new RegExp( `^${ parsedName }[^.]+$` );
}


export function _createPropertyPatterns( context:QueryContext, resourcePath:string, propertyPath:string, propertyDefinition:DigestedObjectSchemaProperty ):PatternToken[] {
	const { uri, literalType, pointerType } = propertyDefinition;

	const propertyIRI:IRIToken = context.compactIRI( uri );

	const resource:VariableToken = context.getVariable( resourcePath );
	const propertyObject:VariableToken = context.getVariable( propertyPath );

	const propertyPatterns:PatternToken[] = [ new SubjectToken( resource )
		.addProperty( new PropertyToken( propertyIRI )
			.addObject( propertyObject ) ),
	];

	if( literalType !== null ) propertyPatterns
		.push( new FilterToken( `datatype( ${ propertyObject } ) = ${ context.compactIRI( literalType ) }` ) );
	if( pointerType !== null ) propertyPatterns
		.push( new FilterToken( `! isLiteral( ${ propertyObject } )` ) );

	return propertyPatterns;
}

export function _createTypesPattern( context:QueryContext, resourcePath:string ):PatternToken {
	return new OptionalToken()
		.addPattern( new SubjectToken( context.getVariable( resourcePath ) )
			.addProperty( new PropertyToken( "a" )
				.addObject( context.getVariable( `${ resourcePath }.types` ) )
			)
		);
}

export function _createGraphPattern( context:QueryContext, resourcePath:string ):PatternToken {
	return new GraphToken( context.getVariable( resourcePath ) )
		.addPattern( new SubjectToken( context.getVariable( `${ resourcePath }._subject` ) )
			.addProperty( new PropertyToken( context.getVariable( `${ resourcePath }._predicate` ) )
				.addObject( context.getVariable( `${ resourcePath }._object` ) ) )
		)
		;
}

export function _createAllPattern( context:QueryContext, resourcePath:string ):PatternToken {
	return new SubjectToken( context.getVariable( resourcePath ) )
		.addProperty( new PropertyToken( context.getVariable( `${ resourcePath }._predicate` ) )
			.addObject( context.getVariable( `${ resourcePath }._object` ) )
		)
		;
}


export function _getRootPath( path:string ):string {
	const [ root ]:string[] = path
		.split( "." )
		.slice( 0, 1 );

	return root;
}

export function _getParentPath( path:string ):string {
	return path
		.split( "." )
		.slice( 0, - 1 )
		.join( "." )
		;
}


export function _getAllTriples( patterns:PatternToken[] ):SubjectToken[] {
	const subjectsMap:Map<string, SubjectToken> = new Map();
	__internalTripleAdder( subjectsMap, patterns );

	return Array.from( subjectsMap.values() );
}

function __isFullTriple( triple:SubjectToken ):boolean {
	return triple
		.properties
		.map( x => x.verb )
		.some( x => isObject( x ) && x.token === "variable" )
		;
}

function __internalTripleAdder( subjectsMap:Map<string, SubjectToken>, patterns:PatternToken[] ):void {
	patterns.forEach( ( pattern:PatternToken ) => {
		if( "groupPattern" in pattern )
			return __internalTripleAdder( subjectsMap, pattern.groupPattern.patterns );

		if( pattern.token !== "subject" ) return;

		const valid:boolean = pattern.properties
			.map( property => property.objects )
			.some( objects => objects.some( object => object.token === "variable" ) );
		if( ! valid ) return;

		const subject:SubjectToken = __getSubject( subjectsMap, pattern );
		if( __isFullTriple( subject ) ) return;

		if( __isFullTriple( pattern ) ) subject.properties.length = 0;
		subject.properties.push( ...pattern.properties );
	} );
}

function __getSubject( subjectsMap:Map<string, SubjectToken>, original:SubjectToken ):SubjectToken {
	const subjectStr:string = original.subject.toString();
	if( subjectsMap.has( subjectStr ) ) return subjectsMap.get( subjectStr );

	const subject:SubjectToken = new SubjectToken( original.subject );
	subjectsMap.set( subjectStr, subject );

	return subject;
}


export function _getPathProperty( element:any, path:string ):any {
	if( element === void 0 || ! path ) return element;

	const [ propName, ...restParts ] = path.split( "." );

	const property:any = element[ propName ];
	const restPath:string = restParts.join( "." );

	return _getPathProperty( property, restPath );
}

export function _areDifferentType( a:any, b:any ):boolean {
	if( typeof a !== typeof b ) return true;
	if( typeof a === "object" ) return a instanceof Date !== b instanceof Date;

	return false;
}


export function _getMatchDefinition( generalSchema:DigestedObjectSchema, targetSchema:DigestedObjectSchema, propertyName:string, propertyURI?:string ):DigestedObjectSchemaProperty | undefined {
	if( ! targetSchema.properties.has( propertyName ) ) return;

	const definition:DigestedObjectSchemaProperty = ObjectSchemaUtils
		._resolveProperty( generalSchema, targetSchema.properties.get( propertyName ) );

	if( propertyURI === void 0 || propertyURI === definition.uri )
		return definition;
}
