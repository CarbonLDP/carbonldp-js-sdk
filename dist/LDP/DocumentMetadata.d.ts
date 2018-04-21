import { TransientBlankNode } from "../TransientBlankNode";
import { ObjectSchema } from "../ObjectSchema";
import { Document } from "../Document";
import { Map } from "./Map";
import { VolatileResource } from "./VolatileResource";
import { ModelFactory } from "../core/ModelFactory";
import { ModelDecorator } from "../core/ModelDecorator";
export interface DocumentMetadata extends VolatileResource {
    relatedDocument: Document;
    eTag?: string;
    bNodesMap?: Map<TransientBlankNode, TransientBlankNode>;
}
export interface DocumentMetadataFactory extends ModelFactory<DocumentMetadata>, ModelDecorator<DocumentMetadata> {
    TYPE: string;
    SCHEMA: ObjectSchema;
    isDecorated(object: object): object is DocumentMetadata;
    is(object: object): object is DocumentMetadata;
}
export declare const DocumentMetadata: DocumentMetadataFactory;
