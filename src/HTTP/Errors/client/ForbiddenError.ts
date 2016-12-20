import HTTPError from "./../HTTPError";
import Response from "./../../Response";

const name:string = "ForbiddenError";
const statusCode:number = 403;

class ForbiddenError extends HTTPError {
	static get statusCode():number { return statusCode; }

	get name():string { return name; }

	constructor( message:string, response:Response ) {
		super( message, response );
		Object.setPrototypeOf( this, ForbiddenError.prototype );
	}
}

export default ForbiddenError;
