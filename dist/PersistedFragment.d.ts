import * as Fragment from "./Fragment";
import * as PersistedResource from "./PersistedResource";
export interface Class extends PersistedResource.Class, Fragment.Class {
}
export declare class Factory {
    static decorate<T extends Fragment.Class>(fragment: T, snapshot?: Object): T & Class;
}
export default Class;
