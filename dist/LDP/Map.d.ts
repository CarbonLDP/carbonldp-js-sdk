import { Class as ObjectSchema } from "./../ObjectSchema";
import { Class as Entry } from "./Entry";
import { Class as Resource } from "./../Resource";
export declare const RDF_CLASS: string;
export declare const SCHEMA: ObjectSchema;
export interface Class<K, V> extends Resource {
    entries: Entry<K, V>[];
}
export declare class Factory {
    static is(object: object): object is Class<any, any>;
}
export default Class;
