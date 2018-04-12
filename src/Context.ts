import { AuthService } from "./Auth/Service";
import { Documents } from "./Documents";
import * as ObjectSchema from "./ObjectSchema";

export interface Context {
	auth?:AuthService;
	documents:Documents;

	readonly baseURI:string;
	readonly parentContext:Context;


	resolve( relativeURI:string ):string;

	_resolvePath( path:string ):string;


	hasObjectSchema( type:string ):boolean;


	getObjectSchema( type?:string ):ObjectSchema.DigestedObjectSchema;


	extendObjectSchema( type:string, objectSchema:ObjectSchema.ObjectSchema ):void;

	extendObjectSchema( objectSchema:ObjectSchema.ObjectSchema ):void;


	clearObjectSchema( type?:string ):void;
}
