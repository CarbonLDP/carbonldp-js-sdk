import { LiteralToken } from "sparqler/tokens";
import { QueryContext } from "./QueryContext";
export declare class QueryValue {
    private readonly _value;
    private readonly _literal;
    private readonly _context;
    constructor(context: QueryContext, value: string | number | boolean | Date);
    withType(type: string): this;
    withLanguage(language: string): this;
    getToken(): LiteralToken;
    toString(): string;
}
