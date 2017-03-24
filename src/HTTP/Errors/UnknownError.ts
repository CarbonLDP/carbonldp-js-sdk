import HTTPError from "./HTTPError";
import Response from "./../Response";

const name:string = "UnknownError";

export class UnknownError extends HTTPError {
	get name():string { return name; }

	constructor( message:string, response:Response ) {
		super( message, response );
		Object.setPrototypeOf( this, UnknownError.prototype );
	}
}

export default UnknownError;
