import RESTException from './../HTTPException';

const name:string = 'ConflictException';
const statusCode:number = 409;

class ConflictException extends RESTException {
	static get statusCode():number { return statusCode; }

	get name():string { return name; }
}

export default ConflictException;