import { TransientBlankNode } from "../BlankNode";
import { ModelSchema } from "../core/ModelSchema";
import { Document } from "../Document";
import { ObjectSchema } from "../ObjectSchema";
import { C } from "../Vocabularies/C";
import { Map } from "./Map";
import { VolatileResource } from "./VolatileResource";
export interface DocumentMetadata extends VolatileResource {
    relatedDocument: Document;
    eTag?: string;
    bNodesMap?: Map<TransientBlankNode, TransientBlankNode>;
}
export interface DocumentMetadataFactory extends ModelSchema {
    TYPE: C["DocumentMetadata"];
    SCHEMA: ObjectSchema;
}
export declare const DocumentMetadata: DocumentMetadataFactory;
