import HTTPError from "./HTTPError";

const name:string = "UnknownError";

class UnknownError extends HTTPError {
	get name():string { return name; }
}

export default UnknownError;
