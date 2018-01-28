export interface PropertyDefinition {
    "@id"?: string;
    "@type"?: string;
    "@language"?: string;
    "@container"?: string;
}
export interface Class {
    "@base"?: string;
    "@vocab"?: string;
    "@index"?: Object;
    "@language"?: string;
    "@reverse"?: Object;
    [name: string]: (string | PropertyDefinition);
}
export declare enum ContainerType {
    SET = 0,
    LIST = 1,
    LANGUAGE = 2,
}
export declare enum PointerType {
    ID = 0,
    VOCAB = 1,
}
export declare class DigestedObjectSchema {
    base: string;
    language: string;
    vocab: string;
    prefixes: Map<string, string>;
    properties: Map<string, DigestedPropertyDefinition>;
    constructor();
}
export declare class DigestedPropertyDefinition {
    uri: string;
    literal: boolean;
    literalType: string;
    pointerType: PointerType;
    language: string;
    containerType: ContainerType;
}
export interface Resolver {
    getGeneralSchema(): DigestedObjectSchema;
    hasSchemaFor(object: object, path?: string): boolean;
    getSchemaFor(object: object, path?: string): DigestedObjectSchema;
}
export declare class Digester {
    static digestSchema(schemas: Class[], generalSchema?: DigestedObjectSchema): DigestedObjectSchema;
    static digestSchema(schema: Class, generalSchema?: DigestedObjectSchema): DigestedObjectSchema;
    static combineDigestedObjectSchemas(digestedSchemas: DigestedObjectSchema[]): DigestedObjectSchema;
    static digestPropertyDefinition(digestedSchema: DigestedObjectSchema, propertyName: string, propertyDefinition: PropertyDefinition, generalSchema?: DigestedObjectSchema): DigestedPropertyDefinition;
    private static digestSingleSchema(schema, generalSchema?);
}
export declare class Util {
    static resolveURI(uri: string, schema: DigestedObjectSchema, generalSchema?: DigestedObjectSchema): string;
    static resolvePrefixedURI(uri: string, schema: DigestedObjectSchema): string;
    private static _resolveRelativeURI(uri, schema, generalSchema?);
    private static _resolvePrefixedName(uri, schema, generalSchema?);
}
export default Class;
