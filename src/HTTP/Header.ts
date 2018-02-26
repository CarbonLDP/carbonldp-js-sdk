export class Class {
	values:string[] = [];

	constructor();
	constructor( values:string[] );
	constructor( value:string );
	constructor( valueOrValues?:(string | string[]) ) {
		if( ! valueOrValues ) return;

		if( Array.isArray( valueOrValues ) ) {
			this.values = valueOrValues;
		} else {
			this.setValues( valueOrValues );
		}
	}

	hasValue( value:string ) {
		return this.values.indexOf( value ) !== -1;
	}

	toString():string {
		return this.values.join( ", " );
	}

	private setValues( valuesString:string ):void {
		this.values = [];

		let valueStrings:string[] = valuesString.split( "," );
		for( let i:number = 0, length:number = valueStrings.length; i < length; i ++ ) {
			let valueString:string = valueStrings[ i ].trim();
			this.values.push( valueString );
		}
	}
}

export class Util {
	static parseHeaders( headersString:string ):Map<string, Class> {
		let headers:Map<string, Class> = new Map<string, Class>();

		let headerStrings:string[] = headersString.split( /\r?\n/ );
		for( let i:number = 0, length:number = headerStrings.length; i < length; i ++ ) {
			let headerString:string = headerStrings[ i ];
			if( ! headerString.trim() ) continue;

			let parts:string[] = headerString.split( ":" );
			if( parts.length < 2 ) throw new Error( "ParseError: The header couldn't be parsed." );
			if( parts.length > 2 ) parts[ 1 ] = parts.slice( 1 ).join( ":" );

			let name:string = parts[ 0 ].trim().toLowerCase();
			let header:Class = new Class( parts[ 1 ].trim() );
			if( headers.has( name ) ) {
				let existingHeader:Class = headers.get( name );
				existingHeader.values.concat( header.values );
			} else headers.set( name, header );
		}

		return headers;
	}
}

export default Class;
