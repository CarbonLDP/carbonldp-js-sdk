import AbstractError from "./AbstractError";

export class IDAlreadyInUseError extends AbstractError {
	get name():string { return "IDAlreadyInUseError"; }
}

export default IDAlreadyInUseError;
