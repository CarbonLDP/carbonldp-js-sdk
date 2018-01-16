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

import { DigestedPropertyDefinition } from "../../ObjectSchema";
import { isObject } from "../../Utils";
import * as QueryContext from "./QueryContext";
import { Factory as PoinerFactory } from "../../Pointer";

export function getLevelRegExp( property:string ):RegExp {
	if( property ) property += ".";
	const parsedName:string = property.replace( /\./g, "\\." );

	return new RegExp( `^${ parsedName }[^.]+$` );
}

export function createPropertyPatterns( context:QueryContext.Class, resourcePath:string, propertyPath:string, propertyDefinition:DigestedPropertyDefinition ):PatternToken[] {
	const { uri, literalType, pointerType } = propertyDefinition;

	const propertyIRI:IRIToken | PrefixedNameToken = context.compactIRI( uri.stringValue );

	const resource:VariableToken = context.getVariable( resourcePath );
	const propertyObject:VariableToken = context.getVariable( propertyPath );

	const propertyPatterns:PatternToken[] = [ new SubjectToken( resource )
		.addPredicate( new PredicateToken( propertyIRI )
			.addObject( propertyObject ) ),
	];

	if( literalType !== null ) propertyPatterns
		.push( new FilterToken( `datatype( ${ propertyObject } ) = ${ context.compactIRI( literalType.stringValue ) }` ) );
	if( pointerType !== null ) propertyPatterns
		.push( new FilterToken( `! isLiteral( ${ propertyObject } )` ) );

	return propertyPatterns;
}

export function createTypesPattern( context:QueryContext.Class, resourcePath:string ):PatternToken {
	return new OptionalToken()
		.addPattern( new SubjectToken( context.getVariable( resourcePath ) )
			.addPredicate( new PredicateToken( "a" )
				.addObject( context.getVariable( `${ resourcePath }.types` ) )
			)
		);
}

export function createGraphPattern( context:QueryContext.Class, resourcePath:string ):PatternToken {
	return new GraphToken( context.getVariable( resourcePath ) )
		.addPattern( new SubjectToken( context.getVariable( `${ resourcePath }._subject` ) )
			.addPredicate( new PredicateToken( context.getVariable( `${ resourcePath }._predicate` ) )
				.addObject( context.getVariable( `${ resourcePath }._object` ) ) )
		)
		;
}

export function createAllPattern( context:QueryContext.Class, resourcePath:string ):PatternToken {
	return new SubjectToken( context.getVariable( resourcePath ) )
		.addPredicate( new PredicateToken( context.getVariable( `${ resourcePath }._predicate` ) )
			.addObject( context.getVariable( `${ resourcePath }._object` ) )
		)
		;
}

export function getParentPath( path:string ):string {
	return path
		.split( "." )
		.slice( 0, - 1 )
		.join( "." )
		;
}

export function isFullTriple( triple:SubjectToken ):boolean {
	return triple
		.predicates
		.map( x => x.predicate )
		.some( x => isObject( x ) && x.token === "variable" )
		;
}

export function getAllTriples( patterns:PatternToken[] ):SubjectToken[] {
	const subjectsMap:Map<string, SubjectToken> = new Map();
	internalTripleAdder( subjectsMap, patterns );

	return Array.from( subjectsMap.values() );
}

function internalTripleAdder( subjectsMap:Map<string, SubjectToken>, patterns:PatternToken[] ):void {
	patterns.forEach( ( pattern:PatternToken ) => {
		if( pattern.token === "optional" || pattern.token === "graph" )
			return internalTripleAdder( subjectsMap, pattern.patterns );

		if( pattern.token !== "subject" ) return;

		const valid:boolean = pattern.predicates
			.map( predicate => predicate.objects )
			.some( objects => objects.some( object => object.token === "variable" ) );

		if( valid ) {
			const subject:SubjectToken = getSubject( subjectsMap, pattern );
			if( isFullTriple( subject ) ) return;

			if( isFullTriple( pattern ) ) subject.predicates.length = 0;
			subject.predicates.push( ...pattern.predicates );
		}
	} );
}

function getSubject( subjectsMap:Map<string, SubjectToken>, original:SubjectToken ):SubjectToken {
	const subjectStr:string = original.subject.toString();
	if( subjectsMap.has( subjectStr ) ) return subjectsMap.get( subjectStr );

	const subject:SubjectToken = new SubjectToken( original.subject );
	subjectsMap.set( subjectStr, subject );

	return subject;
}

export function getPathValue( element:any, path:string ):any {
	if( element === void 0 ) return element;
	if( ! path ) {
		if( PoinerFactory.is( element ) ) return element.id;
		return element;
	}

	const [ propName, ...restParts ] = path.split( "." );

	const property:any = element[ propName ];
	const restPath:string = restParts.join( "." );

	return getPathValue( property, restPath );
}
