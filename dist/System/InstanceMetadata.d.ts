import * as ObjectSchema from "./../ObjectSchema";
import * as PersistedProtectedDocument from "./../PersistedProtectedDocument";
import * as Pointer from "./../Pointer";
export declare const RDF_CLASS: string;
export declare const SCHEMA: ObjectSchema.Class;
export interface Class extends PersistedProtectedDocument.Class {
    name?: string;
    description?: string;
    allowsOrigins?: (Pointer.Class | string)[];
}
export default Class;
