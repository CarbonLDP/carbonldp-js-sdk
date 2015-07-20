import RESTException from './../HTTPException';

const name:string = 'BadGatewayException';
const statusCode:number = 502;

class BadGatewayException extends RESTException {
	static get statusCode():number { return statusCode; }

	get name():string { return name; }
}

export default BadGatewayException;