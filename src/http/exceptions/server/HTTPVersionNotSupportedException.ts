import RESTException from './../HTTPException';

const name:string = 'HTTPVersionNotSupportedException';
const statusCode:number = 505;

class HTTPVersionNotSupportedException extends RESTException {
	static get statusCode():number { return statusCode; }

	get name():string { return name; }
}

export default HTTPVersionNotSupportedException;