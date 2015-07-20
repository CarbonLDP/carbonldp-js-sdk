import RESTException from './HTTPException';

const name:string = 'UnknownException';

class UnknownException extends RESTException {
	get name():string { return name; }
}

export default UnknownException;