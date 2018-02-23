import * as NamedFragment from "./NamedFragment";
import * as PersistedDocument from "./PersistedDocument";
import * as PersistedFragment from "./PersistedFragment";
export interface Class extends PersistedFragment.Class, NamedFragment.Class {
    _document: PersistedDocument.Class;
}
export declare class Factory {
    static decorate<T extends NamedFragment.Class>(fragment: T): T & Class;
}
export default Class;
