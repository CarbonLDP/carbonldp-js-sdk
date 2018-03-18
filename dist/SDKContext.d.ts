import * as Auth from "./Auth";
import { Context } from "./Context";
import { Documents } from "./Documents";
import * as ObjectSchema from "./ObjectSchema";
import * as Settings from "./Settings";
export declare class SDKContext implements Context {
    auth: Auth.Class;
    documents: Documents;
    readonly baseURI: string;
    readonly parentContext: Context;
    protected settings: Settings.ContextSettings;
    protected generalObjectSchema: ObjectSchema.DigestedObjectSchema;
    protected typeObjectSchemaMap: Map<string, ObjectSchema.DigestedObjectSchema>;
    constructor();
    resolve(relativeURI: string): string;
    _resolvePath(path: string): string;
    hasObjectSchema(type: string): boolean;
    getObjectSchema(type?: string): ObjectSchema.DigestedObjectSchema;
    extendObjectSchema(type: string, objectSchema: ObjectSchema.ObjectSchema): void;
    extendObjectSchema(objectSchema: ObjectSchema.ObjectSchema): void;
    clearObjectSchema(type?: string): void;
    protected extendGeneralObjectSchema(digestedSchema: ObjectSchema.DigestedObjectSchema): void;
    protected extendTypeObjectSchema(digestedSchema: ObjectSchema.DigestedObjectSchema, type: string): void;
    private registerDefaultObjectSchemas();
    private _resolveTypeURI(uri);
}
export declare const globalContext: SDKContext;
export default globalContext;
