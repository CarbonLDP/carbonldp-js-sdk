import RESTException from './../HTTPException';

const name:string = 'NotFoundException';
const statusCode:number = 404;

class NotFoundException extends RESTException {
	static get statusCode():number { return statusCode; }

	get name():string { return name; }
}

export default NotFoundException;