import { HTTPError } from "../HTTPError";

const name:string = "RequestEntityTooLargeError";
const statusCode:number = 413;

export class RequestEntityTooLargeError extends HTTPError {
	static get statusCode():number { return statusCode; }

	get name():string { return name; }
}
