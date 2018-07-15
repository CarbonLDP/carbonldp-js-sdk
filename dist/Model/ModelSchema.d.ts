import { ObjectSchema } from "../ObjectSchema";
export interface ModelSchema<TYPE extends string = string> {
    TYPE: TYPE;
    SCHEMA: ObjectSchema;
}
