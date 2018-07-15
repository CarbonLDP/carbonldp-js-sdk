import { Document } from "../Document";
import { GeneralRegistry } from "../GeneralRegistry/GeneralRegistry";
import { ObjectSchemaResolver } from "../ObjectSchema";
import { RDFDocument } from "../RDF";
import { JSONLDConverter } from "./Converter";
export declare class JSONLDCompacter {
    private readonly registry;
    private readonly root?;
    private readonly resolver?;
    private readonly converter?;
    private readonly compactionMap;
    constructor(registry: GeneralRegistry<Document>, root?: string, schemaResolver?: ObjectSchemaResolver, jsonldConverter?: JSONLDConverter);
    compactDocument<T extends object>(rdfDocument: RDFDocument): T & Document;
    compactDocuments<T extends object>(rdfDocuments: RDFDocument[], mainDocuments?: RDFDocument[]): (T & Document)[];
    private _compactNode;
    private _getResource;
    private _processCompactionQueue;
    private _setOrRemovePartial;
    private _willBePartial;
}
