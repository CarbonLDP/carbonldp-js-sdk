import Exception from './../../exceptions/Exception';
import Response from './../Response';

class HTTPException extends Exception.Class {
	get name():string { return 'HTTPException' }

	response:Response;

	constructor( message:string, response:Response ) {
		super( message );
		this.response = response;
	}
}

export default HTTPException;