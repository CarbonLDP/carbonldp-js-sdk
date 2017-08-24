import { Class as BlankNode } from "./../BlankNode";
import { Class as ObjectSchema } from "./../ObjectSchema";
import { Class as Pointer } from "./../Pointer";
export declare const SCHEMA: ObjectSchema;
export interface Class extends Pointer {
    key: BlankNode;
    value: BlankNode;
}
export default Class;
