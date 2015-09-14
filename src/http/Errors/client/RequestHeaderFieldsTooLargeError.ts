import RESTError from './../HTTPError';

const name:string = 'RequestHeaderFieldsTooLargeError';
const statusCode:number = 431;

class RequestHeaderFieldsTooLargeError extends RESTError {
	static get statusCode():number { return statusCode; }

	get name():string { return name; }
}

export default RequestHeaderFieldsTooLargeError;