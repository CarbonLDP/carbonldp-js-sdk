import * as RDF from "./RDF";
export interface PropertyDefinition {
    "@id"?: string;
    "@type"?: string;
    "@language"?: string;
    "@container"?: string;
}
export interface Class {
    "@base"?: string;
    "@index"?: Object;
    "@language"?: string;
    "@reverse"?: Object;
    "@vocab"?: string;
    [name: string]: (string | PropertyDefinition);
}
export declare enum ContainerType {
    SET = 0,
    LIST = 1,
    LANGUAGE = 2,
}
export declare class DigestedObjectSchema {
    base: string;
    prefixes: Map<string, RDF.URI.Class>;
    properties: Map<string, DigestedPropertyDefinition>;
    prefixedURIs: Map<string, RDF.URI.Class[]>;
    constructor();
}
export declare class DigestedPropertyDefinition {
    uri: RDF.URI.Class;
    literal: boolean;
    literalType: RDF.URI.Class;
    language: string;
    containerType: ContainerType;
}
export interface Resolver {
    getSchemaFor(object: Object): DigestedObjectSchema;
}
export declare class Digester {
    static digestSchema(schemas: Class[]): DigestedObjectSchema;
    static digestSchema(schema: Class): DigestedObjectSchema;
    static combineDigestedObjectSchemas(digestedSchemas: DigestedObjectSchema[]): DigestedObjectSchema;
    private static digestSingleSchema(schema);
    private static resolvePrefixedURIs(digestedSchema);
    private static resolvePrefixedURI(uri, digestedSchema);
}
export default Class;
