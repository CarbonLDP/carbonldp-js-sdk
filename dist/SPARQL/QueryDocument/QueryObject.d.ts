import { BlankNodeToken, IRIToken, PrefixedNameToken } from "sparqler/tokens";
import * as Pointer from "../../Pointer";
import * as QueryContext from "./QueryContext";
export declare class Class {
    private _context;
    private _resource;
    constructor(context: QueryContext.Class, object: Pointer.Class | string);
    getToken(): IRIToken | BlankNodeToken | PrefixedNameToken;
    toString(): string;
}
export default Class;
