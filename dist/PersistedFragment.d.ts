import * as Fragment from "./Fragment";
import * as PersistedDocument from "./PersistedDocument";
import * as PersistedResource from "./PersistedResource";
export interface Class extends PersistedResource.Class, Fragment.Class {
    document: PersistedDocument.Class;
}
export declare class Factory {
    static decorate<T extends Fragment.Class>(fragment: T): T & Class;
}
export default Class;
