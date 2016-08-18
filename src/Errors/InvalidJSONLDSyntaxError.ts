import AbstractError from "./AbstractError";

class InvalidJSONLDSyntaxError extends AbstractError {
	get name():string { return "InvalidJSONLDSyntaxError"; }
}

export default InvalidJSONLDSyntaxError;
