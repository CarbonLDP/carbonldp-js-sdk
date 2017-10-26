import { IRIToken, PatternToken, PrefixedNameToken } from "sparqler/tokens";
import * as Context from "../../Context";
import { DigestedObjectSchema, DigestedPropertyDefinition } from "../../ObjectSchema";
import * as QueryProperty from "./QueryProperty";
import * as QueryVariable from "./QueryVariable";
export declare class Class {
    protected _context: Context.Class;
    readonly context: Context.Class;
    protected _propertiesMap: Map<string, QueryProperty.Class>;
    private _variablesCounter;
    private _variablesMap;
    private _prefixesMap;
    private _schemas;
    constructor(context: Context.Class);
    getVariable(name: string): QueryVariable.Class;
    hasProperties(propertyName: string): boolean;
    addProperty(name: string, pattern?: PatternToken): QueryProperty.Class;
    getProperty(name: string): QueryProperty.Class;
    getProperties(propertyLevel: string): QueryProperty.Class[];
    serializeLiteral(type: string, value: any): string;
    expandIRI(iri: string): string;
    compactIRI(iri: string): IRIToken | PrefixedNameToken;
    getInheritTypeDefinition(propertyName: string, propertyURI?: string, existingSchema?: DigestedObjectSchema): DigestedPropertyDefinition;
    private _getTypeSchemas();
}
export default Class;
