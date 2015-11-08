import RESTError from "./../HTTPError";

const name:string = "UnauthorizedError";
const statusCode:number = 401;

class UnauthorizedError extends RESTError {
	static get statusCode():number { return statusCode; }

	get name():string { return name; }
}

export default UnauthorizedError;
