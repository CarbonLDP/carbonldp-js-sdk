import {
	STATIC,

	OBLIGATORY,

	module,
	interfaze,

	isDefined,
	hasProperty,
	extendsClass,
	hasDefaultExport,
} from "../test/JasmineExtender";
import * as NS from "./../NS";
import * as Utils from "./../Utils";

import * as Entry from "./Entry";
import DefaultExport from "./Entry";

describe( module( "Carbon/LDP/Entry" ), ():void => {

	it( isDefined(), ():void => {
		expect( Entry ).toBeDefined();
		expect( Utils.isObject( Entry ) ).toBe( true );
	} );

	it( hasProperty(
		STATIC,
		"SCHEMA",
		"Carbon.ObjectSchema.Class"
	), ():void => {
		expect( Entry.SCHEMA ).toBeDefined();
		expect( Utils.isObject( Entry.SCHEMA ) ).toBe( true );

		expect( Entry.SCHEMA as { [key:string]:object } ).toEqual( {
			key: jasmine.any( Object ),
			value: jasmine.any( Object ),
		} );

		expect( Entry.SCHEMA[ "key" ] ).toEqual( {
			"@id": NS.C.Predicate.key,
			"@type": "@id",
		} );

		expect( Entry.SCHEMA[ "value" ] ).toEqual( {
			"@id": NS.C.Predicate.value,
			"@type": "@id",
		} );

	} );

	describe( interfaze(
		"Carbon.LDP.Entry.Class",
		"Entries of the `Carbon.LDP.BNodesMapping` with the previous and new BNodes ID."
	), ():void => {

		it( extendsClass( "Carbon.Pointer.Class" ), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"key",
			"Carbon.BlankNode.Class",
			"The previous BNode ID."
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"entries",
			"Carbon.BlankNode.Class",
			"The new BNode ID."
		), ():void => {} );

	} );

	it( hasDefaultExport( "Carbon.LDP.Entry.Class" ), ():void => {
		let defaultExport:DefaultExport = <any> {};
		let defaultTarget:Entry.Class;

		defaultTarget = defaultExport;
		expect( defaultTarget ).toEqual( jasmine.any( Object ) );
	} );

} );
