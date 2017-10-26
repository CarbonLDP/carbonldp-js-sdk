import * as QueryDocumentBuilder from "./QueryDocumentBuilder";
export interface Class {
    "@id"?: string;
    "@type"?: "@id" | string;
    "@language"?: string;
    "@container"?: "@set" | "@list" | "@language";
    query?: (queryPropertyBuilder: QueryDocumentBuilder.Class) => QueryDocumentBuilder.Class;
}
export default Class;
