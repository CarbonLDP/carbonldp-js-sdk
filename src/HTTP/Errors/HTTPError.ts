import AbstractError from "./../../Errors/AbstractError";
import Response from "./../Response";

class HTTPError extends AbstractError {
	static get statusCode():number { return null; }
	get name():string { return "HTTPError"; }

	response:Response;

	constructor( message:string, response:Response ) {
		super( message );
		this.response = response;
	}
}

export default HTTPError;
