import { AbstractError } from "./AbstractError";

export class IllegalArgumentError extends AbstractError {
	get name():string { return "IllegalArgumentError"; }
}
