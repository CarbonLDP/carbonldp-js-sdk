import * as HTTP from "../HTTP";
import * as Node from "./Node";
export interface Class {
    "@id"?: string;
    "@graph": Node.Class[];
}
export declare class Factory {
    static is(object: Object): object is Class;
    static create(resources: Node.Class[], uri?: string): Class;
}
export declare class Util {
    static getDocuments(objects: Object[]): Class[];
    static getDocuments(object: Object): Class[];
    static getResources(objects: Object[]): Node.Class[];
    static getResources(object: Object): Node.Class[];
    static getDocumentResources(document: Node.Class[]): Node.Class[];
    static getDocumentResources(document: Class): Node.Class[];
    static getFragmentResources(document: Node.Class[], documentResource?: Node.Class): Node.Class[];
    static getFragmentResources(document: Class, documentResource?: Node.Class): Node.Class[];
    static getFragmentResources(document: Node.Class[], documentResourceURI?: string): Node.Class[];
    static getFragmentResources(document: Class, documentResourceURI?: string): Node.Class[];
    static getBNodeResources(document: Class): Node.Class[];
    static getNodes(rdfDocument: Class): [Node.Class[], Node.Class[]];
    private static isNodeFragment(node);
}
export declare class Parser implements HTTP.Parser.Class<Class[]> {
    parse(input: string): Promise<any>;
}
export default Class;
