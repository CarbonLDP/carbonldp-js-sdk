import AbstractError from "./../Errors/AbstractError";

class InvalidJSONLDSyntax extends AbstractError {
	get name():string { return "InvalidJSONLDSyntax"; }
}

export default InvalidJSONLDSyntax;
