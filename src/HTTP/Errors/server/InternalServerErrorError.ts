import HTTPError from "./../HTTPError";
import Response from "./../../Response";

const name:string = "InternalServerErrorError";
const statusCode:number = 500;

export class InternalServerErrorError extends HTTPError {
	static get statusCode():number { return statusCode; }

	get name():string { return name; }

	constructor( message:string, response:Response ) {
		super( message, response );
		Object.setPrototypeOf( this, InternalServerErrorError.prototype );
	}
}

export default InternalServerErrorError;
