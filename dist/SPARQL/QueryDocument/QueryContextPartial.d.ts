import { Context } from "../../Context";
import { DigestedObjectSchema } from "../../ObjectSchema";
import { PersistedDocument } from "../../PersistedDocument";
import { QueryContext } from "./QueryContext";
export declare class QueryContextPartial extends QueryContext {
    private _document;
    constructor(document: PersistedDocument, context?: Context);
    getSchemaFor(object: object, path?: string): DigestedObjectSchema;
}
