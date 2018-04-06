import { PatternToken, SubjectToken } from "sparqler/tokens";
import { DigestedObjectSchema } from "../../ObjectSchema";
import { QueryContext } from "./QueryContext";
import { QueryDocumentBuilder } from "./QueryDocumentBuilder";
import { QueryVariable } from "./QueryVariable";
export declare enum QueryPropertyType {
    FULL = 0,
    PARTIAL = 1,
    ALL = 2,
    EMPTY = 3,
}
export declare class QueryProperty {
    readonly name: string;
    readonly variable: QueryVariable;
    _builder: QueryDocumentBuilder;
    private _context;
    private _optional;
    private _type?;
    private _patterns;
    private _schema;
    constructor(context: QueryContext, name: string);
    addPattern(...patterns: PatternToken[]): this;
    getPatterns(): PatternToken[];
    getSchema(): DigestedObjectSchema;
    isOptional(): boolean;
    setOptional(optional: boolean): this;
    getType(): QueryPropertyType;
    setType(type: QueryPropertyType): this;
    getTriple(): SubjectToken;
    toString(): string;
}
