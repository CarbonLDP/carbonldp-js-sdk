import { BlankNodeToken, IRIToken, PrefixedNameToken } from "sparqler/tokens";
import { Pointer } from "../../Pointer";
import { QueryContext } from "./QueryContext";
export declare class QueryObject {
    private _context;
    private _resource;
    constructor(context: QueryContext, object: Pointer | string);
    getToken(): IRIToken | BlankNodeToken | PrefixedNameToken;
    toString(): string;
}
export default QueryObject;
