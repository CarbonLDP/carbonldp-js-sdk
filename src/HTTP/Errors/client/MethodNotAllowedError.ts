import HTTPError from "./../HTTPError";
import { Response } from "./../../Response";

const name:string = "MethodNotAllowedError";
const statusCode:number = 405;

export class Class extends HTTPError {
	static get statusCode():number { return statusCode; }

	get name():string { return name; }

	constructor( message:string, response:Response ) {
		super( message, response );
		Object.setPrototypeOf( this, Class.prototype );
	}
}

export default Class;
