import { hasProperty, interfaze, module, OBLIGATORY, OPTIONAL } from "../test/JasmineExtender";


describe( module( "carbonldp/ObjectSchema" ), ():void => {

	describe( interfaze(
		"CarbonLDP.ObjectSchema",
		"Interface that represents an schema based in the [JSONLD contexts](https://www.w3.org/TR/json-ld/#the-context). This is used to convert from the JSONLD stored in the server to the Documents used in the SDK and vice versa."
	), ():void => {

		it( hasProperty(
			OPTIONAL,
			"@base",
			"string",
			"An absolute URI that is used to resolve relative URIs. If it's set to `null`, will invalidate a previous `@base` value."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"@vocab",
			"string",
			"An absolute URI that is used to as the common prefix for all the relative properties. If it's set to `null`, will invalidate a previous `@vocab` value."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"@index",
			"object",
			"[Not Supported] This element is ignored."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"@language",
			"string",
			"The default language of the string properties."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"@reverse",
			"object",
			"[Not Supported] This element is ignored."
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"[ name:string ]",
			"(string | CarbonLDP.ObjectSchemaProperty)",
			"This index can be interpreted in two forms:\n- As a prefix: When the value is as string. The name is taken a a prefix and the string value must be an absolute URI.\n- As a property: When the value is of type `CarbonLDP.ObjectSchemaProperty`. The name is taken as the name of the property."
		), ():void => {} );

	} );

} );
