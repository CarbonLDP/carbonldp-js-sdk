import { Context } from "../../Context";
import { DigestedObjectSchema } from "../../ObjectSchema";
import { Document } from "../../Document";
import { QueryContext } from "./QueryContext";
export declare class QueryContextPartial extends QueryContext {
    private _document;
    constructor(document: Document, context?: Context);
    getSchemaFor(object: object, path?: string): DigestedObjectSchema;
}
