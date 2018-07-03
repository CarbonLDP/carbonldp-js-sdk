import { CarbonLDP } from "../CarbonLDP";
import {
	IllegalActionError,
	IllegalArgumentError
} from "../Errors";
import { Header } from "../HTTP";
import { Pointer } from "../Pointer";
import { DocumentsRegistry } from "../Registry";
import { TransientResource } from "../Resource";
import {
	extendsClass,
	hasSignature,
	interfaze,
	method,
	module,
	OBLIGATORY
} from "../test/JasmineExtender";
import {
	C,
	LDP
} from "../Vocabularies";
import { MembersDocument } from "./MembersDocument";


function createMock<T extends object>( data?:T & Partial<MembersDocument> ):T & MembersDocument {
	return MembersDocument.decorate( Object.assign( {
		id: "https://example.com/",
	}, data ) );
}


describe( module( "carbonldp/Members/MembersDocument" ), () => {

	describe( interfaze(
		"CarbonLDP.Members.MembersDocument",
		"Document that contains methods to apply SPARQL queries."
	), () => {

		it( extendsClass( "CarbonLDP.TransientResource" ), () => {
			const target:TransientResource = {} as MembersDocument;
			expect( target ).toBeDefined();
		} );

		beforeEach( ():void => {
			jasmine.Ajax.install();
		} );

		afterEach( () => {
			jasmine.Ajax.uninstall();
		} );


		describe( method( OBLIGATORY, "addMember" ), () => {

			it( hasSignature(
				"Adds the provided resource as member of the current document.", [
					{ name: "member", type: "CarbonLDP.Pointer | string", description: "URI or Pointer to add as a member." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<void>" }
			), ():void => {} );

			it( hasSignature(
				"Adds the provided resource as member of the specified document.", [
					{ name: "uri", type: "string", description: "URI of the document to add the specified member." },
					{ name: "member", type: "CarbonLDP.Pointer | string", description: "URI or Pointer to add as a member." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<void>" }
			), ():void => {} );

			it( "should exists", ():void => {
				const resource:MembersDocument = createMock();

				expect( resource.addMember ).toBeDefined();
				expect( resource.addMember ).toEqual( jasmine.any( Function ) );
			} );


			function stubRequest( url:string, options:{ status?:number, headers?:{ [ key:string ]:string } } = {} ):void {
				const status:number = options.status ?
					options.status : 204;

				// noinspection JSMismatchedCollectionQueryUpdate
				const headers:{ [ key:string ]:string } = options.headers ?
					options.headers : {};

				jasmine.Ajax
					.stubRequest( url, null, "PUT" )
					.andReturn( {
						status,
						responseHeaders: {
							...headers,
						},
					} );
			}

			describe( "When has a context", () => {

				let context:CarbonLDP;
				let resource:MembersDocument;
				beforeEach( ():void => {
					context = new CarbonLDP( "https://example.com/" );
					resource = createMock( {
						_registry: context.registry,
						$id: "https://example.com/",
					} );

					stubRequest( "https://example.com/" );
				} );


				it( "should throw error when _registry undefined", async () => {
					resource._registry = void 0;

					await resource
						.addMember( "member/" )
						.catch( error => {
							expect( () => { throw error; } )
								.toThrowError( IllegalActionError, `"https://example.com/" doesn't support Members management requests.` );
						} )
					;
				} );


				it( "should request self ID when no URI", async () => {
					await resource
						.addMember( "member/" );

					const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
					expect( request.url ).toBe( "https://example.com/" );
				} );

				it( "should request the URI provided", async () => {
					stubRequest( "https://example.com/another-resource/" );

					await resource
						.addMember( "https://example.com/another-resource/", "member/" );

					const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
					expect( request.url ).toBe( "https://example.com/another-resource/" );
				} );

				it( "should request relative URI provided", async () => {
					stubRequest( "https://example.com/relative/" );

					await resource
						.addMember( "relative/", "member/" );

					const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
					expect( request.url ).toBe( "https://example.com/relative/" );
				} );

				it( "should request resolved prefixed name provided", async () => {
					stubRequest( "https://example.com/resource/" );

					context.extendObjectSchema( { "ex": "https://example.com/" } );

					await resource
						.addMember( "ex:resource/", "member/" );

					const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
					expect( request.url ).toBe( "https://example.com/resource/" );
				} );

				it( "should throw error when URI outside context scope", async () => {
					await resource
						.addMember( "https://example.org/resource/", "member/" )
						.catch( error => {
							expect( () => { throw error; } )
								.toThrowError( IllegalArgumentError, `"https://example.org/resource/" is out of scope.` );
						} )
					;
				} );

				it( "should throw error when URI is BNode label", async () => {
					await resource
						.addMember( "_:1", "member/" )
						.catch( error => {
							expect( () => { throw error; } )
								.toThrowError( IllegalArgumentError, `"_:1" is out of scope.` );
						} )
					;
				} );

				it( "should throw error when URI is Named Fragment label", async () => {
					await resource
						.addMember( "#fragment", "member/" )
						.catch( error => {
							expect( () => { throw error; } )
								.toThrowError( IllegalArgumentError, `"https://example.com/#fragment" is out of scope.` );
						} )
					;
				} );

				it( "should throw error when URI is unresolved prefixed name", async () => {
					await resource
						.addMember( "ex:resource/", "member/" )
						.catch( error => {
							expect( () => { throw error; } )
								.toThrowError( IllegalArgumentError, `"ex:resource/" is out of scope.` );
						} )
					;
				} );


				it( "should send add action when no URI", async () => {
					stubRequest( "https://example.com/" );

					await resource
						.addMember( "https://example.com/member/" );

					const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
					expect( JSON.parse( request.params ) ).toEqual( [
						{
							"@id": jasmine.any( String ),
							"@type": [ C.AddMemberAction ],
							[ C.targetMember ]: [
								{ "@id": "https://example.com/member/" },
							],
						},
					] );
				} );

				it( "should send add action when no URI and relative member", async () => {
					stubRequest( "https://example.com/" );

					await resource
						.addMember( "member/" );

					const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
					expect( JSON.parse( request.params ) ).toEqual( [
						{
							"@id": jasmine.any( String ),
							"@type": [ C.AddMemberAction ],
							[ C.targetMember ]: [
								{ "@id": "https://example.com/member/" },
							],
						},
					] );
				} );

				it( "should send add action when no URI and Pointer member", async () => {
					stubRequest( "https://example.com/" );

					await resource
						.addMember( Pointer.create( { $id: "https://example.com/member/" } ) );

					const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
					expect( JSON.parse( request.params ) ).toEqual( [
						{
							"@id": jasmine.any( String ),
							"@type": [ C.AddMemberAction ],
							[ C.targetMember ]: [
								{ "@id": "https://example.com/member/" },
							],
						},
					] );
				} );

				it( "should send add action when specified URI and relative member", async () => {
					stubRequest( "https://example.com/resource/" );

					await resource
						.addMember( "resource/", "member/" );

					const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
					expect( JSON.parse( request.params ) ).toEqual( [
						{
							"@id": jasmine.any( String ),
							"@type": [ C.AddMemberAction ],
							[ C.targetMember ]: [
								{ "@id": "https://example.com/member/" },
							],
						},
					] );
				} );

				it( "should send add action when specified URI", async () => {
					stubRequest( "https://example.com/resource/" );

					await resource
						.addMember( "resource/", "https://example.com/member/" );

					const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
					expect( JSON.parse( request.params ) ).toEqual( [
						{
							"@id": jasmine.any( String ),
							"@type": [ C.AddMemberAction ],
							[ C.targetMember ]: [
								{ "@id": "https://example.com/member/" },
							],
						},
					] );
				} );

				it( "should send add action when specified URI and Pointer member", async () => {
					stubRequest( "https://example.com/resource/" );

					await resource
						.addMember( "resource/", Pointer.create( { $id: "https://example.com/member/" } ) );

					const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
					expect( JSON.parse( request.params ) ).toEqual( [
						{
							"@id": jasmine.any( String ),
							"@type": [ C.AddMemberAction ],
							[ C.targetMember ]: [
								{ "@id": "https://example.com/member/" },
							],
						},
					] );
				} );


				it( "should send basic request headers when no IRI", async () => {
					await resource.addMember( "member/" );

					const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
					expect( request.requestHeaders ).toEqual( {
						"accept": "application/ld+json",
						"content-type": "application/ld+json",
						"prefer": [
							`${ LDP.Container }; rel=interaction-model`,
						].join( ", " ),
					} );
				} );

				it( "should add authentication header when no IRI", async () => {
					const spy:jasmine.Spy = spyOn( context.auth, "addAuthentication" );

					await resource
						.addMember( "member/" );

					expect( spy ).toHaveBeenCalled();
				} );

				it( "should add custom headers when no IRI", async () => {
					await resource.addMember( "member/", {
						headers: new Map()
							.set( "custom", new Header( "custom value" ) )
						,
					} );

					const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
					expect( request.requestHeaders ).toEqual( jasmine.objectContaining( {
						"custom": "custom value",
					} ) );
				} );

				it( "should send basic request headers when specified IRI", async () => {
					stubRequest( "https://example.com/resource/" );

					await resource.addMember( "resource/", "member/" );

					const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
					expect( request.requestHeaders ).toEqual( {
						"accept": "application/ld+json",
						"content-type": "application/ld+json",
						"prefer": [
							`${ LDP.Container }; rel=interaction-model`,
						].join( ", " ),
					} );
				} );

				it( "should add authentication header when specified IRI", async () => {
					stubRequest( "https://example.com/resource/" );

					const spy:jasmine.Spy = spyOn( context.auth, "addAuthentication" );

					await resource
						.addMember( "resource/", "member/" );

					expect( spy ).toHaveBeenCalled();
				} );

				it( "should add custom headers when specified IRI", async () => {
					stubRequest( "https://example.com/resource/" );

					await resource.addMember( "resource/", "member/", {
						headers: new Map()
							.set( "custom", new Header( "custom value" ) )
						,
					} );

					const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
					expect( request.requestHeaders ).toEqual( jasmine.objectContaining( {
						"custom": "custom value",
					} ) );
				} );


				it( "should parse error response", async () => {
					stubRequest( "https://example.com/", { status: 500 } );

					const spy:jasmine.Spy = spyOn( resource._registry, "_parseFailedResponse" )
						.and.callFake( () => Promise.reject( null ) );

					await resource
						.addMember( "member/" )
						.then( () => fail( "Should not resolve." ) )
						.catch( error => {
							if( error ) fail( error );

							expect( spy ).toHaveBeenCalled();
						} )
					;
				} );

			} );

			describe( "When has NOT a context", () => {

				let resource:MembersDocument;
				beforeEach( ():void => {
					resource = createMock( {
						_registry: new DocumentsRegistry(),
						$id: "https://example.com/",
					} );

					stubRequest( "https://example.com/" );
				} );


				it( "should throw error when _registry undefined", async () => {
					resource._registry = void 0;

					await resource
						.addMember( "member/" )
						.catch( error => {
							expect( () => { throw error; } )
								.toThrowError( IllegalActionError, `"https://example.com/" doesn't support Members management requests.` );
						} )
					;
				} );

				it( "should throw error when context undefined", async () => {
					await resource
						.addMember( "member/" )
						.catch( error => {
							expect( () => { throw error; } )
								.toThrowError( IllegalActionError, `"https://example.com/" doesn't support Members management requests.` );
						} )
					;
				} );

			} );

		} );

		describe( method( OBLIGATORY, "addMembers" ), () => {

			it( hasSignature(
				"Adds the provided resources as members of the current document.", [
					{ name: "member", type: "CarbonLDP.Pointer | string", description: "URI or Pointer to add as a member." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<void>" }
			), ():void => {} );

			it( hasSignature(
				"Adds the provided resources as members of the specified document.", [
					{ name: "uri", type: "string", description: "URI of the document to add the specified member." },
					{ name: "member", type: "CarbonLDP.Pointer | string", description: "URI or Pointer to add as a member." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<void>" }
			), ():void => {} );

			it( "should exists", ():void => {
				const resource:MembersDocument = createMock();

				expect( resource.addMembers ).toBeDefined();
				expect( resource.addMembers ).toEqual( jasmine.any( Function ) );
			} );


			function stubRequest( url:string, options:{ status?:number, headers?:{ [ key:string ]:string } } = {} ):void {
				const status:number = options.status ?
					options.status : 204;

				// noinspection JSMismatchedCollectionQueryUpdate
				const headers:{ [ key:string ]:string } = options.headers ?
					options.headers : {};

				jasmine.Ajax
					.stubRequest( url, null, "PUT" )
					.andReturn( {
						status,
						responseHeaders: {
							...headers,
						},
					} );
			}

			describe( "When has a context", () => {

				let context:CarbonLDP;
				let resource:MembersDocument;
				beforeEach( ():void => {
					context = new CarbonLDP( "https://example.com/" );
					resource = createMock( {
						_registry: context.registry,
						$id: "https://example.com/",
					} );

					stubRequest( "https://example.com/" );
				} );


				it( "should throw error when _registry undefined", async () => {
					resource._registry = void 0;

					await resource
						.addMembers( [ "member/" ] )
						.catch( error => {
							expect( () => { throw error; } )
								.toThrowError( IllegalActionError, `"https://example.com/" doesn't support Members management requests.` );
						} )
					;
				} );


				it( "should request self ID when no URI", async () => {
					await resource
						.addMembers( [ "member/" ] );

					const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
					expect( request.url ).toBe( "https://example.com/" );
				} );

				it( "should request the URI provided", async () => {
					stubRequest( "https://example.com/another-resource/" );

					await resource
						.addMembers( "https://example.com/another-resource/", [ "member/" ] );

					const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
					expect( request.url ).toBe( "https://example.com/another-resource/" );
				} );

				it( "should request relative URI provided", async () => {
					stubRequest( "https://example.com/relative/" );

					await resource
						.addMembers( "relative/", [ "member/" ] );

					const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
					expect( request.url ).toBe( "https://example.com/relative/" );
				} );

				it( "should request resolved prefixed name provided", async () => {
					stubRequest( "https://example.com/resource/" );

					context.extendObjectSchema( { "ex": "https://example.com/" } );

					await resource
						.addMembers( "ex:resource/", [ "member/" ] );

					const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
					expect( request.url ).toBe( "https://example.com/resource/" );
				} );

				it( "should throw error when URI outside context scope", async () => {
					await resource
						.addMembers( "https://example.org/resource/", [] )
						.catch( error => {
							expect( () => { throw error; } )
								.toThrowError( IllegalArgumentError, `"https://example.org/resource/" is out of scope.` );
						} )
					;
				} );

				it( "should throw error when URI is BNode label", async () => {
					await resource
						.addMembers( "_:1", [] )
						.catch( error => {
							expect( () => { throw error; } )
								.toThrowError( IllegalArgumentError, `"_:1" is out of scope.` );
						} )
					;
				} );

				it( "should throw error when URI is Named Fragment label", async () => {
					await resource
						.addMembers( "#fragment", [] )
						.catch( error => {
							expect( () => { throw error; } )
								.toThrowError( IllegalArgumentError, `"https://example.com/#fragment" is out of scope.` );
						} )
					;
				} );

				it( "should throw error when URI is a unresolved prefixed name", async () => {
					await resource
						.addMembers( "ex:resource/", [] )
						.catch( error => {
							expect( () => { throw error; } )
								.toThrowError( IllegalArgumentError, `"ex:resource/" is out of scope.` );
						} )
					;
				} );


				it( "should send add action when no URI", async () => {
					stubRequest( "https://example.com/" );

					await resource
						.addMembers( [
							"https://example.com/member-1/",
							"https://example.com/member-2/",
						] );

					const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
					expect( JSON.parse( request.params ) ).toEqual( [
						{
							"@id": jasmine.any( String ),
							"@type": [ C.AddMemberAction ],
							[ C.targetMember ]: [
								{ "@id": "https://example.com/member-1/" },
								{ "@id": "https://example.com/member-2/" },
							],
						},
					] );
				} );

				it( "should send add action when no URI and relative member", async () => {
					stubRequest( "https://example.com/" );

					await resource
						.addMembers( [
							"member-1/",
							"resource/member-2/",
						] );

					const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
					expect( JSON.parse( request.params ) ).toEqual( [
						{
							"@id": jasmine.any( String ),
							"@type": [ C.AddMemberAction ],
							[ C.targetMember ]: [
								{ "@id": "https://example.com/member-1/" },
								{ "@id": "https://example.com/resource/member-2/" },
							],
						},
					] );
				} );

				it( "should send add action when no URI and Pointer member", async () => {
					stubRequest( "https://example.com/" );

					await resource
						.addMembers( [
							Pointer.create( { $id: "https://example.com/member-1/" } ),
							Pointer.create( { $id: "https://example.com/member-2/" } ),
						] );

					const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
					expect( JSON.parse( request.params ) ).toEqual( [
						{
							"@id": jasmine.any( String ),
							"@type": [ C.AddMemberAction ],
							[ C.targetMember ]: [
								{ "@id": "https://example.com/member-1/" },
								{ "@id": "https://example.com/member-2/" },
							],
						},
					] );
				} );

				it( "should send add action when no URI and Pointer & string member", async () => {
					stubRequest( "https://example.com/" );

					await resource
						.addMembers( [
							"https://example.com/member-1/",
							Pointer.create( { $id: "https://example.com/member-2/" } ),
							"member-3/",
						] );

					const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
					expect( JSON.parse( request.params ) ).toEqual( [
						{
							"@id": jasmine.any( String ),
							"@type": [ C.AddMemberAction ],
							[ C.targetMember ]: [
								{ "@id": "https://example.com/member-1/" },
								{ "@id": "https://example.com/member-2/" },
								{ "@id": "https://example.com/member-3/" },
							],
						},
					] );
				} );

				it( "should send add action when specified URI", async () => {
					stubRequest( "https://example.com/resource/" );

					await resource
						.addMembers( "resource/", [
							"https://example.com/member-1/",
							"https://example.com/member-2/",
						] );

					const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
					expect( JSON.parse( request.params ) ).toEqual( [
						{
							"@id": jasmine.any( String ),
							"@type": [ C.AddMemberAction ],
							[ C.targetMember ]: [
								{ "@id": "https://example.com/member-1/" },
								{ "@id": "https://example.com/member-2/" },
							],
						},
					] );
				} );

				it( "should send add action when specified URI and relative member", async () => {
					stubRequest( "https://example.com/resource/" );

					await resource
						.addMembers( "resource/", [
							"member-1/",
							"resource/member-2/",
						] );

					const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
					expect( JSON.parse( request.params ) ).toEqual( [
						{
							"@id": jasmine.any( String ),
							"@type": [ C.AddMemberAction ],
							[ C.targetMember ]: [
								{ "@id": "https://example.com/member-1/" },
								{ "@id": "https://example.com/resource/member-2/" },
							],
						},
					] );
				} );

				it( "should send add action when specified URI and Pointer member", async () => {
					stubRequest( "https://example.com/resource/" );

					await resource
						.addMembers( "resource/", [
							Pointer.create( { $id: "https://example.com/member-1/" } ),
							Pointer.create( { $id: "https://example.com/member-2/" } ),
						] );

					const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
					expect( JSON.parse( request.params ) ).toEqual( [
						{
							"@id": jasmine.any( String ),
							"@type": [ C.AddMemberAction ],
							[ C.targetMember ]: [
								{ "@id": "https://example.com/member-1/" },
								{ "@id": "https://example.com/member-2/" },
							],
						},
					] );
				} );

				it( "should send add action when specified URI and Pointer & string member", async () => {
					stubRequest( "https://example.com/resource/" );

					await resource
						.addMembers( "resource/", [
							"https://example.com/member-1/",
							Pointer.create( { $id: "https://example.com/member-2/" } ),
							"member-3/",
						] );

					const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
					expect( JSON.parse( request.params ) ).toEqual( [
						{
							"@id": jasmine.any( String ),
							"@type": [ C.AddMemberAction ],
							[ C.targetMember ]: [
								{ "@id": "https://example.com/member-1/" },
								{ "@id": "https://example.com/member-2/" },
								{ "@id": "https://example.com/member-3/" },
							],
						},
					] );
				} );


				it( "should send basic request headers when no IRI", async () => {
					await resource.addMembers( [ "member/" ] );

					const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
					expect( request.requestHeaders ).toEqual( {
						"accept": "application/ld+json",
						"content-type": "application/ld+json",
						"prefer": [
							`${ LDP.Container }; rel=interaction-model`,
						].join( ", " ),
					} );
				} );

				it( "should add authentication header when no IRI", async () => {
					const spy:jasmine.Spy = spyOn( context.auth, "addAuthentication" );

					await resource
						.addMembers( [ "member/" ] );

					expect( spy ).toHaveBeenCalled();
				} );

				it( "should add custom headers when no IRI", async () => {
					await resource.addMembers( [ "member/" ], {
						headers: new Map()
							.set( "custom", new Header( "custom value" ) )
						,
					} );

					const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
					expect( request.requestHeaders ).toEqual( jasmine.objectContaining( {
						"custom": "custom value",
					} ) );
				} );

				it( "should send basic request headers when specified IRI", async () => {
					stubRequest( "https://example.com/resource/" );

					await resource.addMembers( "resource/", [ "member/" ] );

					const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
					expect( request.requestHeaders ).toEqual( {
						"accept": "application/ld+json",
						"content-type": "application/ld+json",
						"prefer": [
							`${ LDP.Container }; rel=interaction-model`,
						].join( ", " ),
					} );
				} );

				it( "should add authentication header when specified IRI", async () => {
					stubRequest( "https://example.com/resource/" );

					const spy:jasmine.Spy = spyOn( context.auth, "addAuthentication" );

					await resource
						.addMembers( "resource/", [ "member/" ] );

					expect( spy ).toHaveBeenCalled();
				} );

				it( "should add custom headers when specified IRI", async () => {
					stubRequest( "https://example.com/resource/" );

					await resource.addMembers( "resource/", [ "member/" ], {
						headers: new Map()
							.set( "custom", new Header( "custom value" ) )
						,
					} );

					const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
					expect( request.requestHeaders ).toEqual( jasmine.objectContaining( {
						"custom": "custom value",
					} ) );
				} );


				it( "should parse error response", async () => {
					stubRequest( "https://example.com/", { status: 500 } );

					const spy:jasmine.Spy = spyOn( resource._registry, "_parseFailedResponse" )
						.and.callFake( () => Promise.reject( null ) );

					await resource
						.addMembers( [ "member/" ] )
						.then( () => fail( "Should not resolve." ) )
						.catch( error => {
							if( error ) fail( error );

							expect( spy ).toHaveBeenCalled();
						} )
					;
				} );

			} );

			describe( "When has NOT a context", () => {

				let resource:MembersDocument;
				beforeEach( ():void => {
					resource = createMock( {
						_registry: new DocumentsRegistry(),
						$id: "https://example.com/",
					} );

					stubRequest( "https://example.com/" );
				} );


				it( "should throw error when _registry undefined", async () => {
					resource._registry = void 0;

					await resource
						.addMembers( [] )
						.catch( error => {
							expect( () => { throw error; } )
								.toThrowError( IllegalActionError, `"https://example.com/" doesn't support Members management requests.` );
						} )
					;
				} );

				it( "should throw error when context undefined", async () => {
					await resource
						.addMembers( [] )
						.catch( error => {
							expect( () => { throw error; } )
								.toThrowError( IllegalActionError, `"https://example.com/" doesn't support Members management requests.` );
						} )
					;
				} );

			} );

		} );


		describe( method( OBLIGATORY, "removeMember" ), () => {

			it( hasSignature(
				"Removes the provided resource as member of the current document.", [
					{ name: "member", type: "CarbonLDP.Pointer | string", description: "URI or Pointer to remove as a member." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<void>" }
			), ():void => {} );

			it( hasSignature(
				"Removes the provided resource as member of the specified document.", [
					{ name: "uri", type: "string", description: "URI of the document to remove the specified member." },
					{ name: "member", type: "CarbonLDP.Pointer | string", description: "URI or Pointer to remove as a member." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<void>" }
			), ():void => {} );

			it( "should exists", ():void => {
				const resource:MembersDocument = createMock();

				expect( resource.removeMember ).toBeDefined();
				expect( resource.removeMember ).toEqual( jasmine.any( Function ) );
			} );


			function stubRequest( url:string, options:{ status?:number, headers?:{ [ key:string ]:string } } = {} ):void {
				const status:number = options.status ?
					options.status : 204;

				// noinspection JSMismatchedCollectionQueryUpdate
				const headers:{ [ key:string ]:string } = options.headers ?
					options.headers : {};

				jasmine.Ajax
					.stubRequest( url, null, "DELETE" )
					.andReturn( {
						status,
						responseHeaders: {
							...headers,
						},
					} );
			}

			describe( "When has a context", () => {

				let context:CarbonLDP;
				let resource:MembersDocument;
				beforeEach( ():void => {
					context = new CarbonLDP( "https://example.com/" );
					resource = createMock( {
						_registry: context.registry,
						$id: "https://example.com/",
					} );

					stubRequest( "https://example.com/" );
				} );


				it( "should throw error when _registry undefined", async () => {
					resource._registry = void 0;

					await resource
						.removeMember( "member/" )
						.catch( error => {
							expect( () => { throw error; } )
								.toThrowError( IllegalActionError, `"https://example.com/" doesn't support Members management requests.` );
						} )
					;
				} );


				it( "should request self ID when no URI", async () => {
					await resource
						.removeMember( "member/" );

					const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
					expect( request.url ).toBe( "https://example.com/" );
				} );

				it( "should request the URI provided", async () => {
					stubRequest( "https://example.com/another-resource/" );

					await resource
						.removeMember( "https://example.com/another-resource/", "member/" );

					const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
					expect( request.url ).toBe( "https://example.com/another-resource/" );
				} );

				it( "should request relative URI provided", async () => {
					stubRequest( "https://example.com/relative/" );

					await resource
						.removeMember( "relative/", "member/" );

					const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
					expect( request.url ).toBe( "https://example.com/relative/" );
				} );

				it( "should request resolved prefixed name provided", async () => {
					stubRequest( "https://example.com/resource/" );

					context.extendObjectSchema( { "ex": "https://example.com/" } );

					await resource
						.removeMember( "ex:resource/", "member/" );

					const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
					expect( request.url ).toBe( "https://example.com/resource/" );
				} );

				it( "should throw error when URI outside context scope", async () => {
					await resource
						.removeMember( "https://example.org/resource/", "member/" )
						.catch( error => {
							expect( () => { throw error; } )
								.toThrowError( IllegalArgumentError, `"https://example.org/resource/" is out of scope.` );
						} )
					;
				} );

				it( "should throw error when URI is BNode label", async () => {
					await resource
						.removeMember( "_:1", "member/" )
						.catch( error => {
							expect( () => { throw error; } )
								.toThrowError( IllegalArgumentError, `"_:1" is out of scope.` );
						} )
					;
				} );

				it( "should throw error when URI is Named Fragment label", async () => {
					await resource
						.removeMember( "#fragment", "member/" )
						.catch( error => {
							expect( () => { throw error; } )
								.toThrowError( IllegalArgumentError, `"https://example.com/#fragment" is out of scope.` );
						} )
					;
				} );

				it( "should throw error when URI is unresolved prefixed name", async () => {
					await resource
						.removeMember( "ex:resource/", "member/" )
						.catch( error => {
							expect( () => { throw error; } )
								.toThrowError( IllegalArgumentError, `"ex:resource/" is out of scope.` );
						} )
					;
				} );


				it( "should send add action when no URI", async () => {
					stubRequest( "https://example.com/" );

					await resource
						.removeMember( "https://example.com/member/" );

					const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
					expect( JSON.parse( request.params ) ).toEqual( [
						{
							"@id": jasmine.any( String ),
							"@type": [ C.RemoveMemberAction ],
							[ C.targetMember ]: [
								{ "@id": "https://example.com/member/" },
							],
						},
					] );
				} );

				it( "should send add action when no URI and relative member", async () => {
					stubRequest( "https://example.com/" );

					await resource
						.removeMember( "member/" );

					const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
					expect( JSON.parse( request.params ) ).toEqual( [
						{
							"@id": jasmine.any( String ),
							"@type": [ C.RemoveMemberAction ],
							[ C.targetMember ]: [
								{ "@id": "https://example.com/member/" },
							],
						},
					] );
				} );

				it( "should send add action when no URI and Pointer member", async () => {
					stubRequest( "https://example.com/" );

					await resource
						.removeMember( Pointer.create( { $id: "https://example.com/member/" } ) );

					const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
					expect( JSON.parse( request.params ) ).toEqual( [
						{
							"@id": jasmine.any( String ),
							"@type": [ C.RemoveMemberAction ],
							[ C.targetMember ]: [
								{ "@id": "https://example.com/member/" },
							],
						},
					] );
				} );

				it( "should send add action when specified URI and relative member", async () => {
					stubRequest( "https://example.com/resource/" );

					await resource
						.removeMember( "resource/", "member/" );

					const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
					expect( JSON.parse( request.params ) ).toEqual( [
						{
							"@id": jasmine.any( String ),
							"@type": [ C.RemoveMemberAction ],
							[ C.targetMember ]: [
								{ "@id": "https://example.com/member/" },
							],
						},
					] );
				} );

				it( "should send add action when specified URI", async () => {
					stubRequest( "https://example.com/resource/" );

					await resource
						.removeMember( "resource/", "https://example.com/member/" );

					const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
					expect( JSON.parse( request.params ) ).toEqual( [
						{
							"@id": jasmine.any( String ),
							"@type": [ C.RemoveMemberAction ],
							[ C.targetMember ]: [
								{ "@id": "https://example.com/member/" },
							],
						},
					] );
				} );

				it( "should send add action when specified URI and Pointer member", async () => {
					stubRequest( "https://example.com/resource/" );

					await resource
						.removeMember( "resource/", Pointer.create( { $id: "https://example.com/member/" } ) );

					const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
					expect( JSON.parse( request.params ) ).toEqual( [
						{
							"@id": jasmine.any( String ),
							"@type": [ C.RemoveMemberAction ],
							[ C.targetMember ]: [
								{ "@id": "https://example.com/member/" },
							],
						},
					] );
				} );


				it( "should send basic request headers when no IRI", async () => {
					await resource.removeMember( "member/" );

					const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
					expect( request.requestHeaders ).toEqual( {
						"accept": "application/ld+json",
						"content-type": "application/ld+json",
						"prefer": [
							`${ LDP.Container }; rel=interaction-model`,
							`include="${ C.PreferSelectedMembershipTriples }"`,
							`omit="${ C.PreferMembershipTriples }"`,
						].join( ", " ),
					} );
				} );

				it( "should add authentication header when no IRI", async () => {
					const spy:jasmine.Spy = spyOn( context.auth, "addAuthentication" );

					await resource
						.removeMember( "member/" );

					expect( spy ).toHaveBeenCalled();
				} );

				it( "should add custom headers when no IRI", async () => {
					await resource.removeMember( "member/", {
						headers: new Map()
							.set( "custom", new Header( "custom value" ) )
						,
					} );

					const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
					expect( request.requestHeaders ).toEqual( jasmine.objectContaining( {
						"custom": "custom value",
					} ) );
				} );

				it( "should send basic request headers when specified IRI", async () => {
					stubRequest( "https://example.com/resource/" );

					await resource.removeMember( "resource/", "member/" );

					const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
					expect( request.requestHeaders ).toEqual( {
						"accept": "application/ld+json",
						"content-type": "application/ld+json",
						"prefer": [
							`${ LDP.Container }; rel=interaction-model`,
							`include="${ C.PreferSelectedMembershipTriples }"`,
							`omit="${ C.PreferMembershipTriples }"`,
						].join( ", " ),
					} );
				} );

				it( "should add authentication header when specified IRI", async () => {
					stubRequest( "https://example.com/resource/" );

					const spy:jasmine.Spy = spyOn( context.auth, "addAuthentication" );

					await resource
						.removeMember( "resource/", "member/" );

					expect( spy ).toHaveBeenCalled();
				} );

				it( "should add custom headers when specified IRI", async () => {
					stubRequest( "https://example.com/resource/" );

					await resource.removeMember( "resource/", "member/", {
						headers: new Map()
							.set( "custom", new Header( "custom value" ) )
						,
					} );

					const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
					expect( request.requestHeaders ).toEqual( jasmine.objectContaining( {
						"custom": "custom value",
					} ) );
				} );


				it( "should parse error response", async () => {
					stubRequest( "https://example.com/", { status: 500 } );

					const spy:jasmine.Spy = spyOn( resource._registry, "_parseFailedResponse" )
						.and.callFake( () => Promise.reject( null ) );

					await resource
						.removeMember( "member/" )
						.then( () => fail( "Should not resolve." ) )
						.catch( error => {
							if( error ) fail( error );

							expect( spy ).toHaveBeenCalled();
						} )
					;
				} );

			} );

			describe( "When has NOT a context", () => {

				let resource:MembersDocument;
				beforeEach( ():void => {
					resource = createMock( {
						_registry: new DocumentsRegistry(),
						$id: "https://example.com/",
					} );

					stubRequest( "https://example.com/" );
				} );


				it( "should throw error when _registry undefined", async () => {
					resource._registry = void 0;

					await resource
						.removeMember( "member/" )
						.catch( error => {
							expect( () => { throw error; } )
								.toThrowError( IllegalActionError, `"https://example.com/" doesn't support Members management requests.` );
						} )
					;
				} );

				it( "should throw error when context undefined", async () => {
					await resource
						.removeMember( "member/" )
						.catch( error => {
							expect( () => { throw error; } )
								.toThrowError( IllegalActionError, `"https://example.com/" doesn't support Members management requests.` );
						} )
					;
				} );

			} );

		} );

		describe( method( OBLIGATORY, "removeMembers" ), () => {

			it( hasSignature(
				"Removes the provided resources as members of the current document.", [
					{ name: "member", type: "CarbonLDP.Pointer | string", description: "URI or Pointer to remove as a member." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<void>" }
			), ():void => {} );

			it( hasSignature(
				"Removes the provided resources as members of the specified document.", [
					{ name: "uri", type: "string", description: "URI of the document to remove the specified member." },
					{ name: "member", type: "CarbonLDP.Pointer | string", description: "URI or Pointer to remove as a member." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<void>" }
			), ():void => {} );

			it( "should exists", ():void => {
				const resource:MembersDocument = createMock();

				expect( resource.removeMembers ).toBeDefined();
				expect( resource.removeMembers ).toEqual( jasmine.any( Function ) );
			} );


			function stubRequest( url:string, options:{ status?:number, headers?:{ [ key:string ]:string } } = {} ):void {
				const status:number = options.status ?
					options.status : 204;

				// noinspection JSMismatchedCollectionQueryUpdate
				const headers:{ [ key:string ]:string } = options.headers ?
					options.headers : {};

				jasmine.Ajax
					.stubRequest( url, null, "DELETE" )
					.andReturn( {
						status,
						responseHeaders: {
							...headers,
						},
					} );
			}

			describe( "When has a context", () => {

				let context:CarbonLDP;
				let resource:MembersDocument;
				beforeEach( ():void => {
					context = new CarbonLDP( "https://example.com/" );
					resource = createMock( {
						_registry: context.registry,
						$id: "https://example.com/",
					} );

					stubRequest( "https://example.com/" );
				} );


				it( "should throw error when _registry undefined", async () => {
					resource._registry = void 0;

					await resource
						.removeMembers( [ "member/" ] )
						.catch( error => {
							expect( () => { throw error; } )
								.toThrowError( IllegalActionError, `"https://example.com/" doesn't support Members management requests.` );
						} )
					;
				} );


				it( "should request self ID when no URI", async () => {
					await resource
						.removeMembers( [ "member/" ] );

					const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
					expect( request.url ).toBe( "https://example.com/" );
				} );

				it( "should request the URI provided", async () => {
					stubRequest( "https://example.com/another-resource/" );

					await resource
						.removeMembers( "https://example.com/another-resource/", [ "member/" ] );

					const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
					expect( request.url ).toBe( "https://example.com/another-resource/" );
				} );

				it( "should request relative URI provided", async () => {
					stubRequest( "https://example.com/relative/" );

					await resource
						.removeMembers( "relative/", [ "member/" ] );

					const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
					expect( request.url ).toBe( "https://example.com/relative/" );
				} );

				it( "should request resolved prefixed name provided", async () => {
					stubRequest( "https://example.com/resource/" );

					context.extendObjectSchema( { "ex": "https://example.com/" } );

					await resource
						.removeMembers( "ex:resource/", [ "member/" ] );

					const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
					expect( request.url ).toBe( "https://example.com/resource/" );
				} );

				it( "should throw error when URI outside context scope", async () => {
					await resource
						.removeMembers( "https://example.org/resource/", [] )
						.catch( error => {
							expect( () => { throw error; } )
								.toThrowError( IllegalArgumentError, `"https://example.org/resource/" is out of scope.` );
						} )
					;
				} );

				it( "should throw error when URI is BNode label", async () => {
					await resource
						.removeMembers( "_:1", [] )
						.catch( error => {
							expect( () => { throw error; } )
								.toThrowError( IllegalArgumentError, `"_:1" is out of scope.` );
						} )
					;
				} );

				it( "should throw error when URI is Named Fragment label", async () => {
					await resource
						.removeMembers( "#fragment", [] )
						.catch( error => {
							expect( () => { throw error; } )
								.toThrowError( IllegalArgumentError, `"https://example.com/#fragment" is out of scope.` );
						} )
					;
				} );

				it( "should throw error when URI is a unresolved prefixed name", async () => {
					await resource
						.removeMembers( "ex:resource/", [] )
						.catch( error => {
							expect( () => { throw error; } )
								.toThrowError( IllegalArgumentError, `"ex:resource/" is out of scope.` );
						} )
					;
				} );


				it( "should send add action when no URI", async () => {
					stubRequest( "https://example.com/" );

					await resource
						.removeMembers( [
							"https://example.com/member-1/",
							"https://example.com/member-2/",
						] );

					const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
					expect( JSON.parse( request.params ) ).toEqual( [
						{
							"@id": jasmine.any( String ),
							"@type": [ C.RemoveMemberAction ],
							[ C.targetMember ]: [
								{ "@id": "https://example.com/member-1/" },
								{ "@id": "https://example.com/member-2/" },
							],
						},
					] );
				} );

				it( "should send add action when no URI and relative member", async () => {
					stubRequest( "https://example.com/" );

					await resource
						.removeMembers( [
							"member-1/",
							"resource/member-2/",
						] );

					const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
					expect( JSON.parse( request.params ) ).toEqual( [
						{
							"@id": jasmine.any( String ),
							"@type": [ C.RemoveMemberAction ],
							[ C.targetMember ]: [
								{ "@id": "https://example.com/member-1/" },
								{ "@id": "https://example.com/resource/member-2/" },
							],
						},
					] );
				} );

				it( "should send add action when no URI and Pointer member", async () => {
					stubRequest( "https://example.com/" );

					await resource
						.removeMembers( [
							Pointer.create( { $id: "https://example.com/member-1/" } ),
							Pointer.create( { $id: "https://example.com/member-2/" } ),
						] );

					const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
					expect( JSON.parse( request.params ) ).toEqual( [
						{
							"@id": jasmine.any( String ),
							"@type": [ C.RemoveMemberAction ],
							[ C.targetMember ]: [
								{ "@id": "https://example.com/member-1/" },
								{ "@id": "https://example.com/member-2/" },
							],
						},
					] );
				} );

				it( "should send add action when no URI and Pointer & string member", async () => {
					stubRequest( "https://example.com/" );

					await resource
						.removeMembers( [
							"https://example.com/member-1/",
							Pointer.create( { $id: "https://example.com/member-2/" } ),
							"member-3/",
						] );

					const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
					expect( JSON.parse( request.params ) ).toEqual( [
						{
							"@id": jasmine.any( String ),
							"@type": [ C.RemoveMemberAction ],
							[ C.targetMember ]: [
								{ "@id": "https://example.com/member-1/" },
								{ "@id": "https://example.com/member-2/" },
								{ "@id": "https://example.com/member-3/" },
							],
						},
					] );
				} );

				it( "should send add action when specified URI", async () => {
					stubRequest( "https://example.com/resource/" );

					await resource
						.removeMembers( "resource/", [
							"https://example.com/member-1/",
							"https://example.com/member-2/",
						] );

					const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
					expect( JSON.parse( request.params ) ).toEqual( [
						{
							"@id": jasmine.any( String ),
							"@type": [ C.RemoveMemberAction ],
							[ C.targetMember ]: [
								{ "@id": "https://example.com/member-1/" },
								{ "@id": "https://example.com/member-2/" },
							],
						},
					] );
				} );

				it( "should send add action when specified URI and relative member", async () => {
					stubRequest( "https://example.com/resource/" );

					await resource
						.removeMembers( "resource/", [
							"member-1/",
							"resource/member-2/",
						] );

					const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
					expect( JSON.parse( request.params ) ).toEqual( [
						{
							"@id": jasmine.any( String ),
							"@type": [ C.RemoveMemberAction ],
							[ C.targetMember ]: [
								{ "@id": "https://example.com/member-1/" },
								{ "@id": "https://example.com/resource/member-2/" },
							],
						},
					] );
				} );

				it( "should send add action when specified URI and Pointer member", async () => {
					stubRequest( "https://example.com/resource/" );

					await resource
						.removeMembers( "resource/", [
							Pointer.create( { $id: "https://example.com/member-1/" } ),
							Pointer.create( { $id: "https://example.com/member-2/" } ),
						] );

					const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
					expect( JSON.parse( request.params ) ).toEqual( [
						{
							"@id": jasmine.any( String ),
							"@type": [ C.RemoveMemberAction ],
							[ C.targetMember ]: [
								{ "@id": "https://example.com/member-1/" },
								{ "@id": "https://example.com/member-2/" },
							],
						},
					] );
				} );

				it( "should send add action when specified URI and Pointer & string member", async () => {
					stubRequest( "https://example.com/resource/" );

					await resource
						.removeMembers( "resource/", [
							"https://example.com/member-1/",
							Pointer.create( { $id: "https://example.com/member-2/" } ),
							"member-3/",
						] );

					const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
					expect( JSON.parse( request.params ) ).toEqual( [
						{
							"@id": jasmine.any( String ),
							"@type": [ C.RemoveMemberAction ],
							[ C.targetMember ]: [
								{ "@id": "https://example.com/member-1/" },
								{ "@id": "https://example.com/member-2/" },
								{ "@id": "https://example.com/member-3/" },
							],
						},
					] );
				} );


				it( "should send basic request headers when no IRI", async () => {
					await resource.removeMembers( [ "member/" ] );

					const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
					expect( request.requestHeaders ).toEqual( {
						"accept": "application/ld+json",
						"content-type": "application/ld+json",
						"prefer": [
							`${ LDP.Container }; rel=interaction-model`,
							`include="${ C.PreferSelectedMembershipTriples }"`,
							`omit="${ C.PreferMembershipTriples }"`,
						].join( ", " ),
					} );
				} );

				it( "should add authentication header when no IRI", async () => {
					const spy:jasmine.Spy = spyOn( context.auth, "addAuthentication" );

					await resource
						.removeMembers( [ "member/" ] );

					expect( spy ).toHaveBeenCalled();
				} );

				it( "should add custom headers when no IRI", async () => {
					await resource.removeMembers( [ "member/" ], {
						headers: new Map()
							.set( "custom", new Header( "custom value" ) )
						,
					} );

					const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
					expect( request.requestHeaders ).toEqual( jasmine.objectContaining( {
						"custom": "custom value",
					} ) );
				} );

				it( "should send basic request headers when specified IRI", async () => {
					stubRequest( "https://example.com/resource/" );

					await resource.removeMembers( "resource/", [ "member/" ] );

					const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
					expect( request.requestHeaders ).toEqual( {
						"accept": "application/ld+json",
						"content-type": "application/ld+json",
						"prefer": [
							`${ LDP.Container }; rel=interaction-model`,
							`include="${ C.PreferSelectedMembershipTriples }"`,
							`omit="${ C.PreferMembershipTriples }"`,
						].join( ", " ),
					} );
				} );

				it( "should add authentication header when specified IRI", async () => {
					stubRequest( "https://example.com/resource/" );

					const spy:jasmine.Spy = spyOn( context.auth, "addAuthentication" );

					await resource
						.removeMembers( "resource/", [ "member/" ] );

					expect( spy ).toHaveBeenCalled();
				} );

				it( "should add custom headers when specified IRI", async () => {
					stubRequest( "https://example.com/resource/" );

					await resource.removeMembers( "resource/", [ "member/" ], {
						headers: new Map()
							.set( "custom", new Header( "custom value" ) )
						,
					} );

					const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
					expect( request.requestHeaders ).toEqual( jasmine.objectContaining( {
						"custom": "custom value",
					} ) );
				} );


				it( "should parse error response", async () => {
					stubRequest( "https://example.com/", { status: 500 } );

					const spy:jasmine.Spy = spyOn( resource._registry, "_parseFailedResponse" )
						.and.callFake( () => Promise.reject( null ) );

					await resource
						.removeMembers( [ "member/" ] )
						.then( () => fail( "Should not resolve." ) )
						.catch( error => {
							if( error ) fail( error );

							expect( spy ).toHaveBeenCalled();
						} )
					;
				} );

			} );

			describe( "When has NOT a context", () => {

				let resource:MembersDocument;
				beforeEach( ():void => {
					resource = createMock( {
						_registry: new DocumentsRegistry(),
						$id: "https://example.com/",
					} );

					stubRequest( "https://example.com/" );
				} );


				it( "should throw error when _registry undefined", async () => {
					resource._registry = void 0;

					await resource
						.removeMembers( [] )
						.catch( error => {
							expect( () => { throw error; } )
								.toThrowError( IllegalActionError, `"https://example.com/" doesn't support Members management requests.` );
						} )
					;
				} );

				it( "should throw error when context undefined", async () => {
					await resource
						.removeMembers( [] )
						.catch( error => {
							expect( () => { throw error; } )
								.toThrowError( IllegalActionError, `"https://example.com/" doesn't support Members management requests.` );
						} )
					;
				} );

			} );

		} );


		describe( method( OBLIGATORY, "removeAllMembers" ), () => {

			it( hasSignature(
				"Removes all the members of the current document.", [
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<void>" }
			), ():void => {} );

			it( hasSignature(
				"Removes all the members of the specified document.", [
					{ name: "uri", type: "string", description: "URI of the document to remove its members." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<void>" }
			), ():void => {} );

			it( "should exists", ():void => {
				const resource:MembersDocument = createMock();

				expect( resource.removeAllMembers ).toBeDefined();
				expect( resource.removeAllMembers ).toEqual( jasmine.any( Function ) );
			} );


			function stubRequest( url:string, options:{ status?:number, headers?:{ [ key:string ]:string } } = {} ):void {
				const status:number = options.status ?
					options.status : 204;

				// noinspection JSMismatchedCollectionQueryUpdate
				const headers:{ [ key:string ]:string } = options.headers ?
					options.headers : {};

				jasmine.Ajax
					.stubRequest( url, null, "DELETE" )
					.andReturn( {
						status,
						responseHeaders: {
							...headers,
						},
					} );
			}

			describe( "When has a context", () => {

				let context:CarbonLDP;
				let resource:MembersDocument;
				beforeEach( ():void => {
					context = new CarbonLDP( "https://example.com/" );
					resource = createMock( {
						_registry: context.registry,
						$id: "https://example.com/",
					} );

					stubRequest( "https://example.com/" );
				} );


				it( "should throw error when _registry undefined", async () => {
					resource._registry = void 0;

					await resource
						.removeAllMembers()
						.catch( error => {
							expect( () => { throw error; } )
								.toThrowError( IllegalActionError, `"https://example.com/" doesn't support Members management requests.` );
						} )
					;
				} );


				it( "should request self ID when no URI", async () => {
					await resource
						.removeAllMembers();

					const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
					expect( request.url ).toBe( "https://example.com/" );
				} );

				it( "should request the URI provided", async () => {
					stubRequest( "https://example.com/another-resource/" );

					await resource
						.removeAllMembers( "https://example.com/another-resource/" );

					const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
					expect( request.url ).toBe( "https://example.com/another-resource/" );
				} );

				it( "should request relative URI provided", async () => {
					stubRequest( "https://example.com/relative/" );

					await resource
						.removeAllMembers( "relative/" );

					const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
					expect( request.url ).toBe( "https://example.com/relative/" );
				} );

				it( "should request resolved prefixed name provided", async () => {
					stubRequest( "https://example.com/resource/" );

					context.extendObjectSchema( { "ex": "https://example.com/" } );

					await resource
						.removeAllMembers( "ex:resource/" );

					const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
					expect( request.url ).toBe( "https://example.com/resource/" );
				} );

				it( "should throw error when URI outside context scope", async () => {
					await resource
						.removeAllMembers( "https://example.org/resource/" )
						.catch( error => {
							expect( () => { throw error; } )
								.toThrowError( IllegalArgumentError, `"https://example.org/resource/" is out of scope.` );
						} )
					;
				} );

				it( "should throw error when URI is BNode label", async () => {
					await resource
						.removeAllMembers( "_:1" )
						.catch( error => {
							expect( () => { throw error; } )
								.toThrowError( IllegalArgumentError, `"_:1" is out of scope.` );
						} )
					;
				} );

				it( "should throw error when URI is Named Fragment label", async () => {
					await resource
						.removeAllMembers( "#fragment" )
						.catch( error => {
							expect( () => { throw error; } )
								.toThrowError( IllegalArgumentError, `"https://example.com/#fragment" is out of scope.` );
						} )
					;
				} );

				it( "should throw error when URI is a unresolved prefixed name", async () => {
					await resource
						.removeAllMembers( "ex:resource/" )
						.catch( error => {
							expect( () => { throw error; } )
								.toThrowError( IllegalArgumentError, `"ex:resource/" is out of scope.` );
						} )
					;
				} );


				it( "should NOT send body when no URI", async () => {
					await resource
						.removeAllMembers();

					const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
					expect( request.params ).toBeUndefined();
				} );

				it( "should NOT send body when specified URI", async () => {
					stubRequest( "https://example.com/resource/" );

					await resource
						.removeAllMembers( "resource/" );

					const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
					expect( request.params ).toBeUndefined();
				} );


				it( "should send basic request headers when no IRI", async () => {
					await resource.removeAllMembers();

					const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
					expect( request.requestHeaders ).toEqual( {
						"accept": "application/ld+json",
						"prefer": [
							`${ LDP.Container }; rel=interaction-model`,
							`include="${ C.PreferMembershipTriples }"`,
							`omit="${ [
								C.PreferMembershipResources,
								C.PreferContainmentTriples,
								C.PreferContainmentResources,
								C.PreferContainer,
							].join( " " ) }"`,
						].join( ", " ),
					} );
				} );

				it( "should add authentication header when no IRI", async () => {
					const spy:jasmine.Spy = spyOn( context.auth, "addAuthentication" );

					await resource
						.removeAllMembers();

					expect( spy ).toHaveBeenCalled();
				} );

				it( "should add custom headers when no IRI", async () => {
					await resource.removeAllMembers( {
						headers: new Map()
							.set( "custom", new Header( "custom value" ) )
						,
					} );

					const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
					expect( request.requestHeaders ).toEqual( jasmine.objectContaining( {
						"custom": "custom value",
					} ) );
				} );

				it( "should send basic request headers when specified IRI", async () => {
					stubRequest( "https://example.com/resource/" );

					await resource.removeAllMembers();

					const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
					expect( request.requestHeaders ).toEqual( {
						"accept": "application/ld+json",
						"prefer": [
							`${ LDP.Container }; rel=interaction-model`,
							`include="${ C.PreferMembershipTriples }"`,
							`omit="${ [
								C.PreferMembershipResources,
								C.PreferContainmentTriples,
								C.PreferContainmentResources,
								C.PreferContainer,
							].join( " " ) }"`,
						].join( ", " ),
					} );
				} );

				it( "should add authentication header when specified IRI", async () => {
					stubRequest( "https://example.com/resource/" );

					const spy:jasmine.Spy = spyOn( context.auth, "addAuthentication" );

					await resource
						.removeAllMembers();

					expect( spy ).toHaveBeenCalled();
				} );

				it( "should add custom headers when specified IRI", async () => {
					stubRequest( "https://example.com/resource/" );

					await resource.removeAllMembers( {
						headers: new Map()
							.set( "custom", new Header( "custom value" ) )
						,
					} );

					const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
					expect( request.requestHeaders ).toEqual( jasmine.objectContaining( {
						"custom": "custom value",
					} ) );
				} );


				it( "should parse error response", async () => {
					stubRequest( "https://example.com/", { status: 500 } );

					const spy:jasmine.Spy = spyOn( resource._registry, "_parseFailedResponse" )
						.and.callFake( () => Promise.reject( null ) );

					await resource
						.removeAllMembers()
						.then( () => fail( "Should not resolve." ) )
						.catch( error => {
							if( error ) fail( error );

							expect( spy ).toHaveBeenCalled();
						} )
					;
				} );

			} );

			describe( "When has NOT a context", () => {

				let resource:MembersDocument;
				beforeEach( ():void => {
					resource = createMock( {
						_registry: new DocumentsRegistry(),
						$id: "https://example.com/",
					} );

					stubRequest( "https://example.com/" );
				} );


				it( "should throw error when _registry undefined", async () => {
					resource._registry = void 0;

					await resource
						.removeAllMembers()
						.catch( error => {
							expect( () => { throw error; } )
								.toThrowError( IllegalActionError, `"https://example.com/" doesn't support Members management requests.` );
						} )
					;
				} );

				it( "should throw error when context undefined", async () => {
					await resource
						.removeAllMembers()
						.catch( error => {
							expect( () => { throw error; } )
								.toThrowError( IllegalActionError, `"https://example.com/" doesn't support Members management requests.` );
						} )
					;
				} );

			} );

		} );

	} );

} );
