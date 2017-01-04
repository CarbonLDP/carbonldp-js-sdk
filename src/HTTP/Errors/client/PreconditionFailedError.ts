import HTTPError from "./../HTTPError";
import Response from "./../../Response";

const name:string = "PreconditionFailedError";
const statusCode:number = 412;

class PreconditionFailedError extends HTTPError {
	static get statusCode():number { return statusCode; }

	get name():string { return name; }

	constructor( message:string, response:Response ) {
		super( message, response );
		Object.setPrototypeOf( this, PreconditionFailedError.prototype );
	}
}

export default PreconditionFailedError;
