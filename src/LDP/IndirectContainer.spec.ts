import * as IndirectContainer from "./IndirectContainer";

import {
	STATIC,

	module,
	clazz,

	isDefined,
	hasMethod,
	hasProperty
} from "./../test/JasmineExtender";
import * as Utils from "./../Utils";
import * as NS from "./../NS";

describe( module( "Carbon/LDP/IndirectContainer" ), ():void => {

	it( isDefined(), ():void => {
		expect( IndirectContainer ).toBeDefined();
		expect( Utils.isObject( IndirectContainer ) ).toBe( true );
	});

	it( hasProperty(
		STATIC,
		"RDF_CLASS",
		"string"
	), ():void => {
		expect( IndirectContainer.RDF_CLASS ).toBeDefined();
		expect( Utils.isString( IndirectContainer.RDF_CLASS ) ).toBe( true );

		expect( IndirectContainer.RDF_CLASS ).toBe( NS.LDP.Class.IndirectContainer );
	});

	describe( clazz(
		"Carbon.IndirectContainer.Factory",
		"Factory class for `Carbon.LDP.IndirectContainer.Class` objects"
	), ():void => {

		it( isDefined(), ():void => {
			expect( IndirectContainer.Factory ).toBeDefined();
			expect( Utils.isFunction( IndirectContainer.Factory ) ).toBe( true );
		});

		it( hasMethod(
			STATIC,
			"hasClassProperties",
			"Returns true if the object provided has the properties that defines a `Carbon.LDP.IndirectContainer.Class` object", [
				{ name: "resource", type: "Object" }
			],
			{ type: "boolean" }
		), ():void => {
			expect( IndirectContainer.Factory.hasClassProperties ).toBeDefined();
			expect( Utils.isFunction( IndirectContainer.Factory.hasClassProperties ) ).toBe( true );

			let object:any;
			expect( IndirectContainer.Factory.hasClassProperties( object ) ).toBe( false );

			object = {
				insertedContentRelation: null,
			};
			expect( IndirectContainer.Factory.hasClassProperties( object ) ).toBe( true );

			delete object.insertedContentRelation;
			expect( IndirectContainer.Factory.hasClassProperties( object ) ).toBe( false );
			object.insertedContentRelation = null;
		});
		
	});

});