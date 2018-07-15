import { VolatileResource } from "../LDP";
import { ObjectSchema } from "../ObjectSchema";
import { PlatformMetadata } from "./PlatformMetadata";
export interface PlatformInstance extends VolatileResource {
    _registry: PlatformMetadata;
    buildDate: Date;
    version: string;
}
export interface PlatformInstanceFactory {
    TYPE: string;
    SCHEMA: ObjectSchema;
}
export declare const PlatformInstance: PlatformInstanceFactory;
