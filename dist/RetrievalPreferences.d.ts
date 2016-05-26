export interface Class {
    orderBy?: OrderByProperty[];
    limit?: number;
    offset?: number;
}
export declare type orderByType = "numeric" | "string" | "boolean" | "dateTime";
export interface OrderByProperty {
    "@id": string;
    "@type"?: "numeric" | "string" | "boolean" | "dateTime";
    "@language"?: string;
}
export declare class Factory {
    static is(object: Object): boolean;
}
export declare class Util {
    static stringifyRetrievalPreferences(retrievalPreferences: Class): string;
}
export default Class;
