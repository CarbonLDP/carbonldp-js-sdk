import { DigestedObjectSchema } from "./DigestedObjectSchema";
import { DigestedObjectSchemaProperty } from "./DigestedObjectSchemaProperty";
import { ObjectSchema } from "./ObjectSchema";
import { ObjectSchemaProperty } from "./ObjectSchemaProperty";
export declare class ObjectSchemaDigester {
    static digestSchema(schema: ObjectSchema): DigestedObjectSchema;
    static digestSchema(schemas: ObjectSchema[]): DigestedObjectSchema;
    static digestProperty(name: string, definition: ObjectSchemaProperty, digestedSchema?: DigestedObjectSchema): DigestedObjectSchemaProperty;
    static combineDigestedObjectSchemas(digestedSchemas: DigestedObjectSchema[]): DigestedObjectSchema;
    static _digestSchema(schema: ObjectSchema): DigestedObjectSchema;
    static _combineSchemas(digestedSchemas: DigestedObjectSchema[]): DigestedObjectSchema;
}
