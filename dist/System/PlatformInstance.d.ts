import { VolatileResource } from "../LDP/VolatileResource";
import { ObjectSchema } from "../ObjectSchema";
import { Fragment } from "../Fragment";
import { PlatformMetadata } from "./PlatformMetadata";
export interface PlatformInstance extends VolatileResource, Fragment {
    _registry: PlatformMetadata;
    buildDate: Date;
    version: string;
}
export interface PlatformInstanceFactory {
    TYPE: string;
    SCHEMA: ObjectSchema;
}
export declare const PlatformInstance: PlatformInstanceFactory;
