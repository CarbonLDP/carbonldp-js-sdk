import * as ObjectSchema from "./ObjectSchema";
export interface Class {
    orderBy?: OrderByProperty[];
    limit?: number;
    offset?: number;
}
export interface OrderByProperty {
    "@id": string;
    "@type"?: "numeric" | "string" | "boolean" | "dateTime";
    "@language"?: string;
}
export declare class Factory {
    static is(object: Object): boolean;
}
export declare class Util {
    static stringifyRetrievalPreferences(retrievalPreferences: Class, digestedSchema?: ObjectSchema.DigestedObjectSchema): string;
}
export default Class;
