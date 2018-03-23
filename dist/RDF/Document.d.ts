import { Parser } from "../HTTP/Parser";
import { JSONLDParser } from "../JSONLD/Parser";
import { RDFNode } from "./Node";
export interface RDFDocument {
    "@id"?: string;
    "@graph": RDFNode[];
}
export interface RDFDocumentFactory {
    is(value: any): value is RDFDocument;
    create(resources: RDFNode[], uri?: string): RDFDocument;
    getDocuments(objects: object | object[]): RDFDocument[];
    getResources(objects: object | object[]): RDFNode[];
    getDocumentResources(document: RDFNode[] | RDFDocument): RDFNode[];
    getNamedFragmentResources(document: RDFNode[] | RDFDocument, documentResource?: string | RDFNode): RDFNode[];
    getBNodeResources(document: RDFDocument): RDFNode[];
    getNodes(rdfDocument: RDFDocument): [RDFNode[], RDFNode[]];
}
export declare const RDFDocument: RDFDocumentFactory;
export declare class RDFDocumentParser extends JSONLDParser implements Parser<RDFDocument[]> {
    parse(input: string): Promise<RDFDocument[]>;
}
