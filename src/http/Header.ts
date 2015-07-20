/// <reference path="../../typings/es6/es6.d.ts" />

import * as Utils from './../Utils';

class Util {
	static parseHeaders( headersString:string ):Map<string, Header> {
		var headers:Map<string, Header> = new Map<string, Header>();

		var headerStrings:string[] = headersString.split( '\r\n' );
		for ( var i:number = 0, length:number = headerStrings.length; i < length; i ++ ) {
			var headerString:string = headerStrings[ i ];
			if ( ! headerString.trim() ) continue;

			var parts:string[] = headerString.split( ':' );
			if ( parts.length != 2 ) throw new Error( "ParseException: The header couldn't be parsed." );

			var name = parts[ 0 ].trim();
			var header = new Header( parts[ 1 ].trim() );
			if ( headers.has( name ) ) {
				var existingHeader:Header = headers.get( name );
				existingHeader.values.concat( header.values );
			} else headers.set( name, header );
		}

		return headers;
	}
}

class Header {
	constructor();
	constructor( values:Value[] );
	constructor( value:string );
	constructor( valueOrValues?:(string | Value[]) ) {
		if ( ! valueOrValues ) return;
		else if ( Array.isArray( valueOrValues ) ) this.values = <Value[]> valueOrValues;
		else this.setValues( <string> valueOrValues );
	}

	values:Value[] = [];

	private setValues( valuesString:string ):void {
		this.values = [];

		var valueStrings:string[] = valuesString.split( "," );
		for ( var i = 0, length = valueStrings.length; i < length; i ++ ) {
			var valueString:string = valueStrings[ i ];
			var value:Value = new Value( valueString );
			this.values.push( value );
		}
	}


	toString():string {
		return this.values.join( ', ' );
	}
}

class Value {
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

	private setValue( value:string ):void {
		var parts:string[] = value.split( ";" );
		this.setMain( parts[ 0 ] );
		if ( parts.length > 1 ) this.setSecondary( parts[ 1 ] );
	}

	private setMain( main:string ):void {
		var parts:string[] = main.split( "=" );
		if ( parts.length === 1 ) this.mainValue = Value.cleanString( parts[ 0 ] );
		else if ( parts.length === 2 ) {
			this.mainKey = Value.cleanString( parts[ 0 ] );
			this.mainValue = Value.cleanString( parts[ 1 ] );
		} else this.mainValue = main;
	}

	private setSecondary( secondary:string ):void {
		var parts:string[] = secondary.split( "=" );
		if ( parts.length === 1 ) this.secondaryValue = Value.cleanString( parts[ 0 ] );
		else if ( parts.length === 2 ) {
			this.secondaryKey = Value.cleanString( parts[ 0 ] );
			this.secondaryValue = Value.cleanString( parts[ 1 ] );
		} else this.secondaryValue = secondary;
	}

	private static cleanString( toClean:string ):string {
		toClean = toClean.trim();
		toClean = (Utils.S.startsWith( toClean, "\"" ) || Utils.S.startsWith( toClean, "'" )) ? toClean.substr( 1, toClean.length ) : toClean;
		toClean = (Utils.S.endsWith( toClean, "\"" ) || Utils.S.endsWith( toClean, "'" )) ? toClean.substr( 0, toClean.length - 1 ) : toClean;
		return toClean;
	}

	toString():string {
		var result:string = '';
		if ( this.mainKey ) result += this.mainKey + '=';
		result += this.mainValue;
		if ( this.secondaryKey || this.secondaryValue ) result += '; ';
		if ( this.secondaryKey ) result += this.secondaryKey + '=';
		if ( this.secondaryValue ) result += this.secondaryValue;
		return result;
	}
}

//@formatter:off
export {
	Header as Class,
	Value,
	Util
};
//@formatter:on