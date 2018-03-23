import { AbstractError } from "./AbstractError";

export class NotImplementedError extends AbstractError {
	get name():string { return "NotImplementedError"; }

	constructor( message?:string ) {
		super( message );
	}
}
