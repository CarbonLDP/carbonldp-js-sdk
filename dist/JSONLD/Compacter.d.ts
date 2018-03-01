import { Documents } from "../Documents";
import { ObjectSchemaResolver } from "../ObjectSchema";
import { PersistedDocument } from "../PersistedDocument";
import * as RDFDocument from "../RDF/Document";
import { JSONLDConverter } from "./Converter";
export declare class JSONLDCompacter {
    private documents;
    private root?;
    private resolver?;
    private converter?;
    private compactionMap;
    constructor(documents: Documents, root?: string, schemaResolver?: ObjectSchemaResolver, jsonldConverter?: JSONLDConverter);
    compactDocument<T extends PersistedDocument>(rdfDocument: RDFDocument.Class): T;
    compactDocuments<T extends PersistedDocument>(rdfDocuments: RDFDocument.Class[], mainDocuments?: RDFDocument.Class[]): T[];
    private compactNode(node, resource, containerLibrary, path);
    private getResource<T>(node, containerLibrary, isDocument?);
    private processCompactionQueue(compactionQueue);
}
export default JSONLDCompacter;
