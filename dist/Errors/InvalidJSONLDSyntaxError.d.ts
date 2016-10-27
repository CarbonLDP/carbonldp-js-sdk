import AbstractError from "./AbstractError";
declare class InvalidJSONLDSyntaxError extends AbstractError {
    readonly name: string;
}
export default InvalidJSONLDSyntaxError;
