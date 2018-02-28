import { NamedFragment } from "./NamedFragment";
import * as PersistedDocument from "./PersistedDocument";
import { PersistedFragment } from "./PersistedFragment";
export interface Class extends PersistedFragment, NamedFragment {
    _document: PersistedDocument.Class;
}
export declare class Factory {
    static decorate<T extends NamedFragment>(fragment: T): T & Class;
}
export default Class;
