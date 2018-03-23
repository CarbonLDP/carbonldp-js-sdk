export declare class Header {
    readonly values: string[];
    static parseHeaders(headersString: string): Map<string, Header>;
    private static _parseValues(strValues);
    constructor(values?: (string | string[]));
    hasValue(value: string): boolean;
    toString(): string;
}
