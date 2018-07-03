import { AbstractContext } from "./AbstractContext";
import { GlobalContext } from "./GlobalContext";
import {
	clazz,
	constructor,
	extendsClass,
	hasProperty,
	INSTANCE,
	isDefined,
	module,
	property,
	STATIC,
} from "../test/JasmineExtender";
import { CS } from "../Vocabularies";


describe( module( "carbonldp/GlobalContext" ), ():void => {

	describe( clazz( "CarbonLDP.GlobalContext", "Base class of every Context in the SDK." ), ():void => {

		it( isDefined(), ():void => {
			expect( GlobalContext ).toBeDefined();
			expect( GlobalContext ).toEqual( jasmine.any( Function ) );
		} );

		it( extendsClass( "CarbonLDP.AbstractContext<Pointer, undefined>" ), ():void => {
			expect( GlobalContext.instance ).toEqual( jasmine.any( AbstractContext ) );
		} );

		describe( constructor(), ():void => {} );

		it( hasProperty(
			INSTANCE,
			"registry",
			"CarbonLDP.PointerRegistry",
			"Registry that stores simple pointers for any resource.\nThis resources cannot be resolved since the GlobalContext does not have a repository."
		), ():void => {} );

		it( hasProperty(
			INSTANCE,
			"baseURI",
			"\"\"",
			"An empty string since this context accepts any resource to be stored."
		), ():void => {} );

		it( hasProperty(
			INSTANCE,
			"parentContext",
			"undefined",
			"Undefined since the singleton `CarbonLDP.GlobalContext#instance` is used as a parent context for every CarbonLDP context."
		), ():void => {} );

		describe( property(
			STATIC,
			"instance",
			"CarbonLDP.GlobalContext",
			"The singleton for the GlobalContext. This is used as the parent context for every CarbonLDP instance."
		), ():void => {

			it( "should exists", ():void => {
				expect( GlobalContext.instance ).toBeDefined();
				expect( GlobalContext.instance ).toEqual( jasmine.any( GlobalContext ) );
			} );

			it( "should have baseURI as an empty string", ():void => {
				expect( GlobalContext.instance.baseURI ).toBe( "" );
			} );

			it( "should have parentContext as undefined", ():void => {
				expect( GlobalContext.instance.parentContext ).toBeUndefined();
			} );

			it( "should has default decorators", () => {
				expect( GlobalContext.instance.registry.documentDecorators ).toEqual( new Map( [
					[ CS.ProtectedDocument, jasmine.any( Function ) ],
					[ CS.AccessControlList, jasmine.any( Function ) ],
					[ CS.User, jasmine.any( Function ) ],
				] ) );
			} );

		} );

	} );

} );
