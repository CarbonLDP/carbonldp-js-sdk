import { ObjectSchema } from "../ObjectSchema";
import { DocumentCreated } from "./DocumentCreated";
export interface ChildCreated extends DocumentCreated {
}
export interface ChildCreatedFactory {
    TYPE: string;
    SCHEMA: ObjectSchema;
}
export declare const ChildCreated: ChildCreatedFactory;
export default ChildCreated;
