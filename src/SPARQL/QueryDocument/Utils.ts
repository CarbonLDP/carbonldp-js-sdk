import { DigestedPropertyDefinition } from "../../ObjectSchema";
import { FilterToken, IRIToken, OptionalToken, PatternToken, PredicateToken, PrefixedNameToken, SubjectToken, VariableToken } from "sparqler/tokens";
import * as QueryContext from "./QueryContext";

export function getLevelRegExp( property:string ):RegExp {
	if( property ) property += ".";
	const parsedName:string = property.replace( /\./g, "\\." );

	return new RegExp( `^${ parsedName }[^.]+$` );
}

export function createPropertyPatterns( context:QueryContext.Class, resourceName:string, propertyName:string, propertyDefinition:DigestedPropertyDefinition ):PatternToken[] {
	const { uri, literalType, pointerType } = propertyDefinition;

	const propertyPath:IRIToken | PrefixedNameToken = context.compactIRI( uri.stringValue );

	const resource:VariableToken = context.getVariable( resourceName );
	const propertyObject:VariableToken = context.getVariable( propertyName );

	const propertyPatterns:PatternToken[] = [ new SubjectToken( resource )
		.addPredicate( new PredicateToken( propertyPath )
			.addObject( propertyObject ) ),
	];

	if( literalType !== null ) propertyPatterns
		.push( new FilterToken( `datatype( ${ propertyObject } ) = ${ context.compactIRI( literalType.stringValue ) }` ) );
	if( pointerType !== null ) propertyPatterns
		.push( new FilterToken( `! isLiteral( ${ propertyObject } )` ) );

	return propertyPatterns;
}

export function createTypePattern( context:QueryContext.Class, resourceName:string ):PatternToken {
	return new OptionalToken()
		.addPattern( new SubjectToken( context.getVariable( resourceName ) )
			.addPredicate( new PredicateToken( "a" )
				.addObject( context.getVariable( `${ resourceName }.types` ) )
			)
		);
}
