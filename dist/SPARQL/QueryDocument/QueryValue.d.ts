import { LiteralToken } from "sparqler/tokens";
import * as QueryContext from "./QueryContext";
export declare class Class {
    private _value;
    private _literal;
    private _context;
    constructor(context: QueryContext.Class, value: string | number | boolean | Date);
    withType(type: string): this;
    withLanguage(language: string): this;
    getToken(): LiteralToken;
    toString(): string;
}
export default Class;
