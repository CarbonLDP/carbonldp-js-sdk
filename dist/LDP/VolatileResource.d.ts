import { ModelFactory } from "../core/ModelFactory";
import { TransientResource } from "../Resource";
export interface VolatileResource extends TransientResource {
}
export interface VolatileResourceFactory extends ModelFactory<VolatileResource> {
    TYPE: string;
    is(object: object): object is VolatileResource;
    create(): VolatileResource;
    createFrom<T extends object>(object: T): T & VolatileResource;
}
export declare const VolatileResource: VolatileResourceFactory;
