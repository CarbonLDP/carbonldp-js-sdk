import { ObjectSchema } from "../ObjectSchema";
import { DocumentCreated } from "./DocumentCreated";
export interface ChildCreated extends DocumentCreated {
}
export interface ChildCreatedConstant {
    TYPE: string;
    SCHEMA: ObjectSchema;
}
export declare const ChildCreated: ChildCreatedConstant;
export default ChildCreated;
