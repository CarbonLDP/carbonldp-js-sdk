export declare class Header {
    readonly values: string[];
    static parseHeaders(headersString: string): Map<string, Header>;
    private static _parseValues(strValues);
    constructor();
    constructor(values?: string[]);
    constructor(value?: string);
    hasValue(value: string): boolean;
    toString(): string;
}
export default Header;
