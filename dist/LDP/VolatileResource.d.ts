import * as Resource from "./../Resource";
export declare const RDF_CLASS: string;
export interface Class extends Resource.Class {
}
export declare class Factory {
    static is(object: Object): boolean;
    static hasRDFClass(object: Object): boolean;
}
export default Class;
