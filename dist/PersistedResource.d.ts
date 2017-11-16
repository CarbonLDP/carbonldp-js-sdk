import * as Resource from "./Resource";
import * as PartialMetadata from "./SPARQL/QueryDocument/PartialMetadata";
export interface Class extends Resource.Class {
    _partialMetadata?: PartialMetadata.Class;
    _snapshot: Object;
    _syncSnapshot: () => void;
    isDirty(): boolean;
    revert(): void;
}
export declare class Factory {
    static hasClassProperties(object: object): object is Class;
    static decorate<T extends Object>(object: T, snapshot?: Object): T & Class;
}
export default Class;
