import Error from "./Error";
import HTTPParser from "./../HTTP/Parser";
import ObjectSchema from "./../ObjectSchema";
import Resource from "./../Resource";
export declare const RDF_CLASS: string;
export declare const SCHEMA: ObjectSchema;
export interface Class extends Resource {
    errors: Error[];
    statusCode: number;
}
export declare class Util {
    static getMessage(errorResponse: Class): string;
}
export declare class Parser implements HTTPParser<Class> {
    parse(input: string): Promise<Class>;
}
export default Class;
