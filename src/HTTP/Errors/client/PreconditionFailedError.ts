import RESTError from './../HTTPError';

const name:string = 'PreconditionFailedError';
const statusCode:number = 412;

class PreconditionFailedError extends RESTError {
	static get statusCode():number { return statusCode; }

	get name():string { return name; }
}

export default PreconditionFailedError;