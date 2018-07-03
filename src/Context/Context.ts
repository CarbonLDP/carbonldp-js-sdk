import { Authenticator } from "../Auth";
import {
	DigestedObjectSchema,
	ObjectSchema,
} from "../ObjectSchema";
import { Registry } from "../Registry";
import { Repository } from "../Repository";


export interface Context {
	readonly registry:Registry | undefined;
	readonly repository:Repository | undefined;
	readonly auth:Authenticator<any> | undefined;

	readonly baseURI:string;
	readonly parentContext:Context | undefined;


	resolve( relativeURI:string ):string;

	_resolvePath( path:string ):string;


	hasObjectSchema( type:string ):boolean;


	getObjectSchema( type?:string ):DigestedObjectSchema;


	extendObjectSchema( type:string, objectSchema:ObjectSchema ):this;

	extendObjectSchema( objectSchema:ObjectSchema ):this;


	clearObjectSchema( type?:string ):void;
}
