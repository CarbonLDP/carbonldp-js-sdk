import HTTPError from "./../HTTPError";
import Response from "./../../Response";

const name:string = "UnauthorizedError";
const statusCode:number = 401;

class UnauthorizedError extends HTTPError {
	static get statusCode():number { return statusCode; }

	get name():string { return name; }

	constructor( message:string, response:Response ) {
		super( message, response );
		Object.setPrototypeOf( this, UnauthorizedError.prototype );
	}
}

export default UnauthorizedError;
