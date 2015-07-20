import RESTException from './../HTTPException';

const name:string = 'NotImplementedException';
const statusCode:number = 501;

class NotImplementedException extends RESTException {
	static get statusCode():number { return statusCode; }

	get name():string { return name; }
}

export default NotImplementedException;