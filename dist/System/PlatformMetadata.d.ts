import { ObjectSchema } from "../ObjectSchema";
import { PersistedDocument } from "../PersistedDocument";
import { PlatformInstance } from "./PlatformInstance";
export interface PlatformMetadata extends PersistedDocument {
    instance: PlatformInstance;
}
export interface PlatformMetadataFactory {
    TYPE: string;
    SCHEMA: ObjectSchema;
}
export declare const PlatformMetadata: PlatformMetadataFactory;
export default PlatformMetadata;
