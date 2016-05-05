import * as ObjectSchema from "./../ObjectSchema";
import * as ResponseMetaData from "./ResponseMetaData";
import * as VolatileResource from "./VolatileResource";
export declare const RDF_CLASS: string;
export declare const SCHEMA: ObjectSchema.Class;
export interface Class extends VolatileResource.Class {
    responseProperties: ResponseMetaData.Class[];
}
export declare class Factory {
    static hasClassProperties(object: Object): boolean;
    static is(object: Object): boolean;
    static hasRDFClass(object: Object): boolean;
}
export default Class;
