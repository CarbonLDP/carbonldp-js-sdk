import Parser from "./Parser";

export class Class implements Parser<Object> {
	parse( body:string ):Promise<Object> {
		return new Promise<Object>( ( resolve:( result:string ) => void, reject:( error:Error ) => void ) => {
			try {
				resolve( JSON.parse( body ) );
			} catch( error ) {
				// TODO: Handle SyntaxError
				reject( error );
			}
		} );
	}
}

export default Class;
