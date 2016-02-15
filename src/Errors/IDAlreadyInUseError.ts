import AbstractError from "./AbstractError";

class IDAlreadyInUseError extends AbstractError {
	get name():string { return "IDAlreadyInUseError"; }
}

export default IDAlreadyInUseError;
