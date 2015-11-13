import HTTPError from "./../HTTPError";

const name:string = "RequestEntityTooLargeError";
const statusCode:number = 413;

class RequestEntityTooLargeError extends HTTPError {
	static get statusCode():number { return statusCode; }

	get name():string { return name; }
}

export default RequestEntityTooLargeError;
