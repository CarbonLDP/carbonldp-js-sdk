import { HTTPError } from "../HTTPError";

const name:string = "PreconditionRequiredError";
const statusCode:number = 428;

export class PreconditionRequiredError extends HTTPError {
	static get statusCode():number { return statusCode; }

	get name():string { return name; }
}
