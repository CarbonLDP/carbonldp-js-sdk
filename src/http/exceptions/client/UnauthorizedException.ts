import RESTException from './../HTTPException';

const name:string = 'UnauthorizedException';
const statusCode:number = 401;

class UnauthorizedException extends RESTException {
	static get statusCode():number { return statusCode; }

	get name():string { return name; }
}

export default UnauthorizedException;