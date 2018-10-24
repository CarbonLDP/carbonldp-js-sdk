import { HTTPError } from "../HTTPError";

const name:string = "UnsupportedMediaTypeError";
const statusCode:number = 415;

/**
 * Error class to indicate that the request has a media-type not supported by the server.
 */
export class UnsupportedMediaTypeError extends HTTPError {
	static get statusCode():number { return statusCode; }

	get name():string { return name; }
}
