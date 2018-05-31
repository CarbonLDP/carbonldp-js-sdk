import {
	extendsClass,
	hasMethod,
	interfaze,
	isDefined,
	module,
	OBLIGATORY,
} from "../../test/JasmineExtender";
import * as Utils from "./../../Utils";

import * as Serializer from "./Serializer";

describe( module(
	"carbonldp/RDF/Literal/Serializer"
), ():void => {

	it( isDefined(), ():void => {
		expect( Serializer ).toBeDefined();
		expect( Utils.isObject( Serializer ) ).toBe( true );
	} );

	describe( interfaze(
		"CarbonLDP.RDF.Literal.Serializer",
		"Interface that serializer classes must implement."
	), ():void => {

		it( extendsClass( "CarbonLDP.TransientResource" ), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"serialize",
			"Method that serialize the provided element into a string value.", [
				{ name: "value", type: "any", description: "Value to be serialized." },
			],
			{ type: "string", description: "The string value of the provided element. This value is the one to be saved in the server, when a document contains a property with its type related to this serializer; view the `CarbonLDP.JSONLD.Converter.literalSerializers` property." }
		), ():void => {} );
	} );

} );
