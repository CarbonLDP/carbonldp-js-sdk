import HTTPError from "./../HTTPError";

const name:string = "UnsupportedMediaTypeError";
const statusCode:number = 415;

class UnsupportedMediaTypeError extends HTTPError {
	static get statusCode():number { return statusCode; }

	get name():string { return name; }
}

export default UnsupportedMediaTypeError;
