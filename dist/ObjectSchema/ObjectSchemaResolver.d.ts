import { Context } from "../Context/Context";
import { ModelDecorator } from "../Model/ModelDecorator";
import { ModelPrototype } from "../Model/ModelPrototype";
import { DigestedObjectSchema } from "./DigestedObjectSchema";
export interface ObjectSchemaResolver {
    $context?: Context;
    getGeneralSchema(): DigestedObjectSchema;
    hasSchemaFor(object: object, path?: string): boolean;
    getSchemaFor(object: object, path?: string): DigestedObjectSchema;
}
export declare type ObjectSchemaResolverFactory = ModelPrototype<ObjectSchemaResolver> & ModelDecorator<ObjectSchemaResolver>;
export declare const ObjectSchemaResolver: ObjectSchemaResolverFactory;
