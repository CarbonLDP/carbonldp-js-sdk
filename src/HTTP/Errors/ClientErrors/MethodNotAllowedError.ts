import { HTTPError } from "../HTTPError";

const name:string = "MethodNotAllowedError";
const statusCode:number = 405;

export class MethodNotAllowedError extends HTTPError {
	static get statusCode():number { return statusCode; }

	get name():string { return name; }
}
