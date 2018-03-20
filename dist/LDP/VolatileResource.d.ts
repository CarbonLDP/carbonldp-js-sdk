import { ModelFactory } from "../ModelFactory";
import { Resource } from "../Resource";
export interface VolatileResource extends Resource {
}
export interface VolatileResourceFactory extends ModelFactory<VolatileResource> {
    TYPE: string;
    is(object: object): object is VolatileResource;
    createFrom<T extends object>(object: T): T & VolatileResource;
}
export declare const VolatileResource: VolatileResourceFactory;
