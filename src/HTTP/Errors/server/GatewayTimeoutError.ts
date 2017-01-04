import HTTPError from "./../HTTPError";
import Response from "./../../Response";

const name:string = "GatewayTimeoutError";
const statusCode:number = 504;

class GatewayTimeoutError extends HTTPError {
	static get statusCode():number { return statusCode; }

	get name():string { return name; }

	constructor( message:string, response:Response ) {
		super( message, response );
		Object.setPrototypeOf( this, GatewayTimeoutError.prototype );
	}
}

export default GatewayTimeoutError;
