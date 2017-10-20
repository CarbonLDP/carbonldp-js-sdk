import * as Pointer from "../../Pointer";
import * as QueryContext from "./QueryContext";
export declare class Class {
    private _context;
    private _resource;
    constructor(context: QueryContext.Class, object: Pointer.Class | string);
    toString(): string;
}
export default Class;
