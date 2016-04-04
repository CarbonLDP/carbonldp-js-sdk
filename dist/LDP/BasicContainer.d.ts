import * as Pointer from "./../Pointer";
import * as Container from "./Container";
export declare const RDF_CLASS: string;
export interface Class extends Container.Class {
}
export declare class Factory {
    static hasRDFClass(pointer: Pointer.Class): boolean;
    static hasRDFClass(expandedObject: Object): boolean;
}
export default Class;
