import { ObjectSchema } from "../ObjectSchema";
import { Resource } from "../Resource";
import { Map } from "./Map";
export interface Error extends Resource {
    errorCode: string;
    errorMessage: string;
    errorParameters: Map<string, any>;
}
export interface ErrorFactory {
    TYPE: string;
    SCHEMA: ObjectSchema;
}
export declare const Error: ErrorFactory;
