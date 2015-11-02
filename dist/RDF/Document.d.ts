import * as RDFNode from './RDFNode';
interface RDFDocument {
    '@id'?: string;
    '@graph': RDFNode.Class[];
}
declare class Factory {
    static is(object: Object): boolean;
    static create(resources: RDFNode.Class[]): RDFDocument;
}
declare class Util {
    static getDocuments(object: Object[]): RDFDocument[];
    static getDocuments(object: Object): RDFDocument[];
    static getResources(document: RDFNode.Class[]): RDFNode.Class[];
    static getResources(document: RDFDocument): RDFNode.Class[];
    static getDocumentResources(document: RDFNode.Class[]): RDFNode.Class[];
    static getDocumentResources(document: RDFDocument): RDFNode.Class[];
    static getFragmentResources(document: RDFNode.Class[], documentResource?: RDFNode.Class): RDFNode.Class[];
    static getFragmentResources(document: RDFDocument, documentResource?: RDFNode.Class): RDFNode.Class[];
    static getFragmentResources(document: RDFNode.Class[], documentResource?: string): RDFNode.Class[];
    static getFragmentResources(document: RDFDocument, documentResource?: string): RDFNode.Class[];
    static getBNodeResources(document: RDFDocument): RDFNode.Class[];
}
export { RDFDocument as Class, Factory, Util };
