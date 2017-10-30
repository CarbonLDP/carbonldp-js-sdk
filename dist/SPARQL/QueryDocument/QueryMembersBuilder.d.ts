import * as QueryDocumentBuilder from "./QueryDocumentBuilder";
import * as QueryProperty from "./QueryProperty";
export declare class Class extends QueryDocumentBuilder.Class {
    orderAscendantBy(property: QueryProperty.Class): this;
    orderDescendantBy(property: QueryProperty.Class): this;
    orderBy(property: QueryProperty.Class): this;
    limit(limit: number): this;
    offset(offset: number): this;
    private _orderBy(property, flow?);
}
export default Class;
