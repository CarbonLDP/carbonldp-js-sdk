import RESTError from './../HTTPError';

const name:string = 'NotFoundError';
const statusCode:number = 404;

class NotFoundError extends RESTError {
	static get statusCode():number { return statusCode; }

	get name():string { return name; }
}

export default NotFoundError;