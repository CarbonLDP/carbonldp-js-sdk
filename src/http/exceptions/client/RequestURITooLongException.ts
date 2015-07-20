import RESTException from './../HTTPException';

const name:string = 'RequestURITooLongException';
const statusCode:number = 414;

class RequestURITooLongException extends RESTException {
	static get statusCode():number { return statusCode; }

	get name():string { return name; }
}

export default RequestURITooLongException;