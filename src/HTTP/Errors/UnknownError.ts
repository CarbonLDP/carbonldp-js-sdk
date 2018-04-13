import { HTTPError } from "./HTTPError";

const name:string = "UnknownError";

export class UnknownError extends HTTPError {
	get name():string { return name; }
}
