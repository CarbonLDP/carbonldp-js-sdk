import * as Fragment from "./Fragment";
import * as PersistedResource from "./PersistedResource";
export interface Class extends PersistedResource.Class, Fragment.Class {
}
export declare class Factory {
    static hasClassProperties(fragment: Fragment.Class): boolean;
    static from(fragments: Fragment.Class[]): Class[];
    static from(fragment: Fragment.Class): Class;
    protected static singleFrom(fragment: Fragment.Class): Class;
    protected static injectBehavior(persisted: (Fragment.Class & PersistedResource.Class)): Class;
}
export default Class;
