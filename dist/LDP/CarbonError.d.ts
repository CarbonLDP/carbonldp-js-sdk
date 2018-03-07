import { ObjectSchema } from "../ObjectSchema";
import { Resource } from "../Resource";
import { CarbonMap } from "./CarbonMap";
export interface CarbonError extends Resource {
    errorCode: string;
    errorMessage: string;
    errorParameters: CarbonMap<string, any>;
}
export interface CarbonErrorFactory {
    TYPE: string;
    SCHEMA: ObjectSchema;
}
export declare const CarbonError: CarbonErrorFactory;
