import { PatternToken, VariableToken } from "sparqler/tokens";
import * as QueryContext from "./QueryContext";
export declare class Class {
    readonly name: string;
    readonly variable: VariableToken;
    private _patterns;
    constructor(context: QueryContext.Class, name: string, pattern?: PatternToken);
    addPattern(...patterns: PatternToken[]): this;
    addOptionalPattern(...patterns: PatternToken[]): this;
    hasFilters(): boolean;
    getPatterns(): PatternToken[];
    toString(): string;
}
export default Class;
