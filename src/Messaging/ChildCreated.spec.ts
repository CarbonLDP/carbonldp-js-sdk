import * as Messaging from "../Messaging";
import * as NS from "../NS";
import * as Pointer from "../Pointer";
import { extendsClass, hasDefaultExport, hasProperty, interfaze, isDefined, module, OBLIGATORY, STATIC } from "../test/JasmineExtender";

import * as ChildCreated from "./ChildCreated";
import DefaultExport from "./ChildCreated";

describe( module( "Carbon/Messaging/ChildCreated" ), ():void => {

	it( isDefined(), ():void => {
		expect( ChildCreated ).toBeDefined();
		expect( ChildCreated ).toEqual( jasmine.any( Object ) );
	} );

	it( hasProperty(
		STATIC,
		"RDF_CLASS",
		"string"
	), ():void => {
		expect( ChildCreated.RDF_CLASS ).toBeDefined();
		expect( ChildCreated.RDF_CLASS ).toEqual( jasmine.any( String ) );

		expect( ChildCreated.RDF_CLASS ).toBe( NS.C.Class.ChildCreated );
	} );

	it( hasProperty(
		STATIC,
		"SCHEMA",
		"Carbon.ObjectSchema.Class"
	), ():void => {
		expect( ChildCreated.SCHEMA ).toBeDefined();
		expect( ChildCreated.SCHEMA ).toEqual( jasmine.any( Object ) );

		expect( ChildCreated.SCHEMA as {} ).toEqual( {
			"target": jasmine.any( Object ),
		} );

		expect( ChildCreated.SCHEMA[ "target" ] ).toEqual( {
			"@id": NS.C.Predicate.target,
			"@type": "@id",
		} );
	} );

	describe( interfaze(
		"Carbon.Messaging.ChildCreated.Class",
		"Interface with the base properties of the data received in a subscription event."
	), ():void => {

		it( isDefined(), ():void => {
			const target:ChildCreated.Class = {} as any;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "Carbon.Messaging.Message.Class" ), ():void => {
			const target:Messaging.Message.Class = {} as ChildCreated.Class;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"target",
			"Carbon.Pointer.Class"
		), ():void => {
			const target:ChildCreated.Class[ "target" ] = {} as Pointer.Class;
			expect( target ).toBeDefined();
		} );

	} );

	it( hasDefaultExport( "Carbon.Messaging.ChildCreated.Class" ), ():void => {
		const target:ChildCreated.Class = {} as DefaultExport;
		expect( target ).toBeDefined();
	} );

} );
