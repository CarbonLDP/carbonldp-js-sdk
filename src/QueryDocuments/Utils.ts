import { DigestedObjectSchema } from "../ObjectSchema/DigestedObjectSchema";
import { DigestedObjectSchemaProperty } from "../ObjectSchema/DigestedObjectSchemaProperty";
import { ObjectSchemaUtils } from "../ObjectSchema/ObjectSchemaUtils";

import { QueryPropertyType } from "./QueryPropertyType";


export function _getRootPath( path:string ):string {
	const [ root ]:string[] = path
		.split( "." )
		.slice( 0, 1 );

	return root;
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


export function _getBestType( type1:QueryPropertyType, type2:QueryPropertyType ):QueryPropertyType {
	if( type2 <= type1 )
		return type1;

	return type2;
}

export function _getMatchingDefinition( generalSchema:DigestedObjectSchema, targetSchema:DigestedObjectSchema, propertyName:string, propertyURI?:string ):DigestedObjectSchemaProperty | undefined {
	if( ! targetSchema.properties.has( propertyName ) ) return;

	const definition:DigestedObjectSchemaProperty = ObjectSchemaUtils
		._resolveProperty( generalSchema, targetSchema.properties.get( propertyName ) );

	if( propertyURI === void 0 || propertyURI === definition.uri )
		return definition;
}
