import { Pointer } from "../../Pointer";
import { QueryContextBuilder } from "./QueryContextBuilder";
import { QueryObject } from "./QueryObject";
import * as QueryProperty from "./QueryProperty";
import { QuerySchema } from "./QuerySchema";
import { QuerySchemaProperty } from "./QuerySchemaProperty";
import * as QueryValue from "./QueryValue";
export declare class QueryDocumentBuilder {
    static readonly ALL: Readonly<{}>;
    inherit: Readonly<{}>;
    all: Readonly<{}>;
    readonly _context: QueryContextBuilder;
    protected _document: QueryProperty.Class;
    private _typesTriple;
    private _values;
    private _schema;
    constructor(queryContext: QueryContextBuilder, property: QueryProperty.Class);
    property(name?: string): QueryProperty.Class;
    value(value: string | number | boolean | Date): QueryValue.Class;
    object(object: Pointer | string): QueryObject;
    withType(type: string): this;
    properties(propertiesSchema: QuerySchema): this;
    filter(constraint: string): this;
    values(...values: (QueryValue.Class | QueryObject)[]): this;
    _addProperty(propertyName: string, propertyDefinition: QuerySchemaProperty): QueryProperty.Class;
    private addPropertyDefinition(propertyName, propertyDefinition);
}
export default QueryDocumentBuilder;
