import { Resolver } from "../ObjectSchema";
import * as PersistedDocument from "../PersistedDocument";
import * as Pointer from "../Pointer";
import * as RDFDocument from "../RDF/Document";
import * as RDFNode from "../RDF/Node";
import * as Documents from "./../Documents";
import * as Converter from "./Converter";
export declare class Class {
    private documents;
    private resolver?;
    private converter?;
    private compactionMap;
    constructor(documents: Documents.Class, schemaResolver?: Resolver, jsonldConverter?: Converter.Class);
    compactDocument<T extends PersistedDocument.Class>(rdfDocument: RDFDocument.Class): T;
    compactDocuments<T extends PersistedDocument.Class>(rdfDocuments: RDFDocument.Class[], mainDocuments?: RDFDocument.Class[]): T[];
    compactNode(node: RDFNode.Class, resource: Pointer.Class, containerLibrary: Pointer.Library, path: string): void;
    private getResource<T>(node, containerLibrary, isDocument?);
    private processCompactionQueue(compactionQueue);
}
export default Class;
