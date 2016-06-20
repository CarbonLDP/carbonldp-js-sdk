import {
	STATIC,

	module,
	clazz,

	isDefined,
	hasProperty,
	hasMethod
} from "./../test/JasmineExtender";
import * as NS from "./../NS";
import * as URI from "./../RDF/URI";
import * as Utils from "./../Utils";

import * as Ticket from "./Ticket";

describe( module( "Carbon/Auth/Ticket" ), ():void => {

	it( isDefined(), ():void => {
		expect( Ticket ).toBeDefined();
		expect( Utils.isObject( Ticket ) ).toBe( true );
	});

	it( hasProperty(
		STATIC,
		"RDF_CLASS",
		"string"
	), ():void => {
		expect( Ticket.RDF_CLASS ).toBeDefined();
		expect( Utils.isString( Ticket.RDF_CLASS ) ).toBe( true );

		expect( Ticket.RDF_CLASS ).toBe( NS.CS.Class.Ticket );
	});

	it( hasProperty(
		STATIC,
		"SCHEMA",
		"Carbon.ObjectSchema.Class"
	), ():void => {
		expect( Ticket.SCHEMA ).toBeDefined();
		expect( Utils.isObject( Ticket.SCHEMA ) ).toBe( true );

		expect( Utils.hasProperty( Ticket.SCHEMA, "forURI" ) ).toBe( true );
		expect( Ticket.SCHEMA[ "forURI" ] ).toEqual({
			"@id": NS.CS.Predicate.forIRI,
			"@type": "@id",
		});

		expect( Utils.hasProperty( Ticket.SCHEMA, "expirationTime" ) ).toBe( true );
		expect( Ticket.SCHEMA[ "expirationTime" ] ).toEqual({
			"@id": NS.CS.Predicate.expirationTime,
			"@type": NS.XSD.DataType.dateTime,
		});

		expect( Utils.hasProperty( Ticket.SCHEMA, "ticketKey" ) ).toBe( true );
		expect( Ticket.SCHEMA[ "ticketKey" ] ).toEqual({
			"@id": NS.CS.Predicate.ticketKey,
			"@type": NS.XSD.DataType.string,
		});
	});

	describe( clazz(
		"Carbon.Auth.Ticket.Factory",
		"Factory class for `Carbon.Auth.Ticket.Class` objects."
	), ():void => {

		it( isDefined(), ():void => {
			expect( Ticket.Factory ).toBeDefined();
			expect( Utils.isFunction( Ticket.Factory ) ).toBe( true );
		});

		it( hasMethod(
			STATIC,
			"create",
			"Create and returns a `Carbon.Auth.Ticket.Class` object for the specified URI.", [
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
			expect( ticket.expirationTime).toBeUndefined();
			expect( ticket.types ).toContain( Ticket.RDF_CLASS );
		});

	});

});