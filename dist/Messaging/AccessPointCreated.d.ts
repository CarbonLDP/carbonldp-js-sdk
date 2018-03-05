import { ObjectSchema } from "../ObjectSchema";
import { DocumentCreated } from "./DocumentCreated";
export interface AccessPointCreated extends DocumentCreated {
}
export interface AccessPointCreatedConstant {
    TYPE: string;
    SCHEMA: ObjectSchema;
}
export declare const AccessPointCreated: AccessPointCreatedConstant;
export default AccessPointCreated;
