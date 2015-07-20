import RESTException from './../HTTPException';

const name:string = 'MethodNotAllowedException';
const statusCode:number = 405;

class MethodNotAllowedException extends RESTException {
	static get statusCode():number { return statusCode; }

	get name():string { return name; }
}

export default MethodNotAllowedException;