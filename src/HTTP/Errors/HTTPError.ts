import AbstractError from "./../../Errors/AbstractError";
import Response from "./../Response";
import ErrorResponse from "./../../LDP/ErrorResponse";

class HTTPError extends AbstractError {
	static get statusCode():number { return null; }

	get name():string { return "HTTPError"; }

	response:Response;
	errorResponse:ErrorResponse;

	constructor( message:string, response:Response ) {
		super( message );
		this.response = response;
	}
}

export default HTTPError;
