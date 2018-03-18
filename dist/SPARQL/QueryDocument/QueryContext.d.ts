import { IRIToken, PrefixedNameToken, PrefixToken } from "sparqler/tokens";
import { Context } from "../../Context";
import { DigestedObjectSchema, ObjectSchemaResolver } from "../../ObjectSchema";
import { QueryVariable } from "./QueryVariable";
export declare class QueryContext implements ObjectSchemaResolver {
    readonly context?: Context;
    private _variablesCounter;
    private _variablesMap;
    private _prefixesMap;
    constructor(context?: Context);
    getVariable(name: string): QueryVariable;
    serializeLiteral(type: string, value: any): string;
    compactIRI(iri: string): IRIToken | PrefixedNameToken;
    getPrologues(): PrefixToken[];
    getGeneralSchema(): DigestedObjectSchema;
    hasSchemaFor(object: object, path?: string): boolean;
    getSchemaFor(object: object, path?: string): DigestedObjectSchema;
}
export default QueryContext;
