import * as QueryDocumentBuilder from "./QueryDocumentBuilder";
import * as QueryProperty from "./QueryProperty";
export declare class Class extends QueryDocumentBuilder.Class {
    orderBy(property: QueryProperty.Class): this;
    orderAscendantBy(property: QueryProperty.Class): this;
    orderDescendantBy(property: QueryProperty.Class): this;
    limit(limit: number): this;
    offset(offset: number): this;
    private _orderBy(property, flow?);
}
export default Class;
