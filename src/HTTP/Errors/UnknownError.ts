import { HTTPError } from "./HTTPError";

const name:string = "UnknownError";

/**
 * Error class that defines any HTTP error that could not be identified.
 */
export class UnknownError extends HTTPError {
	get name():string { return name; }
}
