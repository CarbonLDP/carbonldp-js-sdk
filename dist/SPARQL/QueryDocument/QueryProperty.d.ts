import { PatternToken, SubjectToken } from "sparqler/tokens";
import { DigestedObjectSchema } from "../../ObjectSchema";
import * as QueryContext from "./QueryContext";
import * as QueryDocumentBuilder from "./QueryDocumentBuilder";
import * as QueryVariable from "./QueryVariable";
export declare enum PropertyType {
    FULL = 0,
    PARTIAL = 1,
    ALL = 2,
}
export declare class Class {
    readonly name: string;
    readonly variable: QueryVariable.Class;
    _builder: QueryDocumentBuilder.Class;
    private _context;
    private _optional;
    private _type?;
    private _patterns;
    private _schema;
    constructor(context: QueryContext.Class, name: string);
    addPattern(...patterns: PatternToken[]): this;
    getPatterns(): PatternToken[];
    getSchema(): DigestedObjectSchema;
    isOptional(): boolean;
    setOptional(optional: boolean): this;
    getType(): PropertyType;
    setType(type: PropertyType): this;
    getTriple(): SubjectToken;
    toString(): string;
}
export default Class;
