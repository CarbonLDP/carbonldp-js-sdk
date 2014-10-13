(function ( Carbon, $, jsonld, Map, _shared ) {
	'use strict';

	var _literal = {};

	// TODO: Finish adding the extra datatypes
	_literal.DataTypes = {

		// Date/Time
		date              : Carbon.DefaultPrefixes.xsd + "date",
		dateTime          : Carbon.DefaultPrefixes.xsd + "dateTime",
		duration          : Carbon.DefaultPrefixes.xsd + "duration",
		gDay              : Carbon.DefaultPrefixes.xsd + "gDay",
		gMonth            : Carbon.DefaultPrefixes.xsd + "gMonth",
		gMonthDay         : Carbon.DefaultPrefixes.xsd + "gMonthDay",
		gYear             : Carbon.DefaultPrefixes.xsd + "gYear",
		gYearMonth        : Carbon.DefaultPrefixes.xsd + "gYearMonth",
		time              : Carbon.DefaultPrefixes.xsd + "time",

		// Numbers
		byte              : Carbon.DefaultPrefixes.xsd + "byte",
		decimal           : Carbon.DefaultPrefixes.xsd + "decimal",
		int               : Carbon.DefaultPrefixes.xsd + "int",
		integer           : Carbon.DefaultPrefixes.xsd + "integer",
		long              : Carbon.DefaultPrefixes.xsd + "long",
		negativeInteger   : Carbon.DefaultPrefixes.xsd + "negativeInteger",
		nonNegativeInteger: Carbon.DefaultPrefixes.xsd + "nonNegativeInteger",
		nonPositiveInteger: Carbon.DefaultPrefixes.xsd + "nonPositiveInteger",
		positiveInteger   : Carbon.DefaultPrefixes.xsd + "positiveInteger",
		short             : Carbon.DefaultPrefixes.xsd + "short",
		unsignedLong      : Carbon.DefaultPrefixes.xsd + "unsignedLong",
		unsignedInt       : Carbon.DefaultPrefixes.xsd + "unsignedInt",
		unsignedShort     : Carbon.DefaultPrefixes.xsd + "unsignedShort",
		unsignedByte      : Carbon.DefaultPrefixes.xsd + "unsignedByte",
		double            : Carbon.DefaultPrefixes.xsd + "double",
		float             : Carbon.DefaultPrefixes.xsd + "float",

		// Misc
		boolean           : Carbon.DefaultPrefixes.xsd + "boolean",
		string            : Carbon.DefaultPrefixes.xsd + "string",
		object            : Carbon.DefaultPrefixes.xsd + "object"
	};
	_literal.InvertedDataTypes = (function ( carbon ) {
		var _inverted = {};

		var _normal = _literal.DataTypes;
		for ( var property in _normal ) {
			if ( _normal.hasOwnProperty( property ) ) {
				_inverted[_normal[property]] = property;
			}
		}

		return _inverted;
	}( Carbon ));

	_literal.toLiteral = function ( value ) {
		if ( _shared.isNundefined( value ) ) return null;
		if ( Carbon.Resource.isResource( value ) ) throw 'The value is an RDF Resource!';

		var literal = {};
		var type = null;

		switch ( true ) {
			case _shared.isDate( value ):
				type = _literal.DataTypes.dateTime;
				value = value.toISOString();
				break;
			case _shared.isNumber( value ):
				if ( _shared.isInteger( value ) ) {
					type = _literal.DataTypes.integer;
				} else {
					type = _literal.DataTypes.double;
				}
				break;
			case _shared.isString( value ):
				type = _literal.DataTypes.string;
				break;
			case _shared.isBoolean( value ):
				type = _literal.DataTypes.boolean;
				break;
			default:
				// Treat it as an unknown object
				type = _literal.DataTypes.object;
				value = JSON.stringify( value );
				break;
		}

		literal["@value"] = value;
		if ( type ) literal["@type"] = type;

		return literal;
	};
	_literal.parseLiteral = function ( jsonLDValue ) {
		if ( ! jsonLDValue ) return null;
		if ( ! _shared.hasProperty( jsonLDValue, "@value" ) ) return null;

		if ( ! _shared.hasProperty( jsonLDValue, "@type" ) ) {
			// The literal doesn't have a defined type
			return jsonLDValue["@value"];
		}

		var type = jsonLDValue["@type"];
		if ( ! _shared.hasProperty( _literal.InvertedDataTypes, type ) ) {
			// The Datetype isn't supported
			return jsonLDValue["@value"];
		}
		var dataType = _literal.InvertedDataTypes[type];
		var value = jsonLDValue["@value"];
		switch ( dataType ) {
			// Dates
			case "date":
			case "dateTime":
			case "time":
				value = new Date( value );
				break;
			case "duration":
				// TODO: Support duration values (create a class or something...)
				break;
			case "gDay":
			case "gMonth":
			case "gMonthDay":
			case "gYear":
			case "gYearMonth":
				// TODO: Decide. Should we return it as a Date?
				break;

			// Numbers
			case "byte" :
			case "decimal" :
			case "int" :
			case "integer" :
			case "long" :
			case "negativeInteger" :
			case "nonNegativeInteger" :
			case "nonPositiveInteger" :
			case "positiveInteger" :
			case "short" :
			case "unsignedLong" :
			case "unsignedInt" :
			case "unsignedShort" :
			case "unsignedByte" :
			case "double" :
			case "float" :
				if ( _shared.isNumber( value ) ) {
					// Do nothing, it is already a number
				} else if ( _shared.isString( value ) ) {
					value = parseFloat( value );
				} else {
					throw "The number couldn't be parsed!";
				}
				break;

			// Misc
			case "boolean" :
				if ( _shared.isBoolean( value ) ) {
					// Do nothing, it is already a boolean
				} else if ( _shared.isString( value ) ) {
					value = _shared.parseBoolean( value );
				} else {
					value = ! ! value;
				}
				break;
			case "string":
				// Do nothing, the value will already be a string
				break;
			case "object":
				value = JSON.parse( value );
				break;
			default:
				break;
		}

		return value;
	};
	_literal.isLiteral = function ( jsonLDValue ) {
		if ( ! jsonLDValue ) return false;
		return _shared.hasProperty( jsonLDValue, "@value" );
	};

	Carbon.Literal = _literal;
}( Carbon, $, jsonld, Map, _shared ));