import * as Errors from "./Errors";
import { Header } from "./Header";
import { HTTPMethod } from "./HTTPMethod";
import * as Module from "./index";
import { JSONParser } from "./JSONParser";
import { RequestService, RequestUtils } from "./Request";
import { Response } from "./Response";
import { StatusCode } from "./StatusCode";
import { StringParser } from "./StringParser";

describe( "HTTP/index", () => {

	it( "should reexport Errors", () => {
		expect( Module.Errors ).toBeDefined();
		expect( Module.Errors ).toBe( Errors );
	} );

	it( "should reexport Header", () => {
		expect( Module.Header ).toBeDefined();
		expect( Module.Header ).toBe( Header );
	} );

	it( "should reexport HTTPMethod", () => {
		expect( Module.HTTPMethod ).toBeDefined();
		expect( Module.HTTPMethod ).toBe( HTTPMethod );
	} );

	it( "should reexport JSONParser", () => {
		expect( Module.JSONParser ).toBeDefined();
		expect( Module.JSONParser ).toBe( JSONParser );
	} );

	it( "should reexport RequestService", () => {
		expect( Module.RequestService ).toBeDefined();
		expect( Module.RequestService ).toBe( RequestService );
	} );

	it( "should reexport RequestUtils", () => {
		expect( Module.RequestUtils ).toBeDefined();
		expect( Module.RequestUtils ).toBe( RequestUtils );
	} );

	it( "should reexport Response", () => {
		expect( Module.Response ).toBeDefined();
		expect( Module.Response ).toBe( Response );
	} );

	it( "should reexport StatusCode", () => {
		expect( Module.StatusCode ).toBeDefined();
		expect( Module.StatusCode ).toBe( StatusCode );
	} );

	it( "should reexport StringParser", () => {
		expect( Module.StringParser ).toBeDefined();
		expect( Module.StringParser ).toBe( StringParser );
	} );

} );
