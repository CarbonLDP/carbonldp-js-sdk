/// <reference path="../../typings/es6/es6.d.ts" />
export declare class Class {
    constructor();
    constructor(values: Value[]);
    constructor(value: string);
    values: Value[];
    toString(): string;
    private setValues(valuesString);
}
export declare class Value {
    constructor(value: string);
    constructor(mainKey: string, mainValue: string, secondaryKey: string, secondaryValue: string);
    mainKey: string;
    mainValue: string;
    secondaryKey: string;
    secondaryValue: string;
    private static cleanString(toClean);
    toString(): string;
    private setValue(value);
    private setMain(main);
    private setSecondary(secondary);
}
export declare class Util {
    static parseHeaders(headersString: string): Map<string, Class>;
}
