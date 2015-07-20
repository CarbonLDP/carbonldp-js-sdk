import RESTException from './../HTTPException';

const name:string = 'ForbiddenException';
const statusCode:number = 403;

class ForbiddenException extends RESTException {
	static get statusCode():number { return statusCode; }

	get name():string { return name; }
}

export default ForbiddenException;