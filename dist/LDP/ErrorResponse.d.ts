import Error from "./Error";
import ObjectSchema from "./../ObjectSchema";
export declare const RDF_CLASS: string;
export declare const SCHEMA: ObjectSchema;
export interface Class {
    errors: Error[];
    statusCode: number;
}
export declare class Factory {
    static create(data: string): Promise<Class>;
}
export declare class Util {
    static getMessage(errorResponse: Class): string;
}
export default Class;
