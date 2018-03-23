import { HTTPError } from "../HTTPError";

const name:string = "NotImplementedError";
const statusCode:number = 501;

export class NotImplementedError extends HTTPError {
	static get statusCode():number { return statusCode; }

	get name():string { return name; }
}
