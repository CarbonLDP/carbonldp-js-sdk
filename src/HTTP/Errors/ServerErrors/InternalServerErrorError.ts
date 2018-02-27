import { HTTPError } from "../HTTPError";

const name:string = "InternalServerErrorError";
const statusCode:number = 500;

export class InternalServerErrorError extends HTTPError {
	static get statusCode():number { return statusCode; }

	get name():string { return name; }
}

export default InternalServerErrorError;
