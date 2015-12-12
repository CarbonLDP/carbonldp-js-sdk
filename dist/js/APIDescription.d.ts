/// <reference path="../typings/tsd.d.ts" />
import * as RDF from "./RDF";
export declare const RDF_CLASS: string;
export declare const DEFINITION: Map<string, RDF.PropertyDescription>;
export interface Class {
    version: string;
    buildDate: Date;
}
export default Class;
