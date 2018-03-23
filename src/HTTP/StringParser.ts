import { Parser } from "./Parser";

export class StringParser implements Parser<string> {
	parse( body:string ):Promise<string> {
		return new Promise<string>( resolve => resolve( body ) );
	}
}
