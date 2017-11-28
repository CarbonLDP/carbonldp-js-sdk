import { PatternToken, SubjectToken, VariableToken } from "sparqler/tokens";
import { DigestedObjectSchema } from "../../ObjectSchema";
import * as QueryContext from "./QueryContext";
export declare class Class {
    readonly name: string;
    readonly variable: VariableToken;
    private _context;
    private _optional;
    private _patterns;
    private _schema;
    constructor(context: QueryContext.Class, name: string, isOptional?: boolean);
    addPattern(...patterns: PatternToken[]): this;
    getPatterns(): PatternToken[];
    getSchema(): DigestedObjectSchema;
    setOptional(optional: boolean): this;
    getTriple(): SubjectToken;
    toString(): string;
}
export default Class;
