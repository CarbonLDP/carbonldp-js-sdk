import { BlankNode } from "../BlankNode";
import { ObjectSchema } from "../ObjectSchema";
import { Document } from "../Document";
import { Map } from "./Map";
import { VolatileResource } from "./VolatileResource";
import { ModelFactory } from "../ModelFactory";
import { ModelDecorator } from "../ModelDecorator";
export interface DocumentMetadata extends VolatileResource {
    relatedDocument: Document;
    eTag?: string;
    bNodesMap?: Map<BlankNode, BlankNode>;
}
export interface DocumentMetadataFactory extends ModelFactory<DocumentMetadata>, ModelDecorator<DocumentMetadata> {
    TYPE: string;
    SCHEMA: ObjectSchema;
    isDecorated(object: object): object is DocumentMetadata;
    is(object: object): object is DocumentMetadata;
}
export declare const DocumentMetadata: DocumentMetadataFactory;
