import RESTException from './../HTTPException';

const name:string = 'BadRequestException';
const statusCode:number = 400;

class BadRequestException extends RESTException {
	static get statusCode():number { return statusCode; }

	get name():string { return name; }
}

export default BadRequestException;