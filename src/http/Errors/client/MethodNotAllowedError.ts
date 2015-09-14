import RESTError from './../HTTPError';

const name:string = 'MethodNotAllowedError';
const statusCode:number = 405;

class MethodNotAllowedError extends RESTError {
	static get statusCode():number { return statusCode; }

	get name():string { return name; }
}

export default MethodNotAllowedError;