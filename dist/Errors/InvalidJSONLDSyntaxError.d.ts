import AbstractError from "./AbstractError";
export declare class InvalidJSONLDSyntaxError extends AbstractError {
    readonly name: string;
    constructor(message: string);
}
export default InvalidJSONLDSyntaxError;
