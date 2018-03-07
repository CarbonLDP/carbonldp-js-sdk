import { HTTPError } from "../HTTPError";

const name:string = "ConflictError";
const statusCode:number = 409;

export class ConflictError extends HTTPError {
	static get statusCode():number { return statusCode; }

	get name():string { return name; }
}
