import {
	OBLIGATORY,

	module,
	interfaze,

	isDefined,
	hasMethod,
	extendsClass,
	hasDefaultExport,
} from "./../../test/JasmineExtender";
import * as Utils from "./../../Utils";

import * as Serializer from "./Serializer";
import DefaultExport from "./Serializer";

describe( module(
	"CarbonLDP/RDF/Literal/Serializer"
), ():void => {

	it( isDefined(), ():void => {
		expect( Serializer ).toBeDefined();
		expect( Utils.isObject( Serializer ) ).toBe( true );
	} );

	describe( interfaze(
		"CarbonLDP.RDF.Literal.Serializer.Serializer",
		"Interface that serializer classes must implement."
	), ():void => {

		it( extendsClass( "CarbonLDP.Resource.Resource" ), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"serialize",
			"Method that serialize the provided element into a string value.", [
				{ name: "value", type: "any", description: "Value to be serialized." },
			],
			{ type: "string", description: "The string value of the provided element. This value is the one to be saved in the server, when a document contains a property with its type related to this serializer; view the `CarbonLDP.JSONLD.Converter.literalSerializers` property." }
		), ():void => {} );
	} );

	it( hasDefaultExport( "CarbonLDP.RDF.Literal.Serializer.Serializer" ), ():void => {
		let defaultExport:DefaultExport = <any> {};
		let defaultTarget:Serializer.Serializer;

		defaultTarget = defaultExport;
		expect( defaultTarget ).toEqual( jasmine.any( Object ) );
	} );

} );