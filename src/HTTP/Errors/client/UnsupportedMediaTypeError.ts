import HTTPError from "./../HTTPError";
import Response from "./../../Response";

const name:string = "UnsupportedMediaTypeError";
const statusCode:number = 415;

export class UnsupportedMediaTypeError extends HTTPError {
	static get statusCode():number { return statusCode; }

	get name():string { return name; }

	constructor( message:string, response:Response ) {
		super( message, response );
		Object.setPrototypeOf( this, UnsupportedMediaTypeError.prototype );
	}
}

export default UnsupportedMediaTypeError;
