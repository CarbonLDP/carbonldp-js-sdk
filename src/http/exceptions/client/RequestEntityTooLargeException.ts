import RESTException from './../HTTPException';

const name:string = 'RequestEntityTooLargeException';
const statusCode:number = 413;

class RequestEntityTooLargeException extends RESTException {
	static get statusCode():number { return statusCode; }

	get name():string { return name; }
}

export default RequestEntityTooLargeException;