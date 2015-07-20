import RESTException from './../HTTPException';

const name:string = 'PreconditionFailedException';
const statusCode:number = 412;

class PreconditionFailedException extends RESTException {
	static get statusCode():number { return statusCode; }

	get name():string { return name; }
}

export default PreconditionFailedException;