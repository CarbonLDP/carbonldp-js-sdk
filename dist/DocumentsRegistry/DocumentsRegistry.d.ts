import { DocumentsContext } from "../Context/DocumentsContext";
import { Document } from "../Document/Document";
import { GeneralRegistry } from "../GeneralRegistry/GeneralRegistry";
import { ModelDecorator } from "../Model/ModelDecorator";
import { ModelFactory } from "../Model/ModelFactory";
import { ModelPrototype } from "../Model/ModelPrototype";
import { BaseDocumentsRegistry } from "./BaseDocumentsRegistry";
export interface DocumentsRegistry extends GeneralRegistry<Document> {
    readonly $context: DocumentsContext;
    register(id: string): Document;
}
export declare type DocumentsRegistryFactory = ModelPrototype<DocumentsRegistry, GeneralRegistry<Document>, "_getLocalID"> & ModelDecorator<DocumentsRegistry, BaseDocumentsRegistry> & ModelFactory<DocumentsRegistry, BaseDocumentsRegistry>;
export declare const DocumentsRegistry: DocumentsRegistryFactory;
