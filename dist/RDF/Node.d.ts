import { PointerLibrary } from "./../Pointer";
import * as List from "./List";
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
    static getProperty(expandedObject: any, propertyURI: string, pointerLibrary: PointerLibrary): any;
    static getPropertyPointer(expandedObject: any, propertyURI: string, pointerLibrary: PointerLibrary): any;
    static getPropertyLiteral(expandedObject: any, propertyURI: string, literalType: string): any;
    static getPropertyList(expandedObject: any, propertyURI: string, pointerLibrary: PointerLibrary): any;
    static getPropertyPointerList(expandedObject: any, propertyURI: string, pointerLibrary: PointerLibrary): any;
    static getPropertyLiteralList(expandedObject: any, propertyURI: string, literalType: string): any;
    static getProperties(propertyValues: any[], pointerLibrary: PointerLibrary): any;
    static getPropertyPointers(propertyValues: any[], pointerLibrary: PointerLibrary): any;
    static getPropertyURIs(expandedObject: any, propertyURI: string): string[];
    static getPropertyLiterals(propertyValues: any[], literalType: string): any;
    static getPropertyLanguageMap(propertyValues: any[]): any;
    static getList(propertyValues: any[]): List.Class;
}
export default Class;
