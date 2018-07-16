import { ModelFactory } from "../Model/ModelFactory";
import { Resource } from "../Resource/Resource";
import { C } from "../Vocabularies/C";
export interface VolatileResource extends Resource {
}
export interface VolatileResourceFactory extends ModelFactory<VolatileResource> {
    TYPE: C["VolatileResource"];
    is(value: any): value is VolatileResource;
    create<T extends object>(data?: T): T & VolatileResource;
    createFrom<T extends object>(object: T): T & VolatileResource;
}
export declare const VolatileResource: VolatileResourceFactory;
