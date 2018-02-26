import * as ObjectSchema from "./ObjectSchema";
export interface ModelFactory<T extends object> {
    TYPE?: string;
    SCHEMA?: ObjectSchema.ObjectSchema;
    is(object: object): object is T;
    create(...params: any[]): T;
    createFrom<W extends object>(object: W, ...params: any[]): W & T;
}
