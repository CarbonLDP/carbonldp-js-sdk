/// <reference path="../typings/es6/es6.d.ts" />
import Auth from "./Auth";
import Documents from "./Documents";
import * as RDF from "./RDF";
declare class Context {
    Auth: Auth;
    Documents: Documents;
    parentContext: Context;
    protected settings: Map<string, any>;
    protected definitions: Map<string, Map<string, RDF.PropertyDescription>>;
    constructor();
    resolve(relativeURI: string): string;
    hasSetting(name: string): boolean;
    getSetting(name: string): any;
    setSetting(name: string, value: any): any;
    deleteSetting(name: string): any;
    hasDefinition(uri: string): boolean;
    getDefinition(uri: string): Map<string, RDF.PropertyDescription>;
    getDefinitionURIs(): string[];
    addDefinition(uri: string, descriptions: Map<string, RDF.PropertyDescription>): void;
    addDefinition(uri: string, descriptions: Object): void;
    setDefinition(uri: string, descriptions: Map<string, RDF.PropertyDescription>): void;
    deleteDefinition(uri: string): void;
}
export default Context;
