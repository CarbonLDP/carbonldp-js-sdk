import { HTTPError } from "../HTTPError";

const name:string = "UnauthorizedError";
const statusCode:number = 401;

export class UnauthorizedError extends HTTPError {
	static get statusCode():number { return statusCode; }

	get name():string { return name; }
}

export default UnauthorizedError;
