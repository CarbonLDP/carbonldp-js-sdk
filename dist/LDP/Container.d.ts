import * as ObjectSchema from "./../ObjectSchema";
import * as Pointer from "./../Pointer";
import * as RDF from "./../RDF";
import * as Resource from "./../Resource";
import * as RDFSource from "./RDFSource";
export declare const RDF_CLASS: string;
export declare const SCHEMA: ObjectSchema.Class;
export interface Class extends RDFSource.Class {
    memberOfRelation: Pointer.Class;
    hasMemberRelation: Pointer.Class;
}
export declare class Factory {
    static hasClassProperties(resource: RDF.Node.Class): boolean;
    static hasRDFClass(resource: Resource.Class): boolean;
    static hasRDFClass(expandedObject: Object): boolean;
}
export default Class;
