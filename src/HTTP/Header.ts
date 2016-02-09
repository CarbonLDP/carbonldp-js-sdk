/// <reference path="../../typings/typings.d.ts" />

import * as Utils from "./../Utils";

export class Class {
	constructor();
	constructor( values:Value[] );
	constructor( value:string );
	constructor( valueOrValues?:(string | Value[]) ) {
		if ( ! valueOrValues ) {
			return;
		} else if ( Array.isArray( valueOrValues ) ) {
			this.values = <Value[]> valueOrValues;
		} else {
			this.setValues( <string> valueOrValues );
		}
	}

	values:Value[] = [];

	toString():string {
		return this.values.join( ", " );
	}

	private setValues( valuesString:string ):void {
		this.values = [];

		let valueStrings:string[] = valuesString.split( "," );
		for ( let i:number = 0, length:number = valueStrings.length; i < length; i ++ ) {
			let valueString:string = valueStrings[ i ];
			this.values.push( new Value( valueString ) );
		}
	}
}

export class Value {
	private value:string;

	constructor( value:string ) {
		this.value = value;
	}

	toString():string {
		return this.value;
	}
}

export class Util {
	static parseHeaders( headersString:string ):Map<string, Class> {
		let headers:Map<string, Class> = new Map<string, Class>();

		let headerStrings:string[] = headersString.split( "\r\n" );
		for ( let i:number = 0, length:number = headerStrings.length; i < length; i ++ ) {
			let headerString:string = headerStrings[ i ];
			if ( ! headerString.trim() ) continue;

			let parts:string[] = headerString.split( ":" );
			if ( parts.length < 2 ) throw new Error( "ParseError: The header couldn't be parsed." );
			if ( parts.length > 2 ) parts[ 1 ] = parts.slice( 1 ).join( ":" );

			let name:string = parts[ 0 ].trim();
			let header:Class = new Class( parts[ 1 ].trim() );
			if ( headers.has( name ) ) {
				let existingHeader:Class = headers.get( name );
				existingHeader.values.concat( header.values );
			} else headers.set( name, header );
		}

		return headers;
	}
}
