import { DigestedPropertyDefinition } from "../../ObjectSchema";
import { FilterToken, IRIToken, OptionalToken, PredicateToken, PrefixedNameToken, SubjectToken, VariableToken } from "sparqler/tokens";
import * as QueryContext from "./QueryContext";

export function getLevelRegExp( property:string ):RegExp {
	if( property ) property += ".";
	const parsedName:string = property.replace( /\./g, "\\." );

	return new RegExp( `^${ parsedName }[^.]+$` );
}

export function createPropertyPattern( context:QueryContext.Class, resourceName:string, propertyName:string, propertyDefinition:DigestedPropertyDefinition ):OptionalToken {
	const { uri, literalType, pointerType } = propertyDefinition;

	const propertyPath:IRIToken | PrefixedNameToken = context.compactIRI( uri.stringValue );

	const resource:VariableToken = context.getVariable( resourceName );
	const propertyObject:VariableToken = context.getVariable( propertyName );

	const propertyPattern:OptionalToken = new OptionalToken()
		.addPattern( new SubjectToken( resource )
			.addPredicate( new PredicateToken( propertyPath )
				.addObject( propertyObject ) ) )
	;

	if( literalType !== null ) propertyPattern
		.addPattern( new FilterToken( `datatype( ${ propertyObject } ) = ${ context.compactIRI( literalType.stringValue ) }` ) );
	if( pointerType !== null ) propertyPattern
		.addPattern( new FilterToken( `! isLiteral( ${ propertyObject } )` ) );

	return propertyPattern;
}
