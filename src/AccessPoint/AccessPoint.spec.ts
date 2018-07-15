import { Document } from "../Document";
import {
	extendsClass,
	hasProperty,
	hasSignature,
	interfaze,
	method,
	module,
	OBLIGATORY,
	property,
	STATIC,
} from "../test/JasmineExtender";
import {
	AccessPoint,
	AccessPointFactory
} from "./AccessPoint";
import {
	TransientAccessPoint,
	TransientAccessPointFactory
} from "./TransientAccessPoint";

describe( module( "carbonldp/AccessPoint" ), ():void => {

	describe( interfaze(
		"CarbonLDP.AccessPoint",
		"Interface that represents a persisted Carbon LDP AccessPoint."
	), ():void => {

		it( extendsClass( "CarbonLDP.TransientAccessPoint" ), ():void => {} );
		it( extendsClass( "CarbonLDP.Document" ), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"membershipResource",
			"CarbonLDP.Pointer",
			"The membership resource the access point belongs to."
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"hasMemberRelation",
			"CarbonLDP.Pointer",
			"The member relation of the access point manages."
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"isMemberOfRelation",
			"CarbonLDP.Pointer",
			"The inverted relation of the access point."
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"insertedContentRelation",
			"CarbonLDP.Pointer",
			"The inserted content relation of the access point."
		), ():void => {} );

	} );

	describe( interfaze(
		"CarbonLDP.AccessPointFactory",
		"Interface with the factory, decorate and utils methods of a `CarbonLDP.AccessPointFactory` object."
	), ():void => {

		it( extendsClass( "CarbonLDP.TransientAccessPointFactory" ), () => {
			const target:TransientAccessPointFactory = AccessPoint as AccessPointFactory;
			expect( target ).toEqual( jasmine.objectContaining( {
				TYPE: TransientAccessPoint.TYPE,
				create: TransientAccessPoint.create,
				createFrom: TransientAccessPoint.createFrom,
			} ) );
		} );

		describe( method( OBLIGATORY, "is" ), ():void => {

			it( hasSignature(
				"Returns true if the object provided is considered a `CarbonLDP.AccessPoint` object", [
					{ name: "value", type: "any" },
				],
				{ type: "value is CarbonLDP.AccessPoint" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( AccessPoint.is ).toBeDefined();
				expect( AccessPoint.is ).toEqual( jasmine.any( Function ) );
			} );


			let isTransientAccessPoint:jasmine.Spy;
			let isDocument:jasmine.Spy;
			beforeEach( ():void => {
				isTransientAccessPoint = spyOn( TransientAccessPoint, "is" )
					.and.returnValue( true );
				isDocument = spyOn( Document, "is" )
					.and.returnValue( true );
			} );

			it( "should be a TransientAccessPoint", () => {
				AccessPoint.is( { the: "object" } );
				expect( isTransientAccessPoint ).toHaveBeenCalledWith( { the: "object" } );
			} );

			it( "should be a Document", () => {
				AccessPoint.is( { the: "object" } );
				expect( isDocument ).toHaveBeenCalledWith( { the: "object" } );
			} );

			it( "should return true when all assertions", () => {
				const returned:boolean = AccessPoint.is( {} );
				expect( returned ).toBe( true );
			} );

		} );

	} );

	describe( property(
		STATIC,
		"AccessPoint",
		"CarbonLDP.AccessPointFactory",
		"Constant that implements the `CarbonLDP.AccessPointFactory` interface."
	), ():void => {

		it( "should exists", ():void => {
			expect( AccessPoint ).toBeDefined();
			expect( AccessPoint ).toEqual( jasmine.any( Object ) );
		} );

	} );

} );

