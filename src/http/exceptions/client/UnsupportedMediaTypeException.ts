import RESTException from './../HTTPException';

const name:string = 'UnsupportedMediaTypeException';
const statusCode:number = 415;

class UnsupportedMediaTypeException extends RESTException {
	static get statusCode():number { return statusCode; }

	get name():string { return name; }
}

export default UnsupportedMediaTypeException;