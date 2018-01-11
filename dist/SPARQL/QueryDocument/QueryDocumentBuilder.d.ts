import * as Pointer from "./../../Pointer";
import * as QueryContextBuilder from "./QueryContextBuilder";
import * as QueryObject from "./QueryObject";
import * as QueryPropertiesSchema from "./QueryPropertiesSchema";
import * as QueryProperty from "./QueryProperty";
import * as QueryPropertySchema from "./QueryPropertySchema";
import * as QueryValue from "./QueryValue";
export declare const ALL: Readonly<{}>;
export declare class Class {
    inherit: Readonly<{}>;
    all: Readonly<{}>;
    readonly _context: QueryContextBuilder.Class;
    protected _document: QueryProperty.Class;
    private _typesTriple;
    private _values;
    private _schema;
    constructor(queryContext: QueryContextBuilder.Class, property: QueryProperty.Class);
    property(name?: string): QueryProperty.Class;
    value(value: string | number | boolean | Date): QueryValue.Class;
    object(object: Pointer.Class | string): QueryObject.Class;
    withType(type: string): this;
    properties(propertiesSchema: QueryPropertiesSchema.Class): this;
    filter(constraint: string): this;
    values(...values: (QueryValue.Class | QueryObject.Class)[]): this;
    _addProperty(propertyName: string, propertyDefinition: QueryPropertySchema.Class): QueryProperty.Class;
    private addPropertyDefinition(propertyName, propertyDefinition);
}
export default Class;
