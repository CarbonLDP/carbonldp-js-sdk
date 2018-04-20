import { ObjectSchema } from "../ObjectSchema";
import { TransientResource } from "../TransientResource";
import { Map } from "./Map";
export interface Error extends TransientResource {
    errorCode: string;
    errorMessage: string;
    errorParameters: Map<string, any>;
}
export interface ErrorFactory {
    TYPE: string;
    SCHEMA: ObjectSchema;
}
export declare const Error: ErrorFactory;
