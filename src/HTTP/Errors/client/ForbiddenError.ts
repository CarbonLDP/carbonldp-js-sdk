import HTTPError from "./../HTTPError";

const name:string = "ForbiddenError";
const statusCode:number = 403;

class ForbiddenError extends HTTPError {
	static get statusCode():number { return statusCode; }

	get name():string { return name; }
}

export default ForbiddenError;
