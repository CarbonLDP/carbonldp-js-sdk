import * as ObjectSchema from "./ObjectSchema";
import * as PersistedDocument from "./PersistedDocument";
import Resource from "./Resource";
import * as HTTP from "./HTTP";
export declare const RDF_CLASS: string;
export declare const SCHEMA: ObjectSchema.Class;
export interface Class extends PersistedDocument.Class {
    fileIdentifier: string;
    mediaType: string;
    size: number;
    download: () => Promise<[Blob, HTTP.Response.Class]>;
}
export declare class Factory {
    static hasClassProperties(object: Object): boolean;
    static is(object: Object): boolean;
    static decorate<T extends PersistedDocument.Class>(persistedDocument: T): T & Class;
    static hasRDFClass(resource: Resource): boolean;
    static hasRDFClass(expandedObject: Object): boolean;
}
export default Class;
