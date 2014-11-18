define(
	[
		'Carbon/rdf/Prefixes'
	], function( Prefixes ) {
		'use strict';

		var Literal = {};

		// TODO: Finish adding the extra datatypes
		Literal.DataTypes = {

			// Date/Time
			date              : Prefixes.get('xsd') + "date",
			dateTime          : Prefixes.get('xsd') + "dateTime",
			duration          : Prefixes.get('xsd') + "duration",
			gDay              : Prefixes.get('xsd') + "gDay",
			gMonth            : Prefixes.get('xsd') + "gMonth",
			gMonthDay         : Prefixes.get('xsd') + "gMonthDay",
			gYear             : Prefixes.get('xsd') + "gYear",
			gYearMonth        : Prefixes.get('xsd') + "gYearMonth",
			time              : Prefixes.get('xsd') + "time",

			// Numbers
			byte              : Prefixes.get('xsd') + "byte",
			decimal           : Prefixes.get('xsd') + "decimal",
			int               : Prefixes.get('xsd') + "int",
			integer           : Prefixes.get('xsd') + "integer",
			long              : Prefixes.get('xsd') + "long",
			negativeInteger   : Prefixes.get('xsd') + "negativeInteger",
			nonNegativeInteger: Prefixes.get('xsd') + "nonNegativeInteger",
			nonPositiveInteger: Prefixes.get('xsd') + "nonPositiveInteger",
			positiveInteger   : Prefixes.get('xsd') + "positiveInteger",
			short             : Prefixes.get('xsd') + "short",
			unsignedLong      : Prefixes.get('xsd') + "unsignedLong",
			unsignedInt       : Prefixes.get('xsd') + "unsignedInt",
			unsignedShort     : Prefixes.get('xsd') + "unsignedShort",
			unsignedByte      : Prefixes.get('xsd') + "unsignedByte",
			double            : Prefixes.get('xsd') + "double",
			float             : Prefixes.get('xsd') + "float",

			// Misc
			boolean           : Prefixes.get('xsd') + "boolean",
			string            : Prefixes.get('xsd') + "string",
			object            : Prefixes.get('xsd') + "object"
		};
		Literal.InvertedDataTypes = (function () {
			var _inverted = {};

			var _normal = Literal.DataTypes;
			for ( var property in _normal ) {
				if ( _normal.hasOwnProperty( property ) ) {
					_inverted[_normal[property]] = property;
				}
			}

			return _inverted;
		}());

		Literal.toLiteral = function ( value ) {
			if ( _shared.isNundefined( value ) ) return null;
			if ( Carbon.Resource.isResource( value ) ) throw 'The value is an RDF Resource!';

			var literal = {};
			var type = null;

			switch ( true ) {
				case _shared.isDate( value ):
					type = Literal.DataTypes.dateTime;
					value = value.toISOString();
					break;
				case _shared.isNumber( value ):
					if ( _shared.isInteger( value ) ) {
						type = Literal.DataTypes.integer;
					} else {
						type = Literal.DataTypes.double;
					}
					break;
				case _shared.isString( value ):
					type = Literal.DataTypes.string;
					break;
				case _shared.isBoolean( value ):
					type = Literal.DataTypes.boolean;
					break;
				default:
					// Treat it as an unknown object
					type = Literal.DataTypes.object;
					value = JSON.stringify( value );
					break;
			}

			literal["@value"] = value;
			if ( type ) literal["@type"] = type;

			return literal;
		};
		Literal.parseLiteral = function ( jsonLDValue ) {
			if ( ! jsonLDValue ) return null;
			if ( ! _shared.hasProperty( jsonLDValue, "@value" ) ) return null;

			if ( ! _shared.hasProperty( jsonLDValue, "@type" ) ) {
				// The literal doesn't have a defined type
				return jsonLDValue["@value"];
			}

			var type = jsonLDValue["@type"];
			if ( ! _shared.hasProperty( Literal.InvertedDataTypes, type ) ) {
				// The Datetype isn't supported
				return jsonLDValue["@value"];
			}
			var dataType = Literal.InvertedDataTypes[type];
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
		Literal.isLiteral = function ( jsonLDValue ) {
			if ( ! jsonLDValue ) return false;
			return _shared.hasProperty( jsonLDValue, "@value" );
		};
	}
);

(function ( Carbon, $, jsonld, Map, _shared ) {
	'use strict';



	Carbon.Literal = Literal;
}( Carbon, $, jsonld, Map, _shared ));