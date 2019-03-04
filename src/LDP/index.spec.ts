import { AddMemberAction } from "./AddMemberAction";
import { DocumentMetadata } from "./DocumentMetadata";
import { Error } from "./Error";
import { ErrorResponse } from "./ErrorResponse";
import * as Module from "./index";
import { Map } from "./Map";
import { MapEntry } from "./MapEntry";
import { RemoveMemberAction } from "./RemoveMemberAction";
import { ResponseMetadata } from "./ResponseMetadata";
import { ValidationError } from "./ValidationError";
import { VolatileResource } from "./VolatileResource";

describe( "LDP/index", () => {

	it( "should reexport AddMemberAction", () => {
		expect( Module.AddMemberAction ).toBeDefined();
		expect( Module.AddMemberAction ).toBe( AddMemberAction );
	} );

	it( "should reexport DocumentMetadata", () => {
		expect( Module.DocumentMetadata ).toBeDefined();
		expect( Module.DocumentMetadata ).toBe( DocumentMetadata );
	} );

	it( "should reexport Error", () => {
		expect( Module.Error ).toBeDefined();
		expect( Module.Error ).toBe( Error );
	} );

	it( "should reexport ErrorResponse", () => {
		expect( Module.ErrorResponse ).toBeDefined();
		expect( Module.ErrorResponse ).toBe( ErrorResponse );
	} );

	it( "should reexport Map", () => {
		expect( Module.Map ).toBeDefined();
		expect( Module.Map ).toBe( Map );
	} );

	it( "should reexport MapEntry", () => {
		expect( Module.MapEntry ).toBeDefined();
		expect( Module.MapEntry ).toBe( MapEntry );
	} );

	it( "should reexport RemoveMemberAction", () => {
		expect( Module.RemoveMemberAction ).toBeDefined();
		expect( Module.RemoveMemberAction ).toBe( RemoveMemberAction );
	} );

	it( "should reexport ResponseMetadata", () => {
		expect( Module.ResponseMetadata ).toBeDefined();
		expect( Module.ResponseMetadata ).toBe( ResponseMetadata );
	} );

	it( "should reexport ValidationError", () => {
		expect( Module.ValidationError ).toBeDefined();
		expect( Module.ValidationError ).toBe( ValidationError );
	} );

	it( "should reexport VolatileResource", () => {
		expect( Module.VolatileResource ).toBeDefined();
		expect( Module.VolatileResource ).toBe( VolatileResource );
	} );

} );
