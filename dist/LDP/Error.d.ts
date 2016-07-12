import ObjectSchema from "./../ObjectSchema";
import Resource from "./../Resource";
export declare const RDF_CLASS: string;
export declare const SCHEMA: ObjectSchema;
export interface Class extends Resource {
    carbonCode: string;
    message: string;
}
export default Class;
