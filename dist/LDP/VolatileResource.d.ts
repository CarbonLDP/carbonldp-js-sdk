import { ModelFactory } from "../ModelFactory";
import { Resource } from "../Resource";
export interface VolatileResource extends Resource {
}
export interface VolatileResourceConstant extends ModelFactory<VolatileResource> {
    TYPE: string;
    is(object: object): object is VolatileResource;
}
export declare const VolatileResource: VolatileResourceConstant;
export default VolatileResource;
