/// <reference path="../../typings/es6/es6.d.ts" />

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
			let value:Value = new Value( valueString );
			this.values.push( value );
		}
	}
}

export class Value {
	constructor( value:string );
	constructor( mainKey:string, mainValue:string, secondaryKey:string, secondaryValue:string );
	constructor( value:string, mainValue?:string, secondaryKey?:string, secondaryValue?:string ) {
		if ( mainValue ) {
			this.mainKey = value;
			this.mainValue = mainValue;
			this.secondaryKey = secondaryKey;
			this.secondaryValue = secondaryValue;
		} else this.setValue( value );
	}

	mainKey:string = null;
	mainValue:string = null;
	secondaryKey:string = null;
	secondaryValue:string = null;

	private static cleanString( toClean:string ):string {
		toClean = toClean.trim();
		toClean = (Utils.S.startsWith( toClean, "\"" ) || Utils.S.startsWith( toClean, "'" )) ? toClean.substr( 1, toClean.length ) : toClean;
		toClean = (Utils.S.endsWith( toClean, "\"" ) || Utils.S.endsWith( toClean, "'" )) ? toClean.substr( 0, toClean.length - 1 ) : toClean;
		return toClean;
	}

	toString():string {
		let result:string = "";
		if ( this.mainKey ) result += this.mainKey + "=";
		result += this.mainValue;
		if ( this.secondaryKey || this.secondaryValue ) result += "; ";
		if ( this.secondaryKey ) result += this.secondaryKey + "=";
		if ( this.secondaryValue ) result += this.secondaryValue;
		return result;
	}

	private setValue( value:string ):void {
		let parts:string[] = value.split( ";" );
		this.setMain( parts[ 0 ] );
		if ( parts.length > 1 ) this.setSecondary( parts[ 1 ] );
	}

	private setMain( main:string ):void {
		let parts:string[] = main.split( "=" );
		if ( parts.length === 1 ) {
			this.mainValue = Value.cleanString( parts[ 0 ] );
		} else if ( parts.length === 2 ) {
			this.mainKey = Value.cleanString( parts[ 0 ] );
			this.mainValue = Value.cleanString( parts[ 1 ] );
		} else this.mainValue = main;
	}

	private setSecondary( secondary:string ):void {
		let parts:string[] = secondary.split( "=" );
		if ( parts.length === 1 ) {
			this.secondaryValue = Value.cleanString( parts[ 0 ] );
		} else if ( parts.length === 2 ) {
			this.secondaryKey = Value.cleanString( parts[ 0 ] );
			this.secondaryValue = Value.cleanString( parts[ 1 ] );
		} else this.secondaryValue = secondary;
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
			if ( parts.length !== 2 ) throw new Error( "ParseError: The header couldn't be parsed." );

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
