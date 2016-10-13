import {
	STATIC,

	OBLIGATORY,

	module,
	clazz,
	interfaze,

	isDefined,
	hasMethod,
	hasProperty,
	extendsClass,
	hasDefaultExport,
} from "./../test/JasmineExtender";
import * as Utils from "./../Utils";
import * as NS from "./../NS";

import * as IndirectContainer from "./IndirectContainer";
import DefaultExport from "./IndirectContainer";

describe( module( "Carbon/LDP/IndirectContainer" ), ():void => {

	it( isDefined(), ():void => {
		expect( IndirectContainer ).toBeDefined();
		expect( Utils.isObject( IndirectContainer ) ).toBe( true );
	} );

	it( hasProperty(
		STATIC,
		"RDF_CLASS",
		"string"
	), ():void => {
		expect( IndirectContainer.RDF_CLASS ).toBeDefined();
		expect( Utils.isString( IndirectContainer.RDF_CLASS ) ).toBe( true );

		expect( IndirectContainer.RDF_CLASS ).toBe( NS.LDP.Class.IndirectContainer );
	} );

	describe( interfaze(
		"Carbon.LDP.IndirectContainer.Class",
		"Interface that represents an `ldp:IndirectContainer`."
	), ():void => {

		it( extendsClass( "Carbon.DirectContainer.Class" ), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"insertedContentRelation",
			"Carbon.Pointer.Class",
			"Pointer that refers the inserted content relation for the indirect container."
		), ():void => {} );
	} );

	describe( clazz(
		"Carbon.IndirectContainer.Factory",
		"Factory class for `Carbon.LDP.IndirectContainer.Class` objects."
	), ():void => {

		it( isDefined(), ():void => {
			expect( IndirectContainer.Factory ).toBeDefined();
			expect( Utils.isFunction( IndirectContainer.Factory ) ).toBe( true );
		} );

		it( hasMethod(
			STATIC,
			"hasClassProperties",
			"Returns true if the object provided has the properties of a `Carbon.LDP.IndirectContainer.Class` object.", [
				{ name: "resource", type: "Object" },
			],
			{ type: "boolean" }
		), ():void => {
			expect( IndirectContainer.Factory.hasClassProperties ).toBeDefined();
			expect( Utils.isFunction( IndirectContainer.Factory.hasClassProperties ) ).toBe( true );

			let object:any = void 0;
			expect( IndirectContainer.Factory.hasClassProperties( object ) ).toBe( false );

			object = {
				insertedContentRelation: null,
			};
			expect( IndirectContainer.Factory.hasClassProperties( object ) ).toBe( true );

			delete object.insertedContentRelation;
			expect( IndirectContainer.Factory.hasClassProperties( object ) ).toBe( false );
			object.insertedContentRelation = null;
		} );

	} );


	it( hasDefaultExport( "Carbon.LDP.IndirectContainer.Class" ), ():void => {
		let defaultExport:DefaultExport = <any> {};
		let defaultTarget:IndirectContainer.Class;

		defaultTarget = defaultExport;
		expect( defaultTarget ).toEqual( jasmine.any( Object ) );
	} );

} );
