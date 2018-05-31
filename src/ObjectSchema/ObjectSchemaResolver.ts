import {
	hasFunction,
	isObject
} from "../Utils";
import { DigestedObjectSchema } from "./DigestedObjectSchema";

export interface ObjectSchemaResolver {
	getGeneralSchema():DigestedObjectSchema;

	hasSchemaFor( object:object, path?:string ):boolean;

	getSchemaFor( object:object, path?:string ):DigestedObjectSchema;
}


export interface ObjectSchemaResolverFactory {
	is( value:any ):value is ObjectSchemaResolver;
}

export const ObjectSchemaResolver:ObjectSchemaResolverFactory = {
	is( value:any ):value is ObjectSchemaResolver {
		return isObject( value )
			&& hasFunction( value, "getGeneralSchema" )
			&& hasFunction( value, "hasSchemaFor" )
			&& hasFunction( value, "getSchemaFor" )
			;
	},
};
