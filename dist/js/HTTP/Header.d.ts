/// <reference path="../../typings/typings.d.ts" />
export declare class Class {
    constructor();
    constructor(values: Value[]);
    constructor(value: string);
    values: Value[];
    toString(): string;
    private setValues(valuesString);
}
export declare class Value {
    private value;
    constructor(value: string);
    toString(): string;
}
export declare class Util {
    static parseHeaders(headersString: string): Map<string, Class>;
}
