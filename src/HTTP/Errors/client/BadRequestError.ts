import RESTError from "./../HTTPError";

const name:string = "BadRequestError";
const statusCode:number = 400;

class BadRequestError extends RESTError {
	static get statusCode():number { return statusCode; }

	get name():string { return name; }
}

export default BadRequestError;
