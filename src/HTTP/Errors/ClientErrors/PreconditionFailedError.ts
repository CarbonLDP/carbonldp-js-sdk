import { HTTPError } from "../HTTPError";

const name:string = "PreconditionFailedError";
const statusCode:number = 412;

export class PreconditionFailedError extends HTTPError {
	static get statusCode():number { return statusCode; }

	get name():string { return name; }
}
