import * as Fragment from "./Fragment";
import * as PersistedResource from "./PersistedResource";
export interface Class extends PersistedResource.Class, Fragment.Class {
}
export declare class Factory {
    static hasClassProperties(fragment: Fragment.Class): boolean;
}
export default Class;
