import HTTPError from "./../HTTPError";

const name:string = "ServiceUnavailableError";
const statusCode:number = 503;

class ServiceUnavailableError extends HTTPError {
	static get statusCode():number { return statusCode; }

	get name():string { return name; }
}

export default ServiceUnavailableError;
