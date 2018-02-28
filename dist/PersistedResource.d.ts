import { Resource } from "./Resource";
import { PartialMetadata } from "./SPARQL/QueryDocument/PartialMetadata";
export interface Class extends Resource {
    _snapshot: Resource;
    _syncSnapshot: () => void;
    _partialMetadata?: PartialMetadata;
    isDirty(): boolean;
    revert(): void;
    isPartial(): boolean;
}
export declare class Factory {
    static hasClassProperties(object: object): object is Class;
    static decorate<T extends Resource>(object: T): T & Class;
}
export default Class;
