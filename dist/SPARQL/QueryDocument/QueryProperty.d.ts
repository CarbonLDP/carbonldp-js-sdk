import { PatternToken, SubjectToken } from "sparqler/tokens";
import { DigestedObjectSchema } from "../../ObjectSchema";
import * as QueryContext from "./QueryContext";
import * as QueryVariable from "./QueryVariable";
export declare class Class {
    readonly name: string;
    readonly variable: QueryVariable.Class;
    private _context;
    private _optional;
    private _patterns;
    private _schema;
    constructor(context: QueryContext.Class, name: string);
    addPattern(...patterns: PatternToken[]): this;
    getPatterns(): PatternToken[];
    getSchema(): DigestedObjectSchema;
    isOptional(): boolean;
    setOptional(optional: boolean): this;
    getTriple(): SubjectToken;
    toString(): string;
}
export default Class;
