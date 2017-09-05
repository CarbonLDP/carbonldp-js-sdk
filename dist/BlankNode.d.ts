import * as Document from "./Document";
import * as Fragment from "./Fragment";
export interface Class extends Fragment.Class {
}
export declare class Factory {
    static createFrom<T extends Object>(object: T, document: Document.Class): T & Class;
    static createFrom<T extends Object>(object: T, id: string, document: Document.Class): T & Class;
}
export default Class;
