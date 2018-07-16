import { hasProperty, interfaze, module, OPTIONAL } from "../test/JasmineExtender";


describe( module( "carbonldp/ObjectSchema" ), ():void => {

	describe( interfaze(
		"CarbonLDP.ObjectSchemaProperty",
		"Interface that defines the property of a schema."
	), ():void => {

		it( hasProperty(
			OPTIONAL,
			"@id",
			"string",
			"The absolute URI of the property in the JSONLD which is mapped to the key name where this definition was referred."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"@type",
			"string",
			"If the property is a literal, this specifies its XSD type."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"@language",
			"string",
			"The language of the property."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"@container",
			"string",
			"If the property is multiple it can be of tree types:\n- `@set`: An unsorted array of elements.\n- `@list`: An sorted array of elements\n- `@language`: An string property with multiple languages."
		), ():void => {} );

	} );

} );
