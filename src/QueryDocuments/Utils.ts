import { BracketedExpressionToken } from "sparqler/tokens";

import { DigestedObjectSchema } from "../ObjectSchema/DigestedObjectSchema";
import { DigestedObjectSchemaProperty } from "../ObjectSchema/DigestedObjectSchemaProperty";
import { ObjectSchemaUtils } from "../ObjectSchema/ObjectSchemaUtils";

import { QueryPropertyType } from "./QueryPropertyType";


/**
 * Returns the root name of a full property path.
 * @param path The path to extract its root.
 */
export function _getRootPath( path:string ):string {
	const [ root ]:string[] = path
		.split( "." )
		.slice( 0, 1 );

	return root;
}


/**
 * Search and returns the property value indicated by the specified path inside the element provided.
 * @param element The element where to find the desired property.
 * @param path The path in the element to the desired property.
 */
export function _getPathProperty( element:any, path:string ):any {
	if( element === void 0 || !path ) return element;

	const [ propName, ...restParts ] = path.split( "." );

	const property:any = element[ propName ];
	const restPath:string = restParts.join( "." );

	return _getPathProperty( property, restPath );
}

/**
 * Returns true if the two elements provided can be classified as different type.
 * This simulates the basic comparision in the SPARQL language.
 * @param a The first element to check against.
 * @param b The second element to check against.
 */
export function _areDifferentType( a:any, b:any ):boolean {
	if( typeof a !== typeof b ) return true;
	if( typeof a === "object" ) return a instanceof Date !== b instanceof Date;

	return false;
}


/**
 * Returns the general type that would match the two provided.
 * @param type1 The first type to compare.
 * @param type2 The second type to compare.
 */
export function _getBestType( type1:QueryPropertyType, type2:QueryPropertyType ):QueryPropertyType {
	if( type2 <= type1 )
		return type1;

	return type2;
}

/**
 * Returns the definition from the target schema that matched the name and the URI provided.
 * If no correct match is found, `undefined` will be returned.
 *
 * @param generalSchema The schema to use in the resolution of relative URI in the matched definition.
 * @param targetSchema The schema where to look for the property's definition.
 * @param propertyName The name of the property to look for.
 * @param propertyURI The optional URI that the property has to have for have a true matching.
 */
export function _getMatchingDefinition( generalSchema:DigestedObjectSchema, targetSchema:DigestedObjectSchema, propertyName:string, propertyURI?:string ):DigestedObjectSchemaProperty | undefined {
	if( !targetSchema.properties.has( propertyName ) ) return;

	const definition:DigestedObjectSchemaProperty = ObjectSchemaUtils
		._resolveProperty( generalSchema, targetSchema.properties.get( propertyName )! );

	if( propertyURI === void 0 || propertyURI === definition.uri )
		return definition;
}


export function _getRawExpression( expression:string ):BracketedExpressionToken {
	return new RawExpressionToken( expression );
}

class RawExpressionToken extends BracketedExpressionToken {
	constructor( rawExpression:string ) {
		super( rawExpression as any );
	}

	toString():string {
		return super.toString( 0 );
	}
}
