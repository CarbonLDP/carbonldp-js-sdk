import { AbstractError } from "./AbstractError";

export class InvalidJSONLDSyntaxError extends AbstractError {
	get name():string { return "InvalidJSONLDSyntaxError"; }
}
