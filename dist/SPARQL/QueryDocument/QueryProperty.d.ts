import { FilterToken, PatternToken } from "sparqler/tokens";
import * as QueryContext from "./QueryContext";
export declare class Class {
    private _variable;
    private _pattern;
    private _filters;
    constructor(context: QueryContext.Class, name: string, pattern: PatternToken);
    addFilter(filter: FilterToken): this;
    hasFilters(): boolean;
    getPatterns(): PatternToken[];
    toString(): string;
}
export default Class;
