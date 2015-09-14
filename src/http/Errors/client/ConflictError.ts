import RESTError from './../HTTPError';

const name:string = 'ConflictError';
const statusCode:number = 409;

class ConflictError extends RESTError {
	static get statusCode():number { return statusCode; }

	get name():string { return name; }
}

export default ConflictError;