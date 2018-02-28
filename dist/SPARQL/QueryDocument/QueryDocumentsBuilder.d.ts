import { QueryDocumentBuilder } from "./QueryDocumentBuilder";
export interface OrderData {
    path: string;
    flow?: "ASC" | "DESC";
}
export declare class Class extends QueryDocumentBuilder {
    _orderData?: OrderData;
    orderBy(property: string, flow?: "ASC" | "DESC" | "ascending" | "descending"): this;
    limit(limit: number): this;
    offset(offset: number): this;
}
export default Class;
