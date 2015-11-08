import RESTError from "./../HTTPError";

const name:string = "MethodNotAcceptableError";
const statusCode:number = 406;

class MethodNotAcceptableError extends RESTError {
	static get statusCode():number { return statusCode; }

	get name():string { return name; }
}

export default MethodNotAcceptableError;
