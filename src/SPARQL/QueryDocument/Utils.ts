import { DigestedPropertyDefinition } from "../../ObjectSchema";
import { FilterToken, GraphToken, IRIToken, OptionalToken, PatternToken, PredicateToken, PrefixedNameToken, SubjectToken, VariableToken } from "sparqler/tokens";
import * as QueryContext from "./QueryContext";

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
