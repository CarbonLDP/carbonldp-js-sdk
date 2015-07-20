import RESTException from './../HTTPException';

const name:string = 'RequestHeaderFieldsTooLargeException';
const statusCode:number = 431;

class RequestHeaderFieldsTooLargeException extends RESTException {
	static get statusCode():number { return statusCode; }

	get name():string { return name; }
}

export default RequestHeaderFieldsTooLargeException;