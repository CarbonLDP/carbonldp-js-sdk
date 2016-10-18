import * as List from "./List";
import * as Pointer from "./../Pointer";
export interface Class {
    "@id": string;
}
export declare class Factory {
    static is(value: Object): boolean;
    static create(uri: string): Class;
}
export declare class Util {
    static areEqual(node1: Class, node2: Class): boolean;
    static hasType(node: Class, type: string): boolean;
    static getTypes(node: Class): string[];
    static getPropertyURI(node: Class, predicate: string): string;
    static getFreeNodes<T extends Object>(value: T): Class[];
    static getProperty(expandedObject: any, propertyURI: string, pointerLibrary: Pointer.Library): any;
    static getPropertyPointer(expandedObject: any, propertyURI: string, pointerLibrary: Pointer.Library): any;
    static getPropertyLiteral(expandedObject: any, propertyURI: string, literalType: string): any;
    static getPropertyList(expandedObject: any, propertyURI: string, pointerLibrary: Pointer.Library): any;
    static getPropertyPointerList(expandedObject: any, propertyURI: string, pointerLibrary: Pointer.Library): any;
    static getPropertyLiteralList(expandedObject: any, propertyURI: string, literalType: string): any;
    static getProperties(expandedObject: any, propertyURI: string, pointerLibrary: Pointer.Library): any;
    static getPropertyPointers(expandedObject: any, propertyURI: string, pointerLibrary: Pointer.Library): any;
    static getPropertyURIs(expandedObject: any, propertyURI: string): string[];
    static getPropertyLiterals(expandedObject: any, propertyURI: string, literalType: string): any;
    static getPropertyLanguageMap(expandedObject: any, propertyURI: string): any;
    static getList(propertyValues: Array<any>): List.Class;
}
export default Class;
