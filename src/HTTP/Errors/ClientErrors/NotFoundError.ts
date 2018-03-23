import { HTTPError } from "../HTTPError";

const name:string = "NotFoundError";
const statusCode:number = 404;

export class NotFoundError extends HTTPError {
	static get statusCode():number { return statusCode; }

	get name():string { return name; }
}
