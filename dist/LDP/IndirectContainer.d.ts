import * as DirectContainer from "./DirectContainer";
import * as Pointer from "./../Pointer";
export declare const RDF_CLASS: string;
export interface Class extends DirectContainer.Class {
    insertedContentRelation: Pointer.Class;
}
export declare class Factory {
    static hasClassProperties(resource: Object): boolean;
}
export default Class;
