import { Resource } from "./Resource";
import * as PartialMetadata from "./SPARQL/QueryDocument/PartialMetadata";
export interface Class extends Resource {
    _partialMetadata?: PartialMetadata.Class;
    _snapshot: Resource;
    _syncSnapshot: () => void;
    isDirty(): boolean;
    revert(): void;
    isPartial(): boolean;
}
export declare class Factory {
    static hasClassProperties(object: object): object is Class;
    static decorate<T extends Resource>(object: T): T & Class;
}
export default Class;
