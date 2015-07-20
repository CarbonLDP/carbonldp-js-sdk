import RESTException from './../HTTPException';

const name:string = 'GatewayTimeoutException';
const statusCode:number = 504;

class GatewayTimeoutException extends RESTException {
	static get statusCode():number { return statusCode; }

	get name():string { return name; }
}

export default GatewayTimeoutException;