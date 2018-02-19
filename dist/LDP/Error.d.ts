import ObjectSchema from "./../ObjectSchema";
import Resource from "./../Resource";
import Map from "./Map";
export declare const RDF_CLASS: string;
export declare const SCHEMA: ObjectSchema;
export interface Class extends Resource {
    errorCode: string;
    errorMessage: string;
    errorParameters: Map<string, any>;
}
export default Class;
