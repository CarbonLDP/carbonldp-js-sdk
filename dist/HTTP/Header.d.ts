export declare class Class {
    values: string[];
    constructor();
    constructor(values: string[]);
    constructor(value: string);
    hasValue(value: string): boolean;
    toString(): string;
    private setValues(valuesString);
}
export declare class Util {
    static parseHeaders(headersString: string): Map<string, Class>;
}
export default Class;
