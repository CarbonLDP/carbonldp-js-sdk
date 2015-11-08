/// <reference path="../typings/tsd.d.ts" />
import * as APIDescription from './APIDescription';
import Apps from './Apps';
import Auth from './Auth';
import * as Document from './Document';
import Documents from './Documents';
import * as HTTP from './HTTP';
import Parent from './Parent';
import * as RDF from './RDF';
import * as Utils from './Utils';
declare class Carbon extends Parent {
    apps: Apps;
    constructor(settings: any);
    static Apps: typeof Apps;
    static Auth: typeof Auth;
    static Document: typeof Document;
    static Documents: typeof Documents;
    static HTTP: typeof HTTP;
    static RDF: typeof RDF;
    static Utils: typeof Utils;
    static version: string;
    resolve(uri: string): string;
    getAPIDescription(): Promise<APIDescription.Class>;
    private registerDefaultDefinitions();
}
export default Carbon;
