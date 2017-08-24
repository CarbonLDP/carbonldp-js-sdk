import { Class as ObjectSchema } from "./../ObjectSchema";
import { Class as Pointer } from "./../Pointer";
import { Class as Entry } from "./Entry";
import { Class as VolatileResource } from "./VolatileResource";
export declare const RDF_CLASS: string;
export declare const SCHEMA: ObjectSchema;
export interface Class extends VolatileResource {
    resource: Pointer;
    entries: Entry[];
}
export declare class Factory {
    static is(object: object): object is Class;
}
export default Class;
