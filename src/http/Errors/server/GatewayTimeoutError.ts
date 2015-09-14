import RESTError from './../HTTPError';

const name:string = 'GatewayTimeoutError';
const statusCode:number = 504;

class GatewayTimeoutError extends RESTError {
	static get statusCode():number { return statusCode; }

	get name():string { return name; }
}

export default GatewayTimeoutError;