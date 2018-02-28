import { Fragment } from "./Fragment";
import * as PersistedDocument from "./PersistedDocument";
import { PersistedResource } from "./PersistedResource";
export interface Class extends PersistedResource, Fragment {
    _document: PersistedDocument.Class;
}
export declare class Factory {
    static is(object: object): object is Class;
    static decorate<T extends Fragment>(fragment: T): T & Class;
}
export default Class;
