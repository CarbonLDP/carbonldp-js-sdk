import * as Pointer from "./../../Pointer";
import * as QueryContext from "./QueryContext";
import * as QueryObject from "./QueryObject";
import * as QueryProperty from "./QueryProperty";
import * as QueryValue from "./QueryValue";
export declare class Class {
    inherit: Readonly<{}>;
    private _context;
    constructor(queryContext: QueryContext.Class);
    property(name: string): QueryProperty.Class;
    value(value: string | number | boolean | Date): QueryValue.Class;
    object(object: Pointer.Class | string): QueryObject.Class;
    withType(iriClass: string): Class;
    properties(propertiesSchema: any): Class;
}
export default Class;
