import RESTException from './../HTTPException';

const name:string = 'TooManyRequestsException';
const statusCode:number = 429;

class TooManyRequestsException extends RESTException {
	static get statusCode():number { return statusCode; }

	get name():string { return name; }
}

export default TooManyRequestsException;