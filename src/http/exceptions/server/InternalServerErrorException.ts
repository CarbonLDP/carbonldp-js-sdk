import RESTException from './../HTTPException';

const name:string = 'InternalServerError';
const statusCode:number = 500;

class InternalServerError extends RESTException {
	static get statusCode():number { return statusCode; }

	get name():string { return name; }
}

export default InternalServerError;