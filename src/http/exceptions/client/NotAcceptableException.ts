import RESTException from './../HTTPException';

const name:string = 'MethodNotAcceptableException';
const statusCode:number = 406;

class MethodNotAcceptableException extends RESTException {
	static get statusCode():number { return statusCode; }

	get name():string { return name; }
}

export default MethodNotAcceptableException;