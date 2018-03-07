import { VolatileResource } from "../LDP/VolatileResource";
import { ObjectSchema } from "../ObjectSchema";
import { PersistedFragment } from "../PersistedFragment";
export interface PlatformInstance extends VolatileResource, PersistedFragment {
    buildDate: Date;
    version: string;
}
export interface PlatformInstanceFactory {
    TYPE: string;
    SCHEMA: ObjectSchema;
}
export declare const PlatformInstance: PlatformInstanceFactory;
