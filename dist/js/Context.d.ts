/// <reference path="../typings/tsd.d.ts" />
import Auth from "./Auth";
import * as ContextDigester from "./ContextDigester";
import Documents from "./Documents";
declare abstract class Context {
    Auth: Auth;
    Documents: Documents;
    parentContext: Context;
    protected settings: Map<string, any>;
    protected mainContext: ContextDigester.DigestedContext;
    protected classContexts: Map<string, ContextDigester.DigestedContext>;
    constructor(parentContext?: Context);
    getBaseURI(): string;
    abstract resolve(relativeURI: string): string;
    hasSetting(name: string): boolean;
    getSetting(name: string): any;
    setSetting(name: string, value: any): any;
    deleteSetting(name: string): any;
    getMainContext(): ContextDigester.DigestedContext;
    expandMainContext(contexts: ContextDigester.Context[]): void;
    expandMainContext(context: ContextDigester.Context): void;
    setMainContext(contexts: ContextDigester.Context[]): void;
    setMainContext(context: ContextDigester.Context): void;
    hasClassContext(classURI: string): boolean;
    getClassContext(classURI: string): ContextDigester.DigestedContext;
    expandClassContext(classURI: string, contexts: ContextDigester.Context[]): void;
    expandClassContext(classURI: string, context: ContextDigester.Context): void;
    setClassContext(classURI: string, contexts: ContextDigester.Context[]): void;
    setClassContext(classURI: string, context: ContextDigester.Context): void;
}
export default Context;
