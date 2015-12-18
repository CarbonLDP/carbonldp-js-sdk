/// <reference path="../../typings/tsd.d.ts" />
import * as Pointer from "./../Pointer";
import * as Container from "./Container";
export declare const RDF_CLASS: string;
export interface Class extends Container.Class {
}
export declare class Factory {
    hasRDFClass(pointer: Pointer.Class): boolean;
    hasRDFClass(expandedObject: Object): boolean;
}
export declare let factory: Factory;
export default Class;
