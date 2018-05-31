import { ModelFactory } from "../core/ModelFactory";
import { TransientResource } from "../Resource";
import { C } from "../Vocabularies/C";
export interface VolatileResource extends TransientResource {
}
export interface VolatileResourceFactory extends ModelFactory<VolatileResource> {
    TYPE: C["VolatileResource"];
    is(value: any): value is VolatileResource;
    create<T extends object>(data?: T): T & VolatileResource;
    createFrom<T extends object>(object: T): T & VolatileResource;
}
export declare const VolatileResource: VolatileResourceFactory;
