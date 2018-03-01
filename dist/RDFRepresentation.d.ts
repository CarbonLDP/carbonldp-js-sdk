import * as ObjectSchema from "./ObjectSchema";
import { PersistedDocument } from "./PersistedDocument";
export declare const RDF_CLASS: string;
export declare const SCHEMA: ObjectSchema.ObjectSchema;
export interface Class extends PersistedDocument {
    mediaType: string;
    size: number;
}
export declare class Factory {
    static hasClassProperties(object: Object): boolean;
    static is(object: Object): boolean;
}
export default Class;
