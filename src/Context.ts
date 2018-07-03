import { Authenticator } from "./Auth";
import {
	DigestedObjectSchema,
	ObjectSchema,
} from "./ObjectSchema";
import {
	RegisteredPointer,
	Registry,
} from "./Registry";
import {
	Repository,
	ResolvablePointer
} from "./Repository";


export interface Context<R1 extends RegisteredPointer = RegisteredPointer, R2 extends ResolvablePointer = ResolvablePointer> {
	readonly registry:Registry<R1> | undefined;
	readonly repository:Repository<R2> | undefined;
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
