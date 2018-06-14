import { createMockPartialMetadata } from "../../test/helpers/mocks";
import {
	hasMethod,
	hasProperty,
	hasSignature,
	interfaze,
	isDefined,
	method,
	module,
	OBLIGATORY,
	property,
	STATIC,
} from "../test/JasmineExtender";
import * as Utils from "../Utils";

import {
	PersistedResource,
	PersistedResourceFactory
} from "./PersistedResource";

import { TransientResource } from "./TransientResource";


function createMock( data?:Partial<PersistedResource> ):PersistedResource {
	return PersistedResource.decorate( Object.assign( {}, data ) );
}

describe( module( "carbonldp/PersistedResource" ), ():void => {

	describe( interfaze(
		"CarbonLDP.PersistedResource",
		"Interface that represents any persisted resource in the SDK."
	), ():void => {

		it( hasProperty(
			OBLIGATORY,
			"_snapshot",
			"Object",
			"The shallow copy of the resource, which is used to track the changes on the resource."
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"_syncSnapshot",
			"Updates the snapshot with the data of the resource."
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"_partialMetadata",
			"CarbonLDP.SPARQL.QueryDocument.PartialMetadata",
			"Metadata for documents that are partial documents."
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"isDirty",
			"Returns true if the resource presents differences from its snapshot."
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"revert",
			"Revert the changes made to the resource into the state of the snapshot."
		), ():void => {} );


		describe( method( OBLIGATORY, "isPartial" ), () => {

			it( hasSignature(
				"Returns true if the resource is a partial representation of the one stored in Carbon LDP.",
				{ type: "boolean" }
			), ():void => {} );

			it( "should exists", ():void => {
				const resource:PersistedResource = PersistedResource.decorate( {} );

				expect( resource.isPartial ).toBeDefined();
				expect( resource.isPartial ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return false when no _partialMetadata", () => {
				const resource:PersistedResource = createMock( { _partialMetadata: undefined } );
				expect( resource.isPartial() ).toBe( false );
			} );

			it( "should return true when _partialMetadata set", () => {
				const resource:PersistedResource = createMock( { _partialMetadata: createMockPartialMetadata() } );
				expect( resource.isPartial() ).toBe( true );
			} );

		} );

	} );

	describe( interfaze(
		"CarbonLDP.ResourceFactory",
		"Interface with the factory, decorate and utils methods of a `CarbonLDP.PersistedResource` object"
	), ():void => {

		it( hasMethod(
			OBLIGATORY,
			"isDecorated",
			"Returns true if the object provided has the properties and methods of a `CarbonLDP.PersistedResource` object.", [
				{ name: "object", type: "object" },
			],
			{ type: "object is CarbonLDP.PersistedResource" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"decorate",
			[ "T extends object" ],
			"Decorates the object provided with the properties and methods of a `CarbonLDP.PersistedResource` object.", [
				{ name: "object", type: "T", description: "The object to convert into a persisted resource one." },
			]
		), ():void => {} );

	} );

	describe( property(
		STATIC,
		"PersistedResource",
		"CarbonLDP.ResourceFactory",
		"Constant that implements the `CarbonLDP.ResourceFactory` interface."
	), ():void => {

		it( isDefined(), ():void => {
			expect( PersistedResource ).toBeDefined();
			expect( PersistedResource ).toEqual( jasmine.any( Object ) );
		} );

		// TODO: Separate in different tests
		it( "PersistedResource.isDecorated", ():void => {
			expect( PersistedResource.isDecorated ).toBeDefined();
			expect( Utils.isFunction( PersistedResource.isDecorated ) ).toBe( true );

			let object:PersistedResourceFactory[ "PROTOTYPE" ] = void 0;
			expect( PersistedResource.isDecorated( object ) ).toBe( false );

			object = {
				_snapshot: null,
				_partialMetadata: null,
				_syncSnapshot: ():void => {},
				isDirty: ():any => {},
				revert: ():any => {},
				isPartial: ():any => {},
			};
			expect( PersistedResource.isDecorated( object ) ).toBe( true );

			delete object._snapshot;
			expect( PersistedResource.isDecorated( object ) ).toBe( false );
			object._snapshot = null;

			delete object._partialMetadata;
			expect( PersistedResource.isDecorated( object ) ).toBe( false );
			object._partialMetadata = null;

			delete object._syncSnapshot;
			expect( PersistedResource.isDecorated( object ) ).toBe( false );
			object._syncSnapshot = () => {};

			delete object.isDirty;
			expect( PersistedResource.isDecorated( object ) ).toBe( false );
			object.isDirty = ():any => {};

			delete object.revert;
			expect( PersistedResource.isDecorated( object ) ).toBe( false );
			object.revert = ():any => {};

			delete object.isPartial;
			expect( PersistedResource.isDecorated( object ) ).toBe( false );
			object.isPartial = ():any => {};
		} );

		describe( "PersistedResource.decorate", ():void => {

			it( "should exists", ():void => {
				expect( PersistedResource.decorate ).toBeDefined();
				expect( PersistedResource.decorate ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return same if object has prototype properties", ():void => {
				const fn:() => any = ():void => {};

				const persistedResource:PersistedResource = PersistedResource.decorate<PersistedResourceFactory[ "PROTOTYPE" ]>( {
					_partialMetadata: void 0,
					_snapshot: void 0,
					_syncSnapshot: fn,
					isDirty: fn,
					revert: fn,
					isPartial: fn,
				} );

				expect( persistedResource ).toEqual( jasmine.objectContaining( {
					_partialMetadata: void 0,
					_snapshot: void 0,
					_syncSnapshot: fn,
					isDirty: fn,
					revert: fn,
					isPartial: fn,
				} ) );
			} );

			it( "should return object provided", ():void => {
				const object:{} = { the: "object" };
				const resource:PersistedResource = PersistedResource.decorate( object );

				expect( object ).toBe( resource );
			} );

			it( "should call TransientResource.decorate", ():void => {
				const spy:jasmine.Spy = spyOn( TransientResource, "decorate" ).and
					.callThrough();

				PersistedResource.decorate( { the: "object" } );

				expect( spy ).toHaveBeenCalledWith( { the: "object" } );
			} );


			it( "should assign empty snapshot", ():void => {
				const resource:PersistedResource = PersistedResource.decorate( {} );
				expect( resource._snapshot ).toEqual( {} );
			} );

			it( "should assign undefined partialMetadata", ():void => {
				const resource:PersistedResource = PersistedResource.decorate( {} );
				expect( resource._partialMetadata ).toBeUndefined();
			} );

		} );

		describe( "PersistedResource instance", ():void => {

			describe( "PersistedResource._syncSnapshot", ():void => {

				it( "should exists", ():void => {
					const resource:PersistedResource = PersistedResource.decorate( {} );

					expect( resource._syncSnapshot ).toBeDefined();
					expect( resource._syncSnapshot ).toEqual( jasmine.any( Function ) );
				} );


				it( "should not alter previous snapshot", ():void => {
					const resource:PersistedResource = PersistedResource.decorate( {} );

					const previous:{} = resource._snapshot;

					Object.assign( resource, { the: "new property" } );
					resource._syncSnapshot();

					expect( resource._snapshot ).not.toBe( previous );
				} );

				it( "should not assign itself as snapshot", ():void => {
					const resource:PersistedResource = PersistedResource.decorate( {} );
					resource._syncSnapshot();

					expect( resource._snapshot ).not.toBe( resource );
				} );

				it( "should sync new property", ():void => {
					const resource:PersistedResource = PersistedResource.decorate( {} );

					Object.assign( resource, { the: "new property" } );
					resource._syncSnapshot();

					expect( resource._snapshot ).toEqual( jasmine.objectContaining( { the: "new property" } ) );
				} );

				it( "should sync types (non-enumerable)", ():void => {
					const resource:PersistedResource = PersistedResource.decorate( {} );

					resource.types.push( "https://example.com/ns#Type" );
					resource._syncSnapshot();

					expect( resource._snapshot ).toEqual( jasmine.objectContaining( {
						types: [ "https://example.com/ns#Type" ],
					} ) );
				} );

				it( "should not sync ID", ():void => {
					const resource:PersistedResource = PersistedResource.decorate( {} );

					resource.id = "https://example.com/resource/";
					resource._syncSnapshot();

					expect( resource._snapshot ).not.toEqual( jasmine.objectContaining( {
						id: "https://example.com/resource/",
					} ) );
				} );

			} );

			describe( "PersistedResource.isDirty", ():void => {

				it( "should exists", ():void => {
					const resource:PersistedResource = PersistedResource.decorate( {} );

					expect( resource.isDirty ).toBeDefined();
					expect( resource.isDirty ).toEqual( jasmine.any( Function ) );
				} );


				it( "should return false if synced", ():void => {
					const resource:PersistedResource = PersistedResource
						.decorate( { the: "resource" } );
					resource._syncSnapshot();

					expect( resource.isDirty() ).toBe( false );
				} );

				it( "should return true if new property", ():void => {
					const resource:PersistedResource = PersistedResource.decorate( {} );
					resource._syncSnapshot();

					Object.assign( resource, { the: "new property" } );

					expect( resource.isDirty() ).toBe( true );
				} );

				it( "should return true if deleted property", ():void => {
					const resource:PersistedResource & { the?:string } = PersistedResource
						.decorate( { the: "old property" } );
					resource._syncSnapshot();

					delete resource.the;

					expect( resource.isDirty() ).toBe( true );
				} );

				it( "should return true if null property", ():void => {
					const resource:PersistedResource & { the?:string } = PersistedResource
						.decorate( { the: "old property" } );
					resource._syncSnapshot();

					resource.the = null;

					expect( resource.isDirty() ).toBe( true );
				} );

				it( "should return true if altered property", ():void => {
					const resource:PersistedResource & { the?:string } = PersistedResource
						.decorate( { the: "old property value" } );
					resource._syncSnapshot();

					resource.the = "new property value";

					expect( resource.isDirty() ).toBe( true );
				} );


				it( "should return true if new type", ():void => {
					const resource:PersistedResource = PersistedResource.decorate( {} );
					resource._syncSnapshot();

					resource.types.push( "https://example.com/ns#Type" );

					expect( resource.isDirty() ).toBe( true );
				} );

				it( "should return true if deleted type", ():void => {
					const resource:PersistedResource = PersistedResource.decorate( {
						types: [ "https://example.com/ns#Type", "https://example.com/ns#Type-2" ],
					} );
					resource._syncSnapshot();

					resource.types.splice( 1, 1 );

					expect( resource.isDirty() ).toBe( true );
				} );


				it( "should return false even if ID changed", ():void => {
					const resource:PersistedResource = PersistedResource.decorate( {
						id: "https://example.com/resource/",
					} );
					resource._syncSnapshot();

					resource.id = "https://exampple.com/another-resource/";

					expect( resource.isDirty() ).toBe( false );
				} );

				it( "should return false if related resource content altered", ():void => {
					const relatedResource:PersistedResource = PersistedResource
						.decorate( { id: "https://example.com/realted/resource/" } );

					const resource:PersistedResource = PersistedResource
						.decorate( {
							relation: relatedResource,
						} );

					resource._syncSnapshot();
					Object.assign( relatedResource, { the: "change in content" } );

					expect( resource.isDirty() ).toBe( false );
				} );

			} );

			describe( "PersistedResource.revert", ():void => {

				it( "should exists", ():void => {
					const resource:PersistedResource = PersistedResource.decorate( {} );

					expect( resource.revert ).toBeDefined();
					expect( resource.revert ).toEqual( jasmine.any( Function ) );
				} );


				it( "should revert change in property", ():void => {
					const resource:PersistedResource & { the?:string } = PersistedResource
						.decorate( { the: "old property value" } );
					resource._syncSnapshot();

					resource.the = "new property value";
					resource.revert();

					expect( resource ).toEqual( jasmine.objectContaining( {
						the: "old property value",
					} ) );
				} );

				it( "should revert add deleted property", ():void => {
					const resource:PersistedResource & { the?:string } = PersistedResource
						.decorate( { the: "old property" } );
					resource._syncSnapshot();

					delete resource.the;
					resource.revert();

					expect( resource ).toEqual( jasmine.objectContaining( {
						the: "old property",
					} ) );
				} );

				it( "should revert add null-ed property", ():void => {
					const resource:PersistedResource & { the?:string } = PersistedResource
						.decorate( { the: "old property" } );
					resource._syncSnapshot();

					resource.the = null;
					resource.revert();

					expect( resource ).toEqual( jasmine.objectContaining( {
						the: "old property",
					} ) );
				} );

				it( "should revert remove new property", ():void => {
					const resource:PersistedResource & { the?:string } = PersistedResource
						.decorate( {} );
					resource._syncSnapshot();

					resource.the = "new property";
					resource.revert();

					expect( resource ).not.toEqual( jasmine.objectContaining( {
						the: "new property",
					} ) );
				} );


				it( "should remove new type", ():void => {
					const resource:PersistedResource = PersistedResource.decorate( {
						types: [ "https://example.com/ns#Type" ],
					} );
					resource._syncSnapshot();

					resource.types.push( "https://example.com/ns#Type-2" );
					resource.revert();

					expect( resource ).toEqual( jasmine.objectContaining( {
						types: [ "https://example.com/ns#Type" ],
					} ) );
				} );

				it( "should add deleted type", ():void => {
					const resource:PersistedResource = PersistedResource.decorate( {
						types: [ "https://example.com/ns#Type", "https://example.com/ns#Type-2" ],
					} );
					resource._syncSnapshot();

					resource.types.splice( 1, 1 );
					resource.revert();

					expect( resource ).toEqual( jasmine.objectContaining( {
						types: [ "https://example.com/ns#Type", "https://example.com/ns#Type-2" ],
					} ) );
				} );


				it( "should not revert changed ID", ():void => {
					const resource:PersistedResource = PersistedResource.decorate( {
						id: "https://example.com/resource/",
					} );
					resource._syncSnapshot();

					resource.id = "https://exampple.com/another-resource/";
					resource.revert();

					expect( resource ).toEqual( jasmine.objectContaining( {
						id: "https://exampple.com/another-resource/",
					} ) );
				} );

				it( "should revert related resource content altered", ():void => {
					const relatedResource:PersistedResource & { the?:string } = PersistedResource
						.decorate( { id: "https://example.com/realted/resource/" } );

					const resource:PersistedResource = PersistedResource
						.decorate( {
							relation: relatedResource,
						} );

					resource._syncSnapshot();
					Object.assign( relatedResource, { the: "change in content" } );
					resource.revert();

					expect( relatedResource ).toEqual( jasmine.objectContaining( {
						the: "change in content",
					} ) );
				} );

			} );

		} );

	} );

} );
