import { Class as BlankNode } from "./../BlankNode";
import { Class as ObjectSchema } from "./../ObjectSchema";
export declare const SCHEMA: ObjectSchema;
export interface Class extends BlankNode {
    key: BlankNode;
    value: BlankNode;
}
export default Class;
