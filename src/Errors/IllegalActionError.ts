import AbstractError from "./AbstractError";

export class IllegalActionError extends AbstractError {
	get name():string { return "IllegalActionError"; }
}

export default IllegalActionError;
