import { Documents } from "../Documents";
import { ObjectSchemaResolver } from "../ObjectSchema";
import { PersistedDocument } from "../PersistedDocument";
import { RDFDocument } from "../RDF/Document";
import { JSONLDConverter } from "./Converter";
export declare class JSONLDCompacter {
    private documents;
    private root?;
    private resolver?;
    private converter?;
    private compactionMap;
    constructor(documents: Documents, root?: string, schemaResolver?: ObjectSchemaResolver, jsonldConverter?: JSONLDConverter);
    compactDocument<T extends PersistedDocument>(rdfDocument: RDFDocument): T;
    compactDocuments<T extends PersistedDocument>(rdfDocuments: RDFDocument[], mainDocuments?: RDFDocument[]): T[];
    private compactNode(node, resource, containerLibrary, path);
    private getResource<T>(node, containerLibrary, isDocument?);
    private processCompactionQueue(compactionQueue);
}
