import { DigestedObjectSchema } from "./DigestedObjectSchema";
import { DigestedObjectSchemaProperty } from "./DigestedObjectSchemaProperty";
export declare class ObjectSchemaUtils {
    static resolveURI(uri: string, schema: DigestedObjectSchema, relativeTo?: {
        vocab?: boolean;
        base?: boolean;
    }): string;
    static resolveProperty(schema: DigestedObjectSchema, definition: DigestedObjectSchemaProperty, inSame?: boolean): DigestedObjectSchemaProperty;
}
