import { VolatileResource } from "../LDP/VolatileResource";
import { ObjectSchema } from "../ObjectSchema";
import { PersistedDocument } from "../PersistedDocument";
export interface PlatformMetadata extends VolatileResource, PersistedDocument {
    version: string;
    buildDate: Date;
}
export interface PlatformMetadataConstant {
    TYPE: string;
    SCHEMA: ObjectSchema;
}
export declare const PlatformMetadata: PlatformMetadataConstant;
export default PlatformMetadata;
