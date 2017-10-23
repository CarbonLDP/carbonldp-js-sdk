import * as Pointer from "./../../Pointer";
import * as QueryContext from "./QueryContext";
import * as QueryObject from "./QueryObject";
import * as QueryPropertiesSchema from "./QueryPropertiesSchema";
import * as QueryProperty from "./QueryProperty";
import * as QueryValue from "./QueryValue";
export declare class Class {
    inherit: Readonly<{}>;
    private _context;
    private _schema;
    private _document;
    constructor(queryContext: QueryContext.Class, name?: string);
    property(name: string): QueryProperty.Class;
    value(value: string | number | boolean | Date): QueryValue.Class;
    object(object: Pointer.Class | string): QueryObject.Class;
    withType(iriClass: string): Class;
    properties(propertiesSchema: QueryPropertiesSchema.Class): Class;
    private addPropertyDefinition(propertyName, propertyDefinition);
}
export default Class;
