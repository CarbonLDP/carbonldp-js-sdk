import { GeneralRegistry } from "../GeneralRegistry/GeneralRegistry";
import { GeneralRepository } from "../GeneralRepository/GeneralRepository";

import { JSONLDConverter } from "../JSONLD/JSONLDConverter";

import { ModelSchema } from "../Model/ModelSchema";

import { DigestedObjectSchema } from "../ObjectSchema/DigestedObjectSchema";
import { ObjectSchema } from "../ObjectSchema/ObjectSchema";

import { RegisteredPointer } from "../Registry/RegisteredPointer";
import { ResolvablePointer } from "../Repository/ResolvablePointer";


export interface Context<REGISTRY extends RegisteredPointer = RegisteredPointer, REPOSITORY extends ResolvablePointer = ResolvablePointer> {
	readonly registry:GeneralRegistry<REGISTRY> | undefined;
	readonly repository:GeneralRepository<REPOSITORY> | undefined;

	readonly baseURI:string;
	readonly parentContext:Context | undefined;

	readonly jsonldConverter:JSONLDConverter;


	resolve( relativeURI:string ):string;

	hasObjectSchema( type:string ):boolean;

	getObjectSchema( type?:string ):DigestedObjectSchema;

	extendObjectSchema( objectSchema:ObjectSchema ):this;
	extendObjectSchema( type:string, objectSchema:ObjectSchema ):this;
	extendObjectSchema( modelSchema:ModelSchema ):this;

	clearObjectSchema( type?:string ):void;
}
