import { Document } from "./Document";
import { Fragment } from "./Fragment";
export interface Class extends Fragment {
}
export declare class Factory {
    static createFrom<T extends Object>(object: T, document: Document): T & Class;
    static createFrom<T extends Object>(object: T, id: string, document: Document): T & Class;
}
export default Class;
