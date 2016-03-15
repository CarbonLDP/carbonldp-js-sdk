import * as HTTP from "./../HTTP";
import * as RDFNode from "./RDFNode";
export interface Class {
    "@id"?: string;
    "@graph": RDFNode.Class[];
}
export declare class Factory {
    static is(object: Object): boolean;
    static create(resources: RDFNode.Class[], uri?: string): Class;
}
export declare class Util {
    static getDocuments(objects: Object[]): Class[];
    static getDocuments(object: Object): Class[];
    static getResources(objects: Object[]): RDFNode.Class[];
    static getResources(object: Object): RDFNode.Class[];
    static getDocumentResources(document: RDFNode.Class[]): RDFNode.Class[];
    static getDocumentResources(document: Class): RDFNode.Class[];
    static getFragmentResources(document: RDFNode.Class[], documentResource?: RDFNode.Class): RDFNode.Class[];
    static getFragmentResources(document: Class, documentResource?: RDFNode.Class): RDFNode.Class[];
    static getFragmentResources(document: RDFNode.Class[], documentResourceURI?: string): RDFNode.Class[];
    static getFragmentResources(document: Class, documentResourceURI?: string): RDFNode.Class[];
    static getBNodeResources(document: Class): RDFNode.Class[];
}
export declare class Parser implements HTTP.Parser.Class<Class[]> {
    parse(input: string): Promise<any>;
}
export default Class;
