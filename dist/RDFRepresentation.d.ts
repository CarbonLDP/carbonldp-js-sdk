import * as ObjectSchema from "./ObjectSchema";
import * as PersistedDocument from "./PersistedDocument";
export declare const RDF_CLASS: string;
export declare const SCHEMA: ObjectSchema.Class;
export interface Class extends PersistedDocument.Class {
    mediaType: string;
    size: number;
}
export declare class Factory {
    static hasClassProperties(object: Object): boolean;
    static is(object: Object): boolean;
}
export default Class;
