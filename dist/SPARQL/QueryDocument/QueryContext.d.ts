import { IRIToken, PatternToken, PrefixedNameToken } from "sparqler/tokens";
import * as AbstractContext from "../../AbstractContext";
import { DigestedPropertyDefinition } from "../../ObjectSchema";
import * as QueryProperty from "./QueryProperty";
import * as QueryVariable from "./QueryVariable";
export declare class Class {
    protected _context: AbstractContext.Class;
    readonly context: AbstractContext.Class;
    protected _propertiesMap: Map<string, QueryProperty.Class>;
    private _variablesCounter;
    private _variablesMap;
    constructor(context: AbstractContext.Class);
    getVariable(name: string): QueryVariable.Class;
    hasProperties(propertyName: string): boolean;
    addProperty(name: string, pattern: PatternToken): QueryProperty.Class;
    getProperty(name: string): QueryProperty.Class;
    serializeLiteral(type: string, value: any): string;
    expandIRI(iri: string): string;
    compactIRI(iri: string): IRIToken | PrefixedNameToken;
    getInheritTypeDefinition(propertyName: string, propertyURI?: string, context?: AbstractContext.Class): DigestedPropertyDefinition;
}
export default Class;
