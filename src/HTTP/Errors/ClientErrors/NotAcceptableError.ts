import { HTTPError } from "../HTTPError";

const name:string = "NotAcceptableError";
const statusCode:number = 406;

/**
 * Error class to indicate that the server cannot respond with the data type specified by the accept header of the request.
 */
export class NotAcceptableError extends HTTPError {
	static get statusCode():number { return statusCode; }

	get name():string { return name; }
}
