import { BlankNode } from "../BlankNode";
import { ObjectSchema as ObjectSchema } from "./../ObjectSchema";
export declare const SCHEMA: ObjectSchema;
export interface Class<K, V> extends BlankNode {
    entryKey: K;
    entryValue: V;
}
export default Class;
