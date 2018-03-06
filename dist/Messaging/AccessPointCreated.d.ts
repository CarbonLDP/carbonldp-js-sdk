import { ObjectSchema } from "../ObjectSchema";
import { DocumentCreated } from "./DocumentCreated";
export interface AccessPointCreated extends DocumentCreated {
}
export interface AccessPointCreatedFactory {
    TYPE: string;
    SCHEMA: ObjectSchema;
}
export declare const AccessPointCreated: AccessPointCreatedFactory;
export default AccessPointCreated;
