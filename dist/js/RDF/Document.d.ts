import * as RDFNode from "./RDFNode";
export interface Class {
    "@id"?: string;
    "@graph": RDFNode.Class[];
}
export declare class Factory {
    static is(object: Object): boolean;
    static create(resources: RDFNode.Class[]): Class;
}
export declare class Util {
    static getDocuments(object: Object[]): Class[];
    static getDocuments(object: Object): Class[];
    static getResources(objects: Object[]): RDFNode.Class[];
    static getResources(object: Object): RDFNode.Class[];
    static getDocumentResources(document: RDFNode.Class[]): RDFNode.Class[];
    static getDocumentResources(document: Class): RDFNode.Class[];
    static getFragmentResources(document: RDFNode.Class[], documentResource?: RDFNode.Class): RDFNode.Class[];
    static getFragmentResources(document: Class, documentResource?: RDFNode.Class): RDFNode.Class[];
    static getFragmentResources(document: RDFNode.Class[], documentResource?: string): RDFNode.Class[];
    static getFragmentResources(document: Class, documentResource?: string): RDFNode.Class[];
    static getBNodeResources(document: Class): RDFNode.Class[];
}
