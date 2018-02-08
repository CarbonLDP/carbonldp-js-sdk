export interface PropertyDefinition {
    "@id"?: string;
    "@type"?: string;
    "@language"?: string;
    "@container"?: string;
}
export interface Class {
    "@base"?: string;
    "@vocab"?: string;
    "@index"?: object;
    "@language"?: string;
    "@reverse"?: object;
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
export declare class DigestedPropertyDefinition {
    uri: string;
    literal: boolean;
    literalType: string;
    pointerType: PointerType;
    language?: string;
    containerType: ContainerType;
}
export declare class DigestedObjectSchema {
    base: string;
    language: string;
    vocab: string;
    prefixes: Map<string, string>;
    properties: Map<string, DigestedPropertyDefinition>;
    constructor();
}
export interface Resolver {
    getGeneralSchema(): DigestedObjectSchema;
    hasSchemaFor(object: object, path?: string): boolean;
    getSchemaFor(object: object, path?: string): DigestedObjectSchema;
}
export declare class Digester {
    static digestSchema(schema: Class): DigestedObjectSchema;
    static digestSchema(schemas: Class[]): DigestedObjectSchema;
    static digestProperty(name: string, definition: PropertyDefinition, digestedSchema?: DigestedObjectSchema): DigestedPropertyDefinition;
    static combineDigestedObjectSchemas(digestedSchemas: DigestedObjectSchema[]): DigestedObjectSchema;
    private static _digestSchema(schema);
    private static _combineSchemas(digestedSchemas);
}
export declare class Util {
    static resolveURI(uri: string, schema: DigestedObjectSchema, relativeTo?: {
        vocab?: boolean;
        base?: boolean;
    }): string;
    static resolveProperty(schema: DigestedObjectSchema, definition: DigestedPropertyDefinition, inSame?: boolean): DigestedPropertyDefinition;
}
export default Class;
