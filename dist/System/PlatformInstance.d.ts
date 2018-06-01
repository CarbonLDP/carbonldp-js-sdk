import { VolatileResource } from "../LDP/VolatileResource";
import { ObjectSchema } from "../ObjectSchema";
import { Fragment } from "../Fragment";
export interface PlatformInstance extends VolatileResource, Fragment {
    buildDate: Date;
    version: string;
}
export interface PlatformInstanceFactory {
    TYPE: string;
    SCHEMA: ObjectSchema;
}
export declare const PlatformInstance: PlatformInstanceFactory;
