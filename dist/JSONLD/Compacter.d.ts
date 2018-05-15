import { Document } from "../Document";
import { ObjectSchemaResolver } from "../ObjectSchema";
import { RDFDocument } from "../RDF";
import { RegistryService } from "../Registry";
import { JSONLDConverter } from "./Converter";
export declare class JSONLDCompacter {
    private readonly registry;
    private readonly root?;
    private readonly resolver?;
    private readonly converter?;
    private readonly compactionMap;
    constructor(registry: RegistryService<Document, any>, root?: string, schemaResolver?: ObjectSchemaResolver, jsonldConverter?: JSONLDConverter);
    compactDocument<T extends object>(rdfDocument: RDFDocument): T & Document;
    compactDocuments<T extends object>(rdfDocuments: RDFDocument[], mainDocuments?: RDFDocument[]): (T & Document)[];
    private _compactNode(node, resource, containerLibrary, path);
    private _getResource<M>(node, registry);
    private _processCompactionQueue(compactionQueue);
    private _setOrRemovePartial(resource, schema, path);
    private _willBePartial(resource, schema, path);
}
