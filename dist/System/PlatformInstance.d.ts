import { VolatileResource } from "../LDP/VolatileResource";
import { ObjectSchema } from "../ObjectSchema/ObjectSchema";
import { PlatformMetadata } from "./PlatformMetadata";
export interface PlatformInstance extends VolatileResource {
    $registry: PlatformMetadata;
    buildDate: Date;
    version: string;
}
export interface PlatformInstanceFactory {
    TYPE: string;
    SCHEMA: ObjectSchema;
}
export declare const PlatformInstance: PlatformInstanceFactory;
