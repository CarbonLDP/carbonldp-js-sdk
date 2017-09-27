import { Class as Document } from "./Document";
import { Class as Documents } from "./Documents";
export interface Class extends Document {
    _documents: Documents;
}
export declare class Factory {
    static hasClassProperties(object: object): object is Class;
    static decorate<T extends Document>(document: T, documents: Documents): T & Class;
}
export default Class;
