import * as ObjectSchema from "./../ObjectSchema";
import * as DocumentCreatedDetails from "./DocumentCreatedDetails";
import * as Message from "./Message";
export declare const SCHEMA: ObjectSchema.ObjectSchema;
export interface Class extends Message.Class {
    details: DocumentCreatedDetails.Class;
}
export default Class;
