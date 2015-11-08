/// <reference path="../../typings/es6/es6.d.ts" />
import * as Literal from './Literal';
import PropertyDescription from './PropertyDescription';
import * as RDFNode from './RDFNode';
interface Resource extends RDFNode.Class {
    _propertyAddedCallbacks: ((property: string, value: (RDFNode.Class | Literal.Class)) => void)[];
    _propertyDeletedCallbacks: ((property: string, value?: any) => void)[];
    uri: string;
    types: Array<string>;
    hasProperty: (property: string) => boolean;
    getProperty: (property: string) => any;
    getPropertyValue: (property: string) => any;
    getPropertyURI: (property: string) => string;
    getProperties: (property: string) => any[];
    getPropertyValues: (property: string) => any[];
    getPropertyURIs: (property: string) => string[];
    addProperty: (property: string, value: any) => void;
    setProperty: (property: string, value: any) => void;
    deleteProperty: (property: string) => void;
}
declare class Factory {
    is(value: any): boolean;
    create(): Resource;
    from(object: Array<Object>): Resource[];
    from(object: Object): Resource;
    protected singleFrom(object: Object): Resource;
    protected hasRDFClass(resource: RDFNode.Class): boolean;
    protected hasClassProperties(resource: RDFNode.Class): boolean;
    protected injectBehavior(node: Object): Resource;
    static injectDefinitions(resource: Resource, definitions: Map<string, Map<string, PropertyDescription>>): Resource;
    static injectDefinitions(resources: Resource[], definitions: Map<string, Map<string, PropertyDescription>>): Resource[];
    static injectDescriptions(resource: Resource, descriptions: Map<string, PropertyDescription>): Object;
    static injectDescriptions(resource: Resource, descriptionsObject: Object): Object;
    static injectDescriptions(resources: Resource[], descriptions: Map<string, PropertyDescription>): Object[];
    static injectDescriptions(resource: Resource[], descriptionsObject: Object): Object[];
    private static genericGetter(description);
    private static genericMultipleGetter(description);
    private static uriGetter(description);
    private static urisGetter(description);
    private static literalGetter(description);
    private static literalsGetter(description);
    private static setter(description);
}
declare var factory: Factory;
export { Resource as Class, Factory, factory };
