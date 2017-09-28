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
			entryKey: jasmine.any( Object ),
			entryValue: jasmine.any( Object ),
		} );

		expect( Entry.SCHEMA[ "entryKey" ] ).toEqual( {
			"@id": NS.C.Predicate.entryKey,
		} );

		expect( Entry.SCHEMA[ "entryValue" ] ).toEqual( {
			"@id": NS.C.Predicate.entryValue,
		} );
	} );

	describe( interfaze(
		"Carbon.LDP.Entry.Class",
		[ "K", "V" ],
		"Entries of the `Carbon.LDP.Map.Class` with the key/value pair."
	), ():void => {

		it( extendsClass( "Carbon.BlankNode.Class" ), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"entryKey",
			"K",
			"The key element of the entry's pair."
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"entryValue",
			"V",
			"The value element of the entry's pair."
		), ():void => {} );

	} );

	it( hasDefaultExport( "Carbon.LDP.Entry.Class" ), ():void => {
		let defaultExport:DefaultExport<any, any> = <any> {};
		let defaultTarget:Entry.Class<any, any>;

		defaultTarget = defaultExport;
		expect( defaultTarget ).toEqual( jasmine.any( Object ) );
	} );

} );
