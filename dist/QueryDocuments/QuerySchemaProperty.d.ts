import { QueryDocumentBuilder } from "./QueryDocumentBuilder";
export interface QuerySchemaProperty {
    "@id"?: string;
    "@type"?: "@id" | string;
    "@language"?: string;
    "@container"?: "@set" | "@list" | "@language";
    query?: (queryBuilder: QueryDocumentBuilder) => QueryDocumentBuilder;
}
