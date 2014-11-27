define(
	[
		'Carbon/utils', 'Carbon/constants'
	], function( utils, constants ) {
		'use strict';
		var Literal = {};

		// TODO: Finish adding the extra datatypes
		Literal.DataTypes = {

			// Date/Time
			date              : constants.Prefixes.xsd + "date",
			dateTime          : constants.Prefixes.xsd + "dateTime",
			duration          : constants.Prefixes.xsd + "duration",
			gDay              : constants.Prefixes.xsd + "gDay",
			gMonth            : constants.Prefixes.xsd + "gMonth",
			gMonthDay         : constants.Prefixes.xsd + "gMonthDay",
			gYear             : constants.Prefixes.xsd + "gYear",
			gYearMonth        : constants.Prefixes.xsd + "gYearMonth",
			time              : constants.Prefixes.xsd + "time",

			// Numbers
			byte              : constants.Prefixes.xsd + "byte",
			decimal           : constants.Prefixes.xsd + "decimal",
			int               : constants.Prefixes.xsd + "int",
			integer           : constants.Prefixes.xsd + "integer",
			long              : constants.Prefixes.xsd + "long",
			negativeInteger   : constants.Prefixes.xsd + "negativeInteger",
			nonNegativeInteger: constants.Prefixes.xsd + "nonNegativeInteger",
			nonPositiveInteger: constants.Prefixes.xsd + "nonPositiveInteger",
			positiveInteger   : constants.Prefixes.xsd + "positiveInteger",
			short             : constants.Prefixes.xsd + "short",
			unsignedLong      : constants.Prefixes.xsd + "unsignedLong",
			unsignedInt       : constants.Prefixes.xsd + "unsignedInt",
			unsignedShort     : constants.Prefixes.xsd + "unsignedShort",
			unsignedByte      : constants.Prefixes.xsd + "unsignedByte",
			double            : constants.Prefixes.xsd + "double",
			float             : constants.Prefixes.xsd + "float",

			// Misc
			boolean           : constants.Prefixes.xsd + "boolean",
			string            : constants.Prefixes.xsd + "string",
			object            : constants.Prefixes.xsd + "object"
		};
		Literal.InvertedDataTypes = (function () {
			var inverted = {};

			var normal = Literal.DataTypes;
			for ( var property in normal ) {
				if ( normal.hasOwnProperty( property ) ) {
					inverted[normal[property]] = property;
				}
			}

			return inverted;
		}());

		Literal.toLiteral = function ( value ) {
			if ( utils.isNundefined( value ) ) return null;

			var literal = {};
			var type = null;

			switch ( true ) {
				case utils.isDate( value ):
					type = Literal.DataTypes.dateTime;
					value = value.toISOString();
					break;
				case utils.isNumber( value ):
					if ( utils.isInteger( value ) ) {
						type = Literal.DataTypes.integer;
					} else {
						type = Literal.DataTypes.double;
					}
					break;
				case utils.isString( value ):
					type = Literal.DataTypes.string;
					break;
				case utils.isBoolean( value ):
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
			if ( ! utils.hasProperty( jsonLDValue, "@value" ) ) return null;

			if ( ! utils.hasProperty( jsonLDValue, "@type" ) ) return jsonLDValue["@value"];

			var type = jsonLDValue["@type"];
			// The Datetype isn't supported
			if ( ! utils.hasProperty( Literal.InvertedDataTypes, type ) ) return jsonLDValue["@value"];

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
					if ( utils.isNumber( value ) ) {
						// Do nothing, it is already a number
					} else if ( utils.isString( value ) ) {
						value = parseFloat( value );
					} else {
						throw "The number couldn't be parsed!";
					}
					break;

				// Misc
				case "boolean" :
					if ( utils.isBoolean( value ) ) {
						// Do nothing, it is already a boolean
					} else if ( utils.isString( value ) ) {
						value = utils.parseBoolean( value );
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
			return utils.hasProperty( jsonLDValue, "@value" );
		};

		return Literal;
	}
);