import * as List from "./List";
import * as Pointer from "./../Pointer";
export interface Class {
    "@id"?: string;
    "@type"?: string;
    "@value"?: string;
}
export declare class Util {
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
    static parseValue(propertyValue: Class, pointerLibrary: Pointer.Library): any;
}
export default Class;
