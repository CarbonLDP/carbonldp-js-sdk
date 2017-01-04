import HTTPError from "./../HTTPError";
import Response from "./../../Response";

const name:string = "PreconditionRequiredError";
const statusCode:number = 428;

class PreconditionRequiredError extends HTTPError {
	static get statusCode():number { return statusCode; }

	get name():string { return name; }

	constructor( message:string, response:Response ) {
		super( message, response );
		Object.setPrototypeOf( this, PreconditionRequiredError.prototype );
	}
}

export default PreconditionRequiredError;
