export declare class Class {
    values: Value[];
    constructor();
    constructor(values: Value[]);
    constructor(value: string);
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
export default Class;
