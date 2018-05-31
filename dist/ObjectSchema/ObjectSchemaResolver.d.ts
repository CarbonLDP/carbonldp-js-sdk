import { DigestedObjectSchema } from "./DigestedObjectSchema";
export interface ObjectSchemaResolver {
    getGeneralSchema(): DigestedObjectSchema;
    hasSchemaFor(object: object, path?: string): boolean;
    getSchemaFor(object: object, path?: string): DigestedObjectSchema;
}
export interface ObjectSchemaResolverFactory {
    is(value: any): value is ObjectSchemaResolver;
}
export declare const ObjectSchemaResolver: ObjectSchemaResolverFactory;
