import { JSONLDConverter } from "../JSONLD";
import {
	DigestedObjectSchema,
	ObjectSchema,
} from "../ObjectSchema";
import {
	GeneralRegistry,
	RegisteredPointer
} from "../Registry";
import { ResolvablePointer } from "../Repository";
import { GeneralRepository } from "./GeneralRepository";


export interface Context<REGISTRY extends RegisteredPointer = RegisteredPointer, REPOSITORY extends ResolvablePointer = ResolvablePointer> {
	readonly registry:GeneralRegistry<REGISTRY> | undefined;
	readonly repository:GeneralRepository<REPOSITORY> | undefined;

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
