import { RDFNode } from "./Node";
export interface RDFDocument extends RDFNode {
    "@id": string;
    "@graph": RDFNode[];
}
export interface RDFDocumentFactory {
    is(value: any): value is RDFDocument;
    create(resources: RDFNode[], uri?: string): RDFDocument;
    getDocuments(objects: object | object[]): RDFDocument[];
    getFreeNodes(objects: object | object[]): RDFNode[];
    getResources(objects: object | object[]): RDFNode[];
    getDocumentResources(document: RDFNode[] | RDFDocument): RDFNode[];
    getNamedFragmentResources(document: RDFNode[] | RDFDocument, documentResource?: string | RDFNode): RDFNode[];
    getBNodeResources(document: RDFDocument): RDFNode[];
    getNodes(rdfDocument: RDFDocument): [RDFNode[], RDFNode[]];
}
export declare const RDFDocument: RDFDocumentFactory;
