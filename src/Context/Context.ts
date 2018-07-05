import { JSONLDConverter } from "../JSONLD";
import {
	DigestedObjectSchema,
	ObjectSchema,
} from "../ObjectSchema";
import {
	RegisteredPointer,
	Registry
} from "../Registry";
import {
	Repository,
	ResolvablePointer
} from "../Repository";


export interface Context<REGISTRY extends RegisteredPointer = RegisteredPointer, REPOSITORY extends ResolvablePointer = ResolvablePointer> {
	readonly registry:Registry<REGISTRY> | undefined;
	readonly repository:Repository<REPOSITORY> | undefined;

	readonly baseURI:string;
	readonly parentContext:Context | undefined;

	readonly jsonldConverter:JSONLDConverter;


	resolve( relativeURI:string ):string;


	hasObjectSchema( type:string ):boolean;


	getObjectSchema( type?:string ):DigestedObjectSchema;


	extendObjectSchema( type:string, objectSchema:ObjectSchema ):this;

	extendObjectSchema( objectSchema:ObjectSchema ):this;


	clearObjectSchema( type?:string ):void;
}
