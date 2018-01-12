import * as QueryDocumentBuilder from "./QueryDocumentBuilder";
import * as QueryProperty from "./QueryProperty";
export interface OrderData {
    path: string;
    flow?: "ASC" | "DESC";
}
export declare class Class extends QueryDocumentBuilder.Class {
    _orderData?: OrderData;
    orderBy(property: QueryProperty.Class, flow?: "ASC" | "DESC" | "ascending" | "descending"): this;
    limit(limit: number): this;
    offset(offset: number): this;
}
export default Class;
