import * as Document from "./Document";
import * as Fragment from "./Fragment";
import * as ObjectSchema from "./ObjectSchema";
export declare const SCHEMA: ObjectSchema.Class;
export interface Class extends Fragment.Class {
    bNodeIdentifier: string;
}
export declare class Factory {
    static createFrom<T extends Object>(object: T, document: Document.Class): T & Class;
    static createFrom<T extends Object>(object: T, id: string, document: Document.Class): T & Class;
    static decorate<T extends Object>(object: T, bNodeIdentifier?: string): T & Class;
}
export default Class;
