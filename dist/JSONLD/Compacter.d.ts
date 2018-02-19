import { Resolver } from "../ObjectSchema";
import * as PersistedDocument from "../PersistedDocument";
import * as RDFDocument from "../RDF/Document";
import * as Documents from "./../Documents";
import * as Converter from "./Converter";
export declare class Class {
    private documents;
    private root?;
    private resolver?;
    private converter?;
    private compactionMap;
    constructor(documents: Documents.Class, root?: string, schemaResolver?: Resolver, jsonldConverter?: Converter.Class);
    compactDocument<T extends PersistedDocument.Class>(rdfDocument: RDFDocument.Class): T;
    compactDocuments<T extends PersistedDocument.Class>(rdfDocuments: RDFDocument.Class[], mainDocuments?: RDFDocument.Class[]): T[];
    private compactNode(node, resource, containerLibrary, path);
    private getResource<T>(node, containerLibrary, isDocument?);
    private processCompactionQueue(compactionQueue);
}
export default Class;
