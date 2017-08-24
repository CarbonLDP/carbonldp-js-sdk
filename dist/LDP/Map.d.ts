import { Class as ObjectSchema } from "./../ObjectSchema";
import { Class as Entry } from "./Entry";
import { Class as Resource } from "./../Resource";
export declare const RDF_CLASS: string;
export declare const SCHEMA: ObjectSchema;
export interface Class extends Resource {
    entries: Entry[];
}
export declare class Factory {
    static is(object: object): object is Class;
}
export default Class;
