import { Parser } from "./Parser";

export class JSONParser implements Parser<object> {
	parse( body:string ):Promise<object> {
		// TODO: Handle SyntaxError
		return new Promise<object>( resolve => resolve( JSON.parse( body ) ) );
	}
}
