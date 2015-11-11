import RESTError from "./../HTTPError";

const name:string = "BadGatewayError";
const statusCode:number = 502;

class BadGatewayError extends RESTError {
	static get statusCode():number { return statusCode; }

	get name():string { return name; }
}

export default BadGatewayError;
