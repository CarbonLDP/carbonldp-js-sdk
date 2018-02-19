import * as Resource from "./Resource";
import * as PartialMetadata from "./SPARQL/QueryDocument/PartialMetadata";
export interface Class extends Resource.Class {
    _partialMetadata?: PartialMetadata.Class;
    _snapshot: Resource.Class;
    _syncSnapshot: () => void;
    isDirty(): boolean;
    revert(): void;
    isPartial(): boolean;
}
export declare class Factory {
    static hasClassProperties(object: object): object is Class;
    static decorate<T extends Resource.Class>(object: T): T & Class;
}
export default Class;
