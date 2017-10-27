import { PatternToken, VariableToken } from "sparqler/tokens";
import { DigestedObjectSchema } from "../../ObjectSchema";
import * as QueryContext from "./QueryContext";
export declare class Class {
    readonly name: string;
    readonly variable: VariableToken;
    private _context;
    private _patterns;
    private _schema;
    constructor(context: QueryContext.Class, name: string, pattern?: PatternToken);
    addPattern(...patterns: PatternToken[]): this;
    addOptionalPattern(...patterns: PatternToken[]): this;
    hasFilters(): boolean;
    getPatterns(): PatternToken[];
    addSchema(schema: DigestedObjectSchema): void;
    getSchema(): DigestedObjectSchema;
    toString(): string;
}
export default Class;
