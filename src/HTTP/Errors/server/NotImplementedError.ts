import RESTError from "./../HTTPError";

const name:string = "NotImplementedError";
const statusCode:number = 501;

class NotImplementedError extends RESTError {
	static get statusCode():number { return statusCode; }

	get name():string { return name; }
}

export default NotImplementedError;
