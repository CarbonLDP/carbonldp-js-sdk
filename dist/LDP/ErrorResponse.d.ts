import Error from "./Error";
import ObjectSchema from "./../ObjectSchema";
import Resource from "./../Resource";
export declare const RDF_CLASS: string;
export declare const SCHEMA: ObjectSchema;
export interface Class extends Resource {
    errors: Error[];
    requestID: string;
    statusCode: number;
}
export declare class Util {
    static getMessage(errorResponse: Class): string;
}
export default Class;
