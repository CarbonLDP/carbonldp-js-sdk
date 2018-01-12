import * as QueryDocumentBuilder from "./QueryDocumentBuilder";
import * as QueryProperty from "./QueryProperty";
export declare class Class extends QueryDocumentBuilder.Class {
    orderBy(property: QueryProperty.Class, flow?: "ASC" | "DESC" | "ascending" | "descending"): this;
    limit(limit: number): this;
    offset(offset: number): this;
}
export default Class;
