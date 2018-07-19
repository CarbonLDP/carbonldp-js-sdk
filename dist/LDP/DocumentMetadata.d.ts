import { Document } from "../Document/Document";
import { ModelSchema } from "../Model/ModelSchema";
import { ObjectSchema } from "../ObjectSchema/ObjectSchema";
import { Pointer } from "../Pointer/Pointer";
import { C } from "../Vocabularies/C";
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
