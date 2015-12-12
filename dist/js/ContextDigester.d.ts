/// <reference path="../typings/tsd.d.ts" />
export interface Context {
    "@base"?: string;
    "@index"?: Object;
    "@language"?: string;
    "@reverse"?: Object;
    "@vocab"?: string;
    [name: string]: (string | ContextDefinition);
}
export interface ContextDefinition {
    "@id"?: string;
    "@type"?: string;
    "@language"?: string;
    "@container"?: string;
}
export declare enum ContainerType {
    SET = 0,
    LIST = 1,
    LANGUAGE = 2,
}
export declare class DigestedContext {
    base: string;
    prefixes: Map<string, URI>;
    properties: Map<string, DigestedDefinition>;
    prefixedURIs: Map<string, URI[]>;
    constructor();
}
export declare class DigestedDefinition {
    uri: URI;
    literal: boolean;
    literalType: URI;
    language: string;
    containerType: ContainerType;
}
export declare class URI {
    stringValue: string;
    constructor(stringValue: string);
    toString(): string;
}
export declare class Class {
    static digestContext(contexts: Context[]): DigestedContext;
    static digestContext(context: Context): DigestedContext;
    static combineDigestedContexts(digestedContexts: DigestedContext[]): DigestedContext;
    private static digestSingleContext(context);
    private static resolvePrefixedURIs(digestedContext);
    private static resolvePrefixedURI(uri, digestedContext);
}
export default Class;
