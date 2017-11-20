import * as Context from "../../Context";
import * as PersistedDocument from "../../PersistedDocument";
import { DigestedObjectSchema } from "../../ObjectSchema";
import * as QueryContext from "./QueryContext";
export declare class Class extends QueryContext.Class {
    private _document;
    constructor(document: PersistedDocument.Class, context?: Context.Class);
    getSchemaFor(object: Object, path?: string): DigestedObjectSchema;
}
export default Class;
