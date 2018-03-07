import { LiteralToken } from "sparqler/tokens";
import { QueryContext } from "./QueryContext";
export declare class QueryValue {
    private _value;
    private _literal;
    private _context;
    constructor(context: QueryContext, value: string | number | boolean | Date);
    withType(type: string): this;
    withLanguage(language: string): this;
    getToken(): LiteralToken;
    toString(): string;
}
