import { hasProperty, interfaze, module, OBLIGATORY } from "../test/JasmineExtender";

import { ModelPrototype } from "./ModelPrototype";


describe( module( "carbonldp/Model" ), () => {

	describe( interfaze(
		"CarbonLDP.Model.ModelPrototype",
		[ "MODEL extends object", "EXTENDED extends object = {}", "OVERRIDDEN extends keyof MODEL = never" ],
		"Interface with the property for describing a model prototype.\n" +
		"The first generic specified the interface of the model;" +
		" the second can be interfaces that the model is extending so the prototype has not to re-implements that methods;" +
		" and the third one are the names of the methods the prototype must override/re-implement."
	), () => {

		it( hasProperty(
			OBLIGATORY,
			"PROTOTYPE",
			"Pick<MODEL, Exclude<keyof MODEL, keyof EXTENDED> | OVERRIDDEN>",
			"The object containing the prototype to be decorated for the model."
		), () => {
			const target:ModelPrototype<{ a:any, b:any, c:any }, { a:any, b:any }, "a">[ "PROTOTYPE" ] = { a:null, c:null };
			expect( target ).toBeDefined();
		} );

	} );

} );
