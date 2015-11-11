import IllegalArgumentError from "./AbstractError";

class IDAlreadyInUseError extends IllegalArgumentError {
	get name():string { return "IDAlreadyInUseError"; }
}

export default IDAlreadyInUseError;
