import {
	STATIC,

	OBLIGATORY,

	module,
	clazz,
	interfaze,

	isDefined,
	hasProperty,
	hasMethod,
	extendsClass,
	hasDefaultExport,
} from "./../test/JasmineExtender";
import * as NS from "../Vocabularies/index";
import * as Resource from "./../Resource";
import * as URI from "./../RDF/URI";
import * as Utils from "./../Utils";

import * as Ticket from "./Ticket";
import DefaultExport from "./Ticket";

describe( module( "Carbon/Auth/Ticket" ), ():void => {

	it( isDefined(), ():void => {
		expect( Ticket ).toBeDefined();
		expect( Utils.isObject( Ticket ) ).toBe( true );
	} );

	it( hasProperty(
		STATIC,
		"RDF_CLASS",
		"string"
	), ():void => {
		expect( Ticket.RDF_CLASS ).toBeDefined();
		expect( Utils.isString( Ticket.RDF_CLASS ) ).toBe( true );

		expect( Ticket.RDF_CLASS ).toBe( NS.CS.Class.Ticket );
	} );

	it( hasProperty(
		STATIC,
		"SCHEMA",
		"Carbon.ObjectSchema.Class"
	), ():void => {
		expect( Ticket.SCHEMA ).toBeDefined();
		expect( Utils.isObject( Ticket.SCHEMA ) ).toBe( true );

		expect( Utils.hasProperty( Ticket.SCHEMA, "forURI" ) ).toBe( true );
		expect( Ticket.SCHEMA[ "forURI" ] ).toEqual( {
			"@id": NS.CS.Predicate.forIRI,
			"@type": "@id",
		} );

		expect( Utils.hasProperty( Ticket.SCHEMA, "expirationTime" ) ).toBe( true );
		expect( Ticket.SCHEMA[ "expirationTime" ] ).toEqual( {
			"@id": NS.CS.Predicate.expirationTime,
			"@type": NS.XSD.DataType.dateTime,
		} );

		expect( Utils.hasProperty( Ticket.SCHEMA, "ticketKey" ) ).toBe( true );
		expect( Ticket.SCHEMA[ "ticketKey" ] ).toEqual( {
			"@id": NS.CS.Predicate.ticketKey,
			"@type": NS.XSD.DataType.string,
		} );
	} );

	describe( interfaze(
		"Carbon.Auth.Ticket.Class",
		"Interface that represents an authentication ticket."
	), ():void => {

		it( extendsClass( "Carbon.Resource.Class" ), ():void => {
			let ticket:Ticket.Class = <any> {};
			let resource:Resource.Class;

			resource = ticket;
			expect( resource ).toEqual( jasmine.any( Object ) );
		} );

		it( hasProperty(
			OBLIGATORY,
			"forURI",
			"Carbon.Pointer.Class",
			"Pointer that relates the document that the authentication ticket only works for."
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"expirationTime",
			"Date",
			"The time when the ticket will expire."
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"ticketKey",
			"string",
			"The value to provide as the authentication ticket in a request."
		), ():void => {} );

	} );

	describe( clazz(
		"Carbon.Auth.Ticket.Factory",
		"Factory class for `Carbon.Auth.Ticket.Class` objects."
	), ():void => {

		it( isDefined(), ():void => {
			expect( Ticket.Factory ).toBeDefined();
			expect( Utils.isFunction( Ticket.Factory ) ).toBe( true );
		} );

		it( hasMethod(
			STATIC,
			"create",
			"Creates and returns a `Carbon.Auth.Ticket.Class` object for the specified URI.", [
				{ name: "uri", type: "string", description: "The URI to get an authentication ticket for." }
			],
			{ type: "Carbon.Auth.Ticket.Class" }
		), ():void => {
			expect( Ticket.Factory.create ).toBeDefined();
			expect( Utils.isFunction( Ticket.Factory.create ) ).toBe( true );

			let ticket:Ticket.Class = Ticket.Factory.create( "http://example.com/resource/" );
			expect( URI.Util.isBNodeID( ticket.id ) ).toBe( true );
			expect( ticket.forURI.id ).toBe( "http://example.com/resource/" );
			expect( ticket.ticketKey ).toBeUndefined();
			expect( ticket.expirationTime ).toBeUndefined();
			expect( ticket.types ).toContain( Ticket.RDF_CLASS );
		} );

	} );

	it( hasDefaultExport( "Carbon.Auth.Ticket.Class" ), ():void => {
		let defaultExport:DefaultExport = <any> {};
		let defaultTarget:Ticket.Class;

		defaultTarget = defaultExport;
		expect( defaultTarget ).toEqual( jasmine.any( Object ) );
	} );

} );