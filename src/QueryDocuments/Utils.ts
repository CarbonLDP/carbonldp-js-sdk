import {
	FilterToken,
	GraphToken,
	IRIToken,
	OptionalToken,
	PatternToken,
	PredicateToken,
	PrefixedNameToken,
	SubjectToken,
	VariableToken
} from "sparqler/tokens";

import { DigestedObjectSchemaProperty } from "../ObjectSchema/DigestedObjectSchemaProperty";
import { isObject } from "../Utils";

import { QueryContext } from "./QueryContext";


export function _getLevelRegExp( property:string ):RegExp {
	if( property ) property += ".";
	const parsedName:string = property.replace( /\./g, "\\." );

	return new RegExp( `^${ parsedName }[^.]+$` );
}


export function _createPropertyPatterns( context:QueryContext, resourcePath:string, propertyPath:string, propertyDefinition:DigestedObjectSchemaProperty ):PatternToken[] {
	const { uri, literalType, pointerType } = propertyDefinition;

	const propertyIRI:IRIToken | PrefixedNameToken = context.compactIRI( uri );

	const resource:VariableToken = context.getVariable( resourcePath );
	const propertyObject:VariableToken = context.getVariable( propertyPath );

	const propertyPatterns:PatternToken[] = [ new SubjectToken( resource )
		.addPredicate( new PredicateToken( propertyIRI )
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
			.addPredicate( new PredicateToken( "a" )
				.addObject( context.getVariable( `${ resourcePath }.types` ) )
			)
		);
}

export function _createGraphPattern( context:QueryContext, resourcePath:string ):PatternToken {
	return new GraphToken( context.getVariable( resourcePath ) )
		.addPattern( new SubjectToken( context.getVariable( `${ resourcePath }._subject` ) )
			.addPredicate( new PredicateToken( context.getVariable( `${ resourcePath }._predicate` ) )
				.addObject( context.getVariable( `${ resourcePath }._object` ) ) )
		)
		;
}

export function _createAllPattern( context:QueryContext, resourcePath:string ):PatternToken {
	return new SubjectToken( context.getVariable( resourcePath ) )
		.addPredicate( new PredicateToken( context.getVariable( `${ resourcePath }._predicate` ) )
			.addObject( context.getVariable( `${ resourcePath }._object` ) )
		)
		;
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
		.predicates
		.map( x => x.predicate )
		.some( x => isObject( x ) && x.token === "variable" )
		;
}

function __internalTripleAdder( subjectsMap:Map<string, SubjectToken>, patterns:PatternToken[] ):void {
	patterns.forEach( ( pattern:PatternToken ) => {
		if( pattern.token === "optional" || pattern.token === "graph" )
			return __internalTripleAdder( subjectsMap, pattern.patterns );

		if( pattern.token !== "subject" ) return;

		const valid:boolean = pattern.predicates
			.map( predicate => predicate.objects )
			.some( objects => objects.some( object => object.token === "variable" ) );
		if( ! valid ) return;

		const subject:SubjectToken = __getSubject( subjectsMap, pattern );
		if( __isFullTriple( subject ) ) return;

		if( __isFullTriple( pattern ) ) subject.predicates.length = 0;
		subject.predicates.push( ...pattern.predicates );
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
