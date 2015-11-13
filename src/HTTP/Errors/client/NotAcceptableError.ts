import HTTPError from "./../HTTPError";

const name:string = "MethodNotAcceptableError";
const statusCode:number = 406;

class MethodNotAcceptableError extends HTTPError {
	static get statusCode():number { return statusCode; }

	get name():string { return name; }
}

export default MethodNotAcceptableError;
