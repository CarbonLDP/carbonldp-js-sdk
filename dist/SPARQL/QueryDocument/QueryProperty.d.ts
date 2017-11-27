import { PatternToken, VariableToken } from "sparqler/tokens";
import { DigestedObjectSchema } from "../../ObjectSchema";
import * as QueryContext from "./QueryContext";
export declare class Class {
    readonly name: string;
    readonly variable: VariableToken;
    private _context;
    private _patterns;
    private _schema;
    constructor(context: QueryContext.Class, name: string);
    addPattern(...patterns: PatternToken[]): this;
    addOptionalPattern(...patterns: PatternToken[]): this;
    getPatterns(): PatternToken[];
    getSchema(): DigestedObjectSchema;
    toString(): string;
}
export default Class;
