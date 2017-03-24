import HTTPError from "./../HTTPError";
import Response from "./../../Response";

const name:string = "MethodNotAllowedError";
const statusCode:number = 405;

export class MethodNotAllowedError extends HTTPError {
	static get statusCode():number { return statusCode; }

	get name():string { return name; }

	constructor( message:string, response:Response ) {
		super( message, response );
		Object.setPrototypeOf( this, MethodNotAllowedError.prototype );
	}
}

export default MethodNotAllowedError;
