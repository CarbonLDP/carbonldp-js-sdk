export class Header {
	readonly values:string[];

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

	constructor( values?:(string | string[]) ) {
		this.values = Array.isArray( values ) ?
			values : Header.__parseValues( values );
	}

	hasValue( value:string ):boolean {
		return this.values.indexOf( value ) !== - 1;
	}

	addValue( value:string ):void {
		const newValues:string[] = Header.__parseValues( value );
		this.values.push( ...newValues );
	}

	toString():string {
		return this.values.join( ", " );
	}
}
