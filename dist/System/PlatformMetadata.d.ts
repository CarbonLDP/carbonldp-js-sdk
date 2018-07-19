import { Document } from "../Document/Document";
import { ObjectSchema } from "../ObjectSchema/ObjectSchema";
import { PlatformInstance } from "./PlatformInstance";
export interface PlatformMetadata extends Document {
    instance: PlatformInstance;
}
export interface PlatformMetadataFactory {
    TYPE: string;
    SCHEMA: ObjectSchema;
}
export declare const PlatformMetadata: PlatformMetadataFactory;
