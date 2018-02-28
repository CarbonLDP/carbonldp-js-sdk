import { QueryDocumentBuilder } from "./QueryDocumentBuilder";
export interface QueryDocumentsBuilderOrderData {
    path: string;
    flow?: "ASC" | "DESC";
}
export declare class QueryDocumentsBuilder extends QueryDocumentBuilder {
    _orderData?: QueryDocumentsBuilderOrderData;
    orderBy(property: string, flow?: "ASC" | "DESC" | "ascending" | "descending"): this;
    limit(limit: number): this;
    offset(offset: number): this;
}
export default QueryDocumentsBuilder;
