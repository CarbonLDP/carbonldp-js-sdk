import RESTException from './../HTTPException';

const name:string = 'ServiceUnavailableException';
const statusCode:number = 503;

class ServiceUnavailableException extends RESTException {
	static get statusCode():number { return statusCode; }

	get name():string { return name; }
}

export default ServiceUnavailableException;