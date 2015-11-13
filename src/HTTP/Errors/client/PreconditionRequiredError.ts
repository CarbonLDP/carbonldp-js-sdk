import HTTPError from "./../HTTPError";

const name:string = "PreconditionRequiredError";
const statusCode:number = 428;

class PreconditionRequiredError extends HTTPError {
	static get statusCode():number { return statusCode; }

	get name():string { return name; }
}

export default PreconditionRequiredError;
