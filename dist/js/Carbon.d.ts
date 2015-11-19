/// <reference path="../typings/tsd.d.ts" />
import * as APIDescription from "./APIDescription";
import Apps from "./Apps";
import * as Auth from "./Auth";
import Context from "./Context";
import * as Document from "./Document";
import Documents from "./Documents";
import * as HTTP from "./HTTP";
import Platform from "./Platform";
import * as RDF from "./RDF";
import * as Utils from "./Utils";
declare class Carbon extends Context {
    static Apps: typeof Apps;
    static Auth: typeof Auth;
    static Document: typeof Document;
    static Documents: typeof Documents;
    static HTTP: typeof HTTP;
    static RDF: typeof RDF;
    static Utils: typeof Utils;
    static version: string;
    apps: Apps;
    platform: Platform;
    constructor(settings: any);
    resolve(uri: string): string;
    getAPIDescription(): Promise<APIDescription.Class>;
    private registerDefaultDefinitions();
}
export default Carbon;
