/// <reference path="../typings/typings.d.ts" />
import AbstractContext from "./AbstractContext";
import Context from "./Context";
import * as Document from "./Document";
import * as LDP from "./LDP";
import * as ObjectSchema from "./ObjectSchema";
export interface Class extends Document.Class {
    rootContainer: LDP.PersistedContainer.Class;
}
export declare const RDF_CLASS: string;
export declare const SCHEMA: ObjectSchema.Class;
declare class AppContext extends AbstractContext {
    private app;
    private base;
    constructor(parentContext: Context, app: Class);
    resolve(uri: string): string;
    private getBase(resource);
}
export { AppContext as Context };
export declare class Factory {
    static hasClassProperties(resource: Object): boolean;
}
export default Class;
