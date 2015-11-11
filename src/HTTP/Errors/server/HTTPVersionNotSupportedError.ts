import RESTError from "./../HTTPError";

const name:string = "HTTPVersionNotSupportedError";
const statusCode:number = 505;

class HTTPVersionNotSupportedError extends RESTError {
	static get statusCode():number { return statusCode; }

	get name():string { return name; }
}

export default HTTPVersionNotSupportedError;
