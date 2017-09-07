import * as Resource from "./../Resource";
export declare const RDF_CLASS: string;
export interface Class extends Resource.Class {
}
export declare class Factory {
    static is(object: object): object is Class;
}
export default Class;
