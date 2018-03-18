import { HTTPError } from "../HTTPError";

const name:string = "RequestHeaderFieldsTooLargeError";
const statusCode:number = 431;

export class RequestHeaderFieldsTooLargeError extends HTTPError {
	static get statusCode():number { return statusCode; }

	get name():string { return name; }
}

export default RequestHeaderFieldsTooLargeError;
