import { Document } from "../Document";
import { ModelSchema } from "../Model";
import { ObjectSchema } from "../ObjectSchema";
import { Pointer } from "../Pointer";
import { C } from "../Vocabularies";
import { Map } from "./Map";
import { VolatileResource } from "./VolatileResource";
export interface DocumentMetadata extends VolatileResource {
    relatedDocument: Document;
    eTag?: string;
    bNodesMap?: Map<Pointer, Pointer>;
}
export interface DocumentMetadataFactory extends ModelSchema {
    TYPE: C["DocumentMetadata"];
    SCHEMA: ObjectSchema;
}
export declare const DocumentMetadata: DocumentMetadataFactory;
