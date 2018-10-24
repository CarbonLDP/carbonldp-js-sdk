/**
 * Class to manage the values in an HTTP header.
 */
export class Header {
	/**
	 * Array with each value of the header.
	 */
	readonly values:string[];

	/**
	 * Returns a Map which relates all header names with a {@link Header} object containing their values.
	 * @param headersString The string to be parsed into a map of name -> Header.
	 */
	static parseHeaders( headersString:string ):Map<string, Header> {
		const headers:Map<string, Header> = new Map<string, Header>();

		headersString.split( /\r?\n/ ).forEach( strHeader => {
			if( ! strHeader.trim() ) return;

			const parts:string[] = strHeader.split( ":" );
			if( parts.length < 2 ) throw new Error( "ParseError: The header couldn't be parsed." );

			const name:string = parts[ 0 ].trim().toLowerCase();
			const values:string[] = Header.__parseValues( parts.slice( 1 ).join( ":" ) );

			if( headers.has( name ) ) {
				headers.get( name ).values.push( ...values );
			} else {
				headers.set( name, new Header( values ) );
			}
		} );

		return headers;
	}

	private static __parseValues( strValues:string | undefined ):string[] {
		if( ! strValues ) return [];

		return strValues
			.split( "," )
			.map( valueString => {
				return valueString.trim();
			} )
			;
	}

	/**
	 * Create an instance with an array of values or a string that will be parsed
	 * into the multiple values that may contain.
	 * @param values The array of values of the string to be parsed.
	 */
	constructor( values?:(string | string[]) ) {
		this.values = Array.isArray( values ) ?
			values : Header.__parseValues( values );
	}

	/**
	 * Returns true when the specified value exists in the values stored.
	 * @param value The value to check if is stored.
	 */
	hasValue( value:string ):boolean {
		return this.values.indexOf( value ) !== - 1;
	}

	/**
	 * Returns the string representation of all the values of the headers.
	 */
	toString():string {
		return this.values.join( ", " );
	}
}
