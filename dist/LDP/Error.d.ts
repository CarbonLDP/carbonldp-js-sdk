import { ObjectSchema } from "../ObjectSchema/ObjectSchema";
import { Resource } from "../Resource/Resource";
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
