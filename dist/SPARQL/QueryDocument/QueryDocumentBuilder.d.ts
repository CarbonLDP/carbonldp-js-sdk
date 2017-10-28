import * as Pointer from "./../../Pointer";
import * as QueryContext from "./QueryContext";
import * as QueryObject from "./QueryObject";
import * as QueryPropertiesSchema from "./QueryPropertiesSchema";
import * as QueryProperty from "./QueryProperty";
import * as QueryValue from "./QueryValue";
export declare class Class {
    inherit: Readonly<{}>;
    private _context;
    private _document;
    private _typesTriple;
    private _values;
    constructor(queryContext: QueryContext.Class, property: QueryProperty.Class);
    property(name?: string): QueryProperty.Class;
    value(value: string | number | boolean | Date): QueryValue.Class;
    object(object: Pointer.Class | string): QueryObject.Class;
    withType(type: string): this;
    properties(propertiesSchema: QueryPropertiesSchema.Class): this;
    filter(constraint: string): this;
    values(...values: (QueryValue.Class | QueryObject.Class)[]): this;
    private addPropertyDefinition(propertyName, propertyDefinition);
}
export default Class;
