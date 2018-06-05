import { AnyJasmineValue } from "../../test/helpers/types";
import { Pointer } from "../Pointer";
import { TransientResource } from "../Resource";
import {
	extendsClass,
	hasProperty,
	interfaze,
	module,
	OBLIGATORY,
	property,
	STATIC
} from "../test/JasmineExtender";
import { CS } from "../Vocabularies";
import { SimpleUserACReport } from "./SimpleUserACReport";

describe( module( "carbonldp/SimpleUserACReport" ), () => {

	describe( interfaze(
		"CarbonLDP.Auth.SimpleUserACReport",
		"Model for the cs:SimpleUserACReport resource."
	), () => {

		it( extendsClass( "CarbonLDP.TransientResource" ), () => {
			const target:TransientResource = {} as SimpleUserACReport;
			expect( target ).toBeDefined();
		} );


		it( hasProperty(
			OBLIGATORY,
			"protectedDocument",
			"CarbonLDP.Pointer"
		), ():void => {
			const target:SimpleUserACReport[ "protectedDocument" ] = {} as Pointer;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"permissions",
			"CarbonLDP.Pointer[]"
		), ():void => {
			const target:SimpleUserACReport[ "permissions" ] = [] as Pointer[];
			expect( target ).toBeDefined();
		} );

	} );


	describe( interfaze(
		"CarbonLDP.Auth.SimpleUserACReportFactory",
		"Interface with the factory and utils for `CarbonLDP.Auth.SimpleUserACReport` objects."
	), () => {

		describe( property(
			OBLIGATORY,
			"TYPE",
			"CarbonLDP.Vocabulary.CS.SimpleUserACReport"
		), ():void => {

			it( "should exists", ():void => {
				expect( SimpleUserACReport.TYPE ).toBeDefined();
				expect( SimpleUserACReport.TYPE ).toEqual( jasmine.any( String ) );
			} );


			it( "should be cs:SimpleUserACReport", () => {
				expect( SimpleUserACReport.TYPE ).toBe( CS.SimpleUserACReport );
			} );

		} );

		describe( property(
			OBLIGATORY,
			"SCHEMA",
			"CarbonLDP.ObjectSchema"
		), () => {

			it( "should exists", ():void => {
				expect( SimpleUserACReport.SCHEMA ).toBeDefined();
				expect( SimpleUserACReport.SCHEMA ).toEqual( jasmine.any( Object ) );
			} );


			it( "should has model properties", () => {
				type Target = AnyJasmineValue<Required<Pick<SimpleUserACReport,
					| "protectedDocument"
					| "permissions">>>;

				expect( SimpleUserACReport.SCHEMA as Target ).toEqual( {
					protectedDocument: jasmine.any( Object ),
					permissions: jasmine.any( Object ),
				} );
			} );

			it( "should has cs:protectedDocument", () => {
				expect( SimpleUserACReport.SCHEMA[ "protectedDocument" ] ).toEqual( {
					"@id": CS.protectedDocument,
					"@type": "@id",
				} );
			} );

			it( "should has cs:permission", () => {
				expect( SimpleUserACReport.SCHEMA[ "permissions" ] ).toEqual( {
					"@id": CS.permission,
					"@type": "@id",
					"@container": "@set",
				} );
			} );

		} );

	} );

	describe( property(
		STATIC,
		"SimpleUserACReport",
		"CarbonLDP.Auth.SimpleUserACReportFactory"
	), () => {

		it( "should exists", ():void => {
			expect( SimpleUserACReport ).toBeDefined();
			expect( SimpleUserACReport ).toEqual( jasmine.any( Object ) );
		} );

	} );

} );
