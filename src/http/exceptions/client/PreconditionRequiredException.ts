import RESTException from './../HTTPException';

const name:string = 'PreconditionRequiredException';
const statusCode:number = 428;

class PreconditionRequiredException extends RESTException {
	static get statusCode():number { return statusCode; }

	get name():string { return name; }
}

export default PreconditionRequiredException;