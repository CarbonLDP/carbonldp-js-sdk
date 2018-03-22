import { BlankNode } from "../BlankNode";
import { ObjectSchema } from "../ObjectSchema";
import { PersistedDocument } from "../PersistedDocument";
import { Map } from "./Map";
import { VolatileResource } from "./VolatileResource";
import { ModelFactory } from "../ModelFactory";
import { ModelDecorator } from "../ModelDecorator";
export interface DocumentMetadata extends VolatileResource {
    relatedDocument: PersistedDocument;
    eTag?: string;
    bNodesMap?: Map<BlankNode, BlankNode>;
}
export interface DocumentMetadataFactory extends ModelFactory<DocumentMetadata>, ModelDecorator<DocumentMetadata> {
    TYPE: string;
    SCHEMA: ObjectSchema;
    isDecorated(object: object): object is DocumentMetadata;
    is(object: object): object is DocumentMetadata;
}
export declare const SCHEMA: ObjectSchema;
export declare const DocumentMetadata: DocumentMetadataFactory;
