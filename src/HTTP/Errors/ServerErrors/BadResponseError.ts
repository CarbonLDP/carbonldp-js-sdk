import { HTTPError } from "../HTTPError";

const name:string = "BadResponseError";
const statusCode:number = 0;

export class BadResponseError extends HTTPError {
	static get statusCode():number { return statusCode; }

	get name():string { return name; }
}

export default BadResponseError;
