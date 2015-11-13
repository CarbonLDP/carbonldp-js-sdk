import HTTPError from "./../HTTPError";

const name:string = "RequestURITooLongError";
const statusCode:number = 414;

class RequestURITooLongError extends HTTPError {
	static get statusCode():number { return statusCode; }

	get name():string { return name; }
}

export default RequestURITooLongError;
