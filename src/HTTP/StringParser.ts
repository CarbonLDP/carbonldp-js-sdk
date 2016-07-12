import Parser from "./Parser";

export class Class implements Parser<string> {
	parse( body:string ):Promise<string> {
		return new Promise<string>( ( resolve:( result:string ) => void, reject:( error:Error ) => void ) => {
			resolve( body );
		} );
	}
}

export default Class;
