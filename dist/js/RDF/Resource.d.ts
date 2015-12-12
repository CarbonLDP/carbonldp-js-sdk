/// <reference path="../../typings/tsd.d.ts" />
import AbstractInjector from "./AbstractInjector";
import * as Literal from "./Literal";
import * as Value from "./Value";
import PropertyDescription from "./PropertyDescription";
import * as RDFNode from "./RDFNode";
export interface Class extends RDFNode.Class {
    _propertyAddedCallbacks: ((property: string, value: (RDFNode.Class | Literal.Class)) => void)[];
    _propertyDeletedCallbacks: ((property: string, value?: any) => void)[];
    uri: string;
    types: Array<string>;
    hasProperty: (property: string) => boolean;
    getProperty: (property: string) => Value.Class;
    getPropertyValue: (property: string) => any;
    getPropertyURI: (property: string) => string;
    getProperties: (property: string) => any[];
    getPropertyValues: (property: string) => any[];
    getPropertyURIs: (property: string) => string[];
    addProperty: (property: string, value: any) => void;
    setProperty: (property: string, value: any) => void;
    deleteProperty: (property: string) => void;
}
export declare class Factory extends AbstractInjector<Class> {
    static injectDefinitions(resource: Class, definitions: Map<string, Map<string, PropertyDescription>>): Class;
    static injectDefinitions(resources: Class[], definitions: Map<string, Map<string, PropertyDescription>>): Class[];
    static injectDescriptions(resource: Class, descriptions: Map<string, PropertyDescription>): Object;
    static injectDescriptions(resource: Class, descriptionsObject: Object): Object;
    static injectDescriptions(resources: Class[], descriptions: Map<string, PropertyDescription>): Object[];
    static injectDescriptions(resource: Class[], descriptionsObject: Object): Object[];
    private static genericGetter(description);
    private static genericMultipleGetter(description);
    private static uriGetter(description);
    private static urisGetter(description);
    private static literalGetter(description);
    private static literalsGetter(description);
    private static setter(description);
    constructor();
    hasClassProperties(resource: RDFNode.Class): boolean;
    is(value: any): boolean;
    hasRDFClass(resource: RDFNode.Class): boolean;
    protected injectBehavior<T>(node: T): (T & Class);
}
export declare let factory: Factory;
