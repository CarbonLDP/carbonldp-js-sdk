import RESTError from './../HTTPError';

const name:string = 'ServiceUnavailableError';
const statusCode:number = 503;

class ServiceUnavailableError extends RESTError {
	static get statusCode():number { return statusCode; }

	get name():string { return name; }
}

export default ServiceUnavailableError;