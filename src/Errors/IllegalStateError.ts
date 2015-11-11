import AbstractError from "./AbstractError";

class IllegalStateError extends AbstractError {
	get name():string { return "IllegalStateError"; }
}

export default IllegalStateError;
