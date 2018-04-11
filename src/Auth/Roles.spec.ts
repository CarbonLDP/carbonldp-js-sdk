import { AbstractContext } from "../AbstractContext";
import { Pointer } from "../Pointer";
import {
	clazz,
	constructor,
	hasDefaultExport,
	hasSignature,
	INSTANCE,
	isDefined,
	method,
	module,
} from "../test/JasmineExtender";
import * as Errors from "./../Errors";
import * as PersistedRole from "./PersistedRole";

import * as Roles from "./Roles";


xdescribe( module( "Carbon/Auth/Roles" ), ():void => {

	it( isDefined(), ():void => {
		expect( Roles ).toBeDefined();
		expect( Roles ).toEqual( jasmine.any( Object ) );
	} );

	describe( clazz( "Carbon.Auth.Roles.Class", "Class that manage the roles of a Carbon LDP." ), ():void => {

		let roles:Roles.Class;
		let context:AbstractContext;
		beforeEach( ():void => {
			context = new class extends AbstractContext {
				protected _baseURI:string = "https://example.com/";
			};
			context.setSetting( "system.container", ".system/" );
			context.setSetting( "system.security.container", "security/" );
			context.setSetting( "system.security.roles.container", "roles/" );

			roles = new Roles.Class( context );
		} );

		it( isDefined(), ():void => {
			expect( Roles.Class ).toBeDefined();
			expect( Roles.Class ).toEqual( jasmine.any( Function ) );
		} );


		describe( constructor(), ():void => {

			it( hasSignature(
				[
					{ name: "context", type: "Carbon.Context.Class" },
				]
			), ():void => {} );

			it( "should be instantiable", ():void => {
				expect( roles ).toEqual( jasmine.any( Roles.Class ) );
			} );

		} );

		describe( method( INSTANCE, "createChild" ), ():void => {

			it( hasSignature(
				[ "T extends object" ],
				"Persists the Role provided with the slug, if specified, as a childRole of the parentRole specified.\n" +
				"Returns a Promise with a Pointer for the stored role; and a tuple of two responses, the first one is the response of the creation, and the second one is the response of the creation of the relation parent-child of the roles.", [
					{ name: "parentRole", type: "string | Carbon.Pointer.Class", description: "The role that will be assigned as the parent of the role that wants to persist." },
					{ name: "role", type: "T & Carbon.Auth.Roles.NewRole", description: "The appRole that wants to persist." },
					{ name: "slug", type: "string", optional: true, description: "The slug where the role will be persisted." },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "The slug where the role will be persisted." },
				],
				{ type: "Promise<[ T & Carbon.Auth.PersistedRole.Class, Carbon.HTTP.Response.Class ]>" }
			), ():void => {} );

			it( hasSignature(
				[ "T extends object" ],
				"Persists the Role provided as a childRole of the parentRole specified.\n" +
				"Returns a Promise with a Pointer for the stored role; and a tuple of two responses, the first one is the response of the creation, and the second one is the response of the creation of the relation parent-child of the roles.", [
					{ name: "parentRole", type: "string | Carbon.Pointer.Class", description: "The role that will be assigned as the parent of the role that wants to persist." },
					{ name: "role", type: "T & Carbon.Auth.Roles.NewRole", description: "The appRole that wants to persist." },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "The slug where the role will be persisted." },
				],
				{ type: "Promise<[ T & Carbon.Auth.PersistedRole.Class, Carbon.HTTP.Response.Class ]>" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( Roles.Class.prototype.createChild ).toBeDefined();
				expect( Roles.Class.prototype.createChild ).toEqual( jasmine.any( Function ) );
			} );


			it( "should error when not `system.security.roles.container` setting", ( done:DoneFn ):void => {
				context.deleteSetting( "system.security.roles.container" );

				roles
					.createChild( "parent-role/", { name: "New Role" } )
					.then( () => {
						done.fail( "Should not resolve" );
					} )
					.catch( ( error ) => {
						expect( () => { throw error; } ).toThrowError( Errors.IllegalStateError, `The "system.security.roles.container" setting hasn't been defined.` );
						done();
					} )
				;
			} );

			it( "should error when incorrect parent URI string", ( done:DoneFn ):void => {
				roles
					.createChild( "https://example.com/not-a-role/", { name: "New Role" } )
					.then( () => {
						done.fail( "Should not resolve" );
					} )
					.catch( ( error ) => {
						expect( () => { throw error; } ).toThrowError( Errors.IllegalArgumentError, `The URI "https://example.com/not-a-role/" isn't a valid role URI.` );
						done();
					} )
				;
			} );

			it( "should error when incorrect parent URI pointer", ( done:DoneFn ):void => {
				const pointer:Pointer.Class = context.documents.getPointer( "https://example.com/not-a-role/" );
				roles
					.createChild( pointer, { name: "New Role" } )
					.then( () => {
						done.fail( "Should not resolve" );
					} )
					.catch( ( error ) => {
						expect( () => { throw error; } ).toThrowError( Errors.IllegalArgumentError, `The URI "https://example.com/not-a-role/" isn't a valid role URI.` );
						done();
					} )
				;
			} );

			it( "should error when parent not exists", ( done:DoneFn ):void => {
				spyOn( context.documents, "exists" )
					.and.returnValue( Promise.resolve( [ false, null ] ) );

				roles
					.createChild( "parent-role/", { name: "New Role" } )
					.then( () => {
						done.fail( "Should not resolve" );
					} )
					.catch( ( error ) => {
						expect( () => { throw error; } ).toThrowError( Errors.IllegalArgumentError, `The parent role "https://example.com/.system/security/roles/parent-role/" doesn't exists.` );
						done();
					} )
				;
			} );


			it( "should create the child role", ( done:DoneFn ):void => {
				spyOn( context.documents, "exists" )
					.and.returnValue( Promise.resolve( [ true, null ] ) );
				const spy:jasmine.Spy = spyOn( context.documents, "createChild" )
					.and.returnValue( Promise.reject( { fake: "Error" } ) );

				roles
					.createChild( "parent-role/", { name: "New Role" } )
					.then( () => {
						done.fail( "Should not resolve" );
					} )
					.catch( () => {
						expect( spy ).toHaveBeenCalledWith( "https://example.com/.system/security/roles/", { name: "New Role" }, void 0, void 0 );

						done();
					} );
			} );

			it( "should add role as member of the parent", ( done:DoneFn ):void => {
				spyOn( context.documents, "exists" )
					.and.returnValue( Promise.resolve( [ true, null ] ) );
				spyOn( context.documents, "createChild" )
					.and.returnValue( Promise.resolve( [ { fake: "Document" }, null ] ) );
				const spy:jasmine.Spy = spyOn( context.documents, "addMember" )
					.and.returnValue( Promise.reject( { fake: "Error" } ) );

				roles
					.createChild( "parent-role/", { name: "New Role" } )
					.then( () => {
						done.fail( "Should not resolve" );
					} )
					.catch( () => {
						expect( spy ).toHaveBeenCalledWith( "https://example.com/.system/security/roles/parent-role/", { fake: "Document" } );

						done();
					} );
			} );

			it( "should decorate the provided role", ( done:DoneFn ):void => {
				spyOn( context.documents, "exists" )
					.and.returnValue( Promise.resolve( [ true, null ] ) );
				spyOn( context.documents, "createChild" )
					.and.returnValue( Promise.resolve( [ { fake: "Document" }, null ] ) );
				spyOn( context.documents, "addMember" )
					.and.returnValue( Promise.resolve( null ) );

				const newRole:Roles.NewRole = { name: "New Role" };
				roles
					.createChild( "parent-role/", newRole )
					.then( ( [ persistedRole ] ) => {
						expect( newRole ).toBe( persistedRole );
						expect( PersistedRole.Factory.is( persistedRole ) ).toBe( true );

						done();
					} )
					.catch( done.fail );
			} );

			it( "should return only the creation response", ( done:DoneFn ):void => {
				spyOn( context.documents, "exists" )
					.and.returnValue( Promise.resolve( [ true, null ] ) );
				spyOn( context.documents, "createChild" )
					.and.returnValue( Promise.resolve( [ { fake: "Document" }, { fake: "Response" } ] ) );
				spyOn( context.documents, "addMember" )
					.and.returnValue( Promise.resolve( null ) );

				const newRole:Roles.NewRole = { name: "New Role" };
				roles
					.createChild( "parent-role/", newRole )
					.then( ( [ , response ] ) => {
						expect( response as any ).toEqual( { fake: "Response" } );

						done();
					} )
					.catch( done.fail );
			} );

		} );

		describe( method( INSTANCE, "get" ), ():void => {

			it( hasSignature(
				[ "T extends object" ],
				"Retrieves a role from the current context.", [
					{ name: "roleURI", type: "string", description: "The URI of the role to retrieve." },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true },
					{ name: "queryBuilderFn", type: "( queryBuilder:Carbon.SPARQL.QueryDocument.QueryDocumentBuilder.Class ) => Carbon.SPARQL.QueryDocument.QueryDocumentBuilder.Class", optional: true, description: "Function that receives a the builder that helps you to construct the retrieval query.\nThe same builder must be returned." },
				],
				{ type: "Promise<[ T & Carbon.Auth.PersistedRole.Class, Carbon.HTTP.Response.Class ]>" }
			), ():void => {} );

			it( hasSignature(
				[ "T extends object" ],
				"Retrieves a role from the current context.", [
					{ name: "roleURI", type: "string", description: "The URI of the role to retrieve." },
					{ name: "queryBuilderFn", type: "( queryBuilder:Carbon.SPARQL.QueryDocument.QueryDocumentBuilder.Class ) => Carbon.SPARQL.QueryDocument.QueryDocumentBuilder.Class", optional: true, description: "Function that receives a the builder that helps you to construct the retrieval query.\nThe same builder must be returned." },
				],
				{ type: "Promise<[ T & Carbon.Auth.PersistedRole.Class, Carbon.HTTP.Response.Class ]>" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( Roles.Class.prototype.get ).toBeDefined();
				expect( Roles.Class.prototype.get ).toEqual( jasmine.any( Function ) );
			} );


			it( "should error when not `system.security.roles.container` setting", ( done:DoneFn ):void => {
				context.deleteSetting( "system.security.roles.container" );

				roles
					.get( "a-role/" )
					.then( () => {
						done.fail( "Should not resolve" );
					} )
					.catch( ( error ) => {
						expect( () => { throw error; } ).toThrowError( Errors.IllegalStateError, `The "system.security.roles.container" setting hasn't been defined.` );
						done();
					} )
				;
			} );

			it( "should error when incorrect role URI", ( done:DoneFn ):void => {
				roles
					.get( "https://example.com/not-a-role/" )
					.then( () => {
						done.fail( "Should not resolve" );
					} )
					.catch( ( error ) => {
						expect( () => { throw error; } ).toThrowError( Errors.IllegalArgumentError, `The URI "https://example.com/not-a-role/" isn't a valid role URI.` );
						done();
					} )
				;
			} );


			it( "should call documents.get", ( done:DoneFn ):void => {
				const spy:jasmine.Spy = spyOn( context.documents, "get" )
					.and.returnValue( Promise.reject( { fake: "Error" } ) );

				roles
					.get( "a-role/" )
					.then( () => {
						done.fail( "Should not resolve" );
					} )
					.catch( () => {
						expect( spy ).toHaveBeenCalled();

						done();
					} )
				;
			} );

			it( "should resolve the role URI", ( done:DoneFn ):void => {
				const spy:jasmine.Spy = spyOn( context.documents, "get" )
					.and.returnValue( Promise.reject( null ) );

				roles
					.get( "a-role/" )
					.then( () => {
						done.fail( "Should not resolve" );
					} )
					.catch( () => {
						expect( spy.calls.mostRecent().args[ 0 ] ).toEqual( "https://example.com/.system/security/roles/a-role/" );

						done();
					} )
				;
			} );

			it( "should pass on the options", ( done:DoneFn ):void => {
				const spy:jasmine.Spy = spyOn( context.documents, "get" )
					.and.returnValue( Promise.reject( null ) );

				roles
					.get( "a-role/", { timeout: 5050 } )
					.then( () => {
						done.fail( "Should not resolve" );
					} )
					.catch( () => {
						expect( spy.calls.mostRecent().args[ 1 ] ).toEqual( { timeout: 5050 } );

						done();
					} )
				;
			} );

			it( "should pass on the query builder", ( done:DoneFn ):void => {
				const spy:jasmine.Spy = spyOn( context.documents, "get" )
					.and.returnValue( Promise.reject( null ) );

				roles
					.get( "a-role/", _ => _ )
					.then( () => {
						done.fail( "Should not resolve" );
					} )
					.catch( () => {
						expect( spy.calls.mostRecent().args[ 1 ] ).toEqual( jasmine.any( Function ) );

						done();
					} )
				;
			} );

			it( "should pass int he options and query builder", ( done:DoneFn ):void => {
				const spy:jasmine.Spy = spyOn( context.documents, "get" )
					.and.returnValue( Promise.reject( null ) );

				roles
					.get( "a-role/", { timeout: 5050 }, _ => _ )
					.then( () => {
						done.fail( "Should not resolve" );
					} )
					.catch( () => {
						expect( spy.calls.mostRecent().args[ 1 ] ).toEqual( { timeout: 5050 } );
						expect( spy.calls.mostRecent().args[ 2 ] ).toEqual( jasmine.any( Function ) );

						done();
					} )
				;
			} );

			it( "should retrieve the role", ( done:DoneFn ):void => {
				spyOn( context.documents, "get" )
					.and.returnValue( Promise.resolve( [ { fake: "Role" }, null ] ) );

				roles
					.get( "a-role/" )
					.then( ( [ role ] ) => {
						expect( role as any ).toEqual( { fake: "Role" } );

						done();
					} )
					.catch( done.fail )
				;
			} );

			it( "should retrieve the response", ( done:DoneFn ):void => {
				spyOn( context.documents, "get" )
					.and.returnValue( Promise.resolve( [ null, { fake: "Response" } ] ) );

				roles
					.get( "a-role/" )
					.then( ( [ , response ] ) => {
						expect( response as any ).toEqual( { fake: "Response" } );

						done();
					} )
					.catch( done.fail )
				;
			} );

		} );

		describe( method( INSTANCE, "getUsers" ), ():void => {

			it( hasSignature(
				[ "T extends object" ],
				"Retrieves an array of resolved pointers for all the users of the specified role.",
				[
					{ name: "roleURI", type: "string", description: "The URI of the role to look for its users." },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for the request." },
					{ name: "queryBuilderFn", type: "( queryBuilder:Carbon.SPARQL.QueryDocument.QueryDocumentsBuilder.Class ) => Carbon.SPARQL.QueryDocument.QueryDocumentsBuilder.Class", optional: true, description: "Function that receives a the builder that helps you to construct the users retrieval query.\nThe same builder must be returned." },
				],
				{ type: "Promise<[ (T & Carbon.Auth.PersistedUser.Class)[], Carbon.HTTP.Response.Class ]>" }
			), ():void => {} );

			it( hasSignature(
				[ "T extends object" ],
				"Retrieves an array of resolved pointers for all the users of the specified role.",
				[
					{ name: "roleURI", type: "string", description: "The URI of the role to look for its users." },
					{ name: "queryBuilderFn", type: "( queryBuilder:Carbon.SPARQL.QueryDocument.QueryDocumentsBuilder.Class ) => Carbon.SPARQL.QueryDocument.QueryDocumentsBuilder.Class", optional: true, description: "Function that receives a the builder that helps you to construct the users retrieval query.\nThe same builder must be returned." },
				],
				{ type: "Promise<[ (T & Carbon.Auth.PersistedUser.Class)[], Carbon.HTTP.Response.Class ]>" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( Roles.Class.prototype.getUsers ).toBeDefined();
				expect( Roles.Class.prototype.getUsers ).toEqual( jasmine.any( Function ) );
			} );


			it( "should error when not `system.security.roles.container` setting", ( done:DoneFn ):void => {
				context.deleteSetting( "system.security.roles.container" );

				roles
					.getUsers( "a-role/" )
					.then( () => {
						done.fail( "Should not resolve" );
					} )
					.catch( ( error ) => {
						expect( () => { throw error; } ).toThrowError( Errors.IllegalStateError, `The "system.security.roles.container" setting hasn't been defined.` );
						done();
					} )
				;
			} );

			it( "should error when incorrect role URI", ( done:DoneFn ):void => {
				roles
					.getUsers( "https://example.com/not-a-role/" )
					.then( () => {
						done.fail( "Should not resolve" );
					} )
					.catch( ( error ) => {
						expect( () => { throw error; } ).toThrowError( Errors.IllegalArgumentError, `The URI "https://example.com/not-a-role/" isn't a valid role URI.` );
						done();
					} )
				;
			} );


			it( "should obtain the users' access point", ( done:DoneFn ):void => {
				const spy:jasmine.Spy = spyOn( context.documents, "executeSELECTQuery" )
					.and.returnValue( Promise.reject( { fake: "Error" } ) );

				roles
					.getUsers( "a-role/" )
					.then( () => {
						done.fail( "Should not resolve" );
					} )
					.catch( () => {
						expect( spy ).toHaveBeenCalledWith( "https://example.com/.system/security/roles/a-role/", jasmine.any( String ) );

						done();
					} )
				;
			} );

			it( "should get member from users' access point", ( done:DoneFn ):void => {
				spyOn( context.documents, "executeSELECTQuery" )
					.and.returnValue( Promise.resolve( [
					{
						bindings: [ {
							accessPoint: context.documents.getPointer( ".system/security/roles/a-role/users/" ),
						} ],
					},
					null,
				] ) );
				const spy:jasmine.Spy = spyOn( context.documents, "getMembers" )
					.and.returnValue( Promise.reject( { fake: "Error" } ) );

				roles
					.getUsers( "a-role/" )
					.then( () => {
						done.fail( "Should not resolve" );
					} )
					.catch( () => {
						expect( spy ).toHaveBeenCalledWith( "https://example.com/.system/security/roles/a-role/users/", void 0, void 0 );

						done();
					} )
				;
			} );

			it( "should retrieve the members", ( done:DoneFn ):void => {
				spyOn( context.documents, "executeSELECTQuery" )
					.and.returnValue( Promise.resolve( [
					{
						bindings: [ {
							accessPoint: context.documents.getPointer( ".system/security/roles/a-role/users/" ),
						} ],
					},
					null,
				] ) );
				spyOn( context.documents, "getMembers" )
					.and.returnValue( Promise.resolve( [ [ { fake: "Member" } ] ] ) );

				roles
					.getUsers( "a-role/" )
					.then( ( [ members ] ) => {
						expect( members ).toEqual( [
							{ fake: "Member" } as any,
						] );

						done();
					} )
					.catch( done.fail )
				;
			} );

			it( "should retrieve the response", ( done:DoneFn ):void => {
				spyOn( context.documents, "executeSELECTQuery" )
					.and.returnValue( Promise.resolve( [
					{
						bindings: [ {
							accessPoint: context.documents.getPointer( ".system/security/roles/a-role/users/" ),
						} ],
					},
					null,
				] ) );
				spyOn( context.documents, "getMembers" )
					.and.returnValue( Promise.resolve( [ , { fake: "Response" } ] ) );

				roles
					.getUsers( "a-role/" )
					.then( ( [ , response ] ) => {
						expect( response as any ).toEqual( { fake: "Response" } );

						done();
					} )
					.catch( done.fail )
				;
			} );

		} );

		describe( method( INSTANCE, "addUser" ), ():void => {

			it( hasSignature(
				"Makes a relation in the role specified towards the user provided.", [
					{ name: "roleURI", type: "string", description: "The URI of the role where to add the user." },
					{ name: "user", type: "string | Carbon.Pointer.Class", description: "The user that wants to add to the role." },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true },
				],
				{ type: "Promise<Carbon.HTTP.Response.Class>" }
			), ():void => {} );


			it( "should exists", ():void => {
				expect( Roles.Class.prototype.addUser ).toBeDefined();
				expect( Roles.Class.prototype.addUser ).toEqual( jasmine.any( Function ) );
			} );


			it( "should error when not `system.security.roles.container` setting", ( done:DoneFn ):void => {
				context.deleteSetting( "system.security.roles.container" );

				roles
					.addUser( "a-role/", "users/a-user/" )
					.then( () => {
						done.fail( "Should not resolve" );
					} )
					.catch( ( error ) => {
						expect( () => { throw error; } ).toThrowError( Errors.IllegalStateError, `The "system.security.roles.container" setting hasn't been defined.` );
						done();
					} )
				;
			} );

			it( "should error when incorrect role URI", ( done:DoneFn ):void => {
				roles
					.addUser( "https://example.com/not-a-role/", "users/a-user/" )
					.then( () => {
						done.fail( "Should not resolve" );
					} )
					.catch( ( error ) => {
						expect( () => { throw error; } ).toThrowError( Errors.IllegalArgumentError, `The URI "https://example.com/not-a-role/" isn't a valid role URI.` );
						done();
					} )
				;
			} );


			it( "should obtain the users' access point", ( done:DoneFn ):void => {
				const spy:jasmine.Spy = spyOn( context.documents, "executeSELECTQuery" )
					.and.returnValue( Promise.reject( { fake: "Error" } ) );

				roles
					.addUser( "a-role/", "users/a-user/" )
					.then( () => {
						done.fail( "Should not resolve" );
					} )
					.catch( () => {
						expect( spy ).toHaveBeenCalledWith( "https://example.com/.system/security/roles/a-role/", jasmine.any( String ) );

						done();
					} )
				;
			} );

			it( "should add members in users' access point", ( done:DoneFn ):void => {
				spyOn( context.documents, "executeSELECTQuery" )
					.and.returnValue( Promise.resolve( [
					{
						bindings: [ {
							accessPoint: context.documents.getPointer( ".system/security/roles/a-role/users/" ),
						} ],
					},
					null,
				] ) );
				const spy:jasmine.Spy = spyOn( context.documents, "addMembers" )
					.and.returnValue( Promise.reject( { fake: "Error" } ) );

				roles
					.addUser( "a-role/", "users/a-user/" )
					.then( () => {
						done.fail( "Should not resolve" );
					} )
					.catch( () => {
						expect( spy ).toHaveBeenCalledWith( "https://example.com/.system/security/roles/a-role/users/", [ "users/a-user/" ], void 0 );

						done();
					} )
				;
			} );

		} );

		describe( method( INSTANCE, "addUsers" ), ():void => {

			it( hasSignature(
				"Makes a relation in the role specified towards the users specified.", [
					{ name: "roleURI", type: "string", description: "The URI of the role where to add users." },
					{ name: "users", type: "(string | Carbon.Pointer.Class)[]", description: "An array with strings or Pointers that refers to the users that wants to add to the role." },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true },
				],
				{ type: "Promise<Carbon.HTTP.Response.Class>" }
			), ():void => {} );


			it( "should exists", ():void => {
				expect( Roles.Class.prototype.addUsers ).toBeDefined();
				expect( Roles.Class.prototype.addUsers ).toEqual( jasmine.any( Function ) );
			} );


			it( "should error when not `system.security.roles.container` setting", ( done:DoneFn ):void => {
				context.deleteSetting( "system.security.roles.container" );

				roles
					.addUsers( "a-role/", [ "users/a-user/" ] )
					.then( () => {
						done.fail( "Should not resolve" );
					} )
					.catch( ( error ) => {
						expect( () => { throw error; } ).toThrowError( Errors.IllegalStateError, `The "system.security.roles.container" setting hasn't been defined.` );
						done();
					} )
				;
			} );

			it( "should error when incorrect role URI", ( done:DoneFn ):void => {
				roles
					.addUsers( "https://example.com/not-a-role/", [ "users/a-user/" ] )
					.then( () => {
						done.fail( "Should not resolve" );
					} )
					.catch( ( error ) => {
						expect( () => { throw error; } ).toThrowError( Errors.IllegalArgumentError, `The URI "https://example.com/not-a-role/" isn't a valid role URI.` );
						done();
					} )
				;
			} );


			it( "should obtain the users' access point", ( done:DoneFn ):void => {
				const spy:jasmine.Spy = spyOn( context.documents, "executeSELECTQuery" )
					.and.returnValue( Promise.reject( { fake: "Error" } ) );

				roles
					.addUsers( "a-role/", [ "users/a-user/" ] )
					.then( () => {
						done.fail( "Should not resolve" );
					} )
					.catch( () => {
						expect( spy ).toHaveBeenCalledWith( "https://example.com/.system/security/roles/a-role/", jasmine.any( String ) );

						done();
					} )
				;
			} );

			it( "should add members in users' access point", ( done:DoneFn ):void => {
				spyOn( context.documents, "executeSELECTQuery" )
					.and.returnValue( Promise.resolve( [
					{
						bindings: [ {
							accessPoint: context.documents.getPointer( ".system/security/roles/a-role/users/" ),
						} ],
					},
					null,
				] ) );
				const spy:jasmine.Spy = spyOn( context.documents, "addMembers" )
					.and.returnValue( Promise.reject( { fake: "Error" } ) );

				roles
					.addUsers( "a-role/", [ "users/a-user/" ] )
					.then( () => {
						done.fail( "Should not resolve" );
					} )
					.catch( () => {
						expect( spy ).toHaveBeenCalledWith( "https://example.com/.system/security/roles/a-role/users/", [ "users/a-user/" ], void 0 );

						done();
					} )
				;
			} );

		} );

		describe( method( INSTANCE, "removeUser" ), ():void => {

			it( hasSignature(
				"Removes the relation in the role specified towards the user provided.", [
					{ name: "roleURI", type: "string", description: "The URI of the role from where to remove the user." },
					{ name: "user", type: "string | Carbon.Pointer.Class", description: "The user that wants to be removed from the role." },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true },
				],
				{ type: "Promise<Carbon.HTTP.Response.Class>" }
			), ():void => {} );


			it( "should exists", ():void => {
				expect( Roles.Class.prototype.removeUser ).toBeDefined();
				expect( Roles.Class.prototype.removeUser ).toEqual( jasmine.any( Function ) );
			} );


			it( "should error when not `system.security.roles.container` setting", ( done:DoneFn ):void => {
				context.deleteSetting( "system.security.roles.container" );

				roles
					.removeUser( "a-role/", "users/a-user/" )
					.then( () => {
						done.fail( "Should not resolve" );
					} )
					.catch( ( error ) => {
						expect( () => { throw error; } ).toThrowError( Errors.IllegalStateError, `The "system.security.roles.container" setting hasn't been defined.` );
						done();
					} )
				;
			} );

			it( "should error when incorrect role URI", ( done:DoneFn ):void => {
				roles
					.removeUser( "https://example.com/not-a-role/", "users/a-user/" )
					.then( () => {
						done.fail( "Should not resolve" );
					} )
					.catch( ( error ) => {
						expect( () => { throw error; } ).toThrowError( Errors.IllegalArgumentError, `The URI "https://example.com/not-a-role/" isn't a valid role URI.` );
						done();
					} )
				;
			} );


			it( "should obtain the users' access point", ( done:DoneFn ):void => {
				const spy:jasmine.Spy = spyOn( context.documents, "executeSELECTQuery" )
					.and.returnValue( Promise.reject( { fake: "Error" } ) );

				roles
					.removeUser( "a-role/", "users/a-user/" )
					.then( () => {
						done.fail( "Should not resolve" );
					} )
					.catch( () => {
						expect( spy ).toHaveBeenCalledWith( "https://example.com/.system/security/roles/a-role/", jasmine.any( String ) );

						done();
					} )
				;
			} );

			it( "should remove members in users' access point", ( done:DoneFn ):void => {
				spyOn( context.documents, "executeSELECTQuery" )
					.and.returnValue( Promise.resolve( [
					{
						bindings: [ {
							accessPoint: context.documents.getPointer( ".system/security/roles/a-role/users/" ),
						} ],
					},
					null,
				] ) );
				const spy:jasmine.Spy = spyOn( context.documents, "removeMembers" )
					.and.returnValue( Promise.reject( null ) );

				roles
					.removeUser( "a-role/", "users/a-user/" )
					.then( () => {
						done.fail( "Should not resolve" );
					} )
					.catch( ( error ) => {
						if( error ) done.fail( error );

						expect( spy ).toHaveBeenCalledWith( "https://example.com/.system/security/roles/a-role/users/", [ "users/a-user/" ], void 0 );

						done();
					} )
				;
			} );

		} );

		describe( method( INSTANCE, "removeUsers" ), ():void => {

			it( hasSignature(
				"Remove the relation in the role specified towards the users specified.", [
					{ name: "roleURI", type: "string", description: "The URI of the role from where to remove the users." },
					{ name: "users", type: "(string | Carbon.Pointer.Class)[]", description: "An array with strings or Pointers that refers to the users to be removed from the role." },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true },
				],
				{ type: "Promise<Carbon.HTTP.Response.Class>" }
			), ():void => {} );


			it( "should exists", ():void => {
				expect( Roles.Class.prototype.removeUsers ).toBeDefined();
				expect( Roles.Class.prototype.removeUsers ).toEqual( jasmine.any( Function ) );
			} );


			it( "should error when not `system.security.roles.container` setting", ( done:DoneFn ):void => {
				context.deleteSetting( "system.security.roles.container" );

				roles
					.removeUsers( "a-role/", [ "users/a-user/" ] )
					.then( () => {
						done.fail( "Should not resolve" );
					} )
					.catch( ( error ) => {
						expect( () => { throw error; } ).toThrowError( Errors.IllegalStateError, `The "system.security.roles.container" setting hasn't been defined.` );
						done();
					} )
				;
			} );

			it( "should error when incorrect role URI", ( done:DoneFn ):void => {
				roles
					.removeUsers( "https://example.com/not-a-role/", [ "users/a-user/" ] )
					.then( () => {
						done.fail( "Should not resolve" );
					} )
					.catch( ( error ) => {
						expect( () => { throw error; } ).toThrowError( Errors.IllegalArgumentError, `The URI "https://example.com/not-a-role/" isn't a valid role URI.` );
						done();
					} )
				;
			} );


			it( "should obtain the users' access point", ( done:DoneFn ):void => {
				const spy:jasmine.Spy = spyOn( context.documents, "executeSELECTQuery" )
					.and.returnValue( Promise.reject( { fake: "Error" } ) );

				roles
					.removeUsers( "a-role/", [ "users/a-user/" ] )
					.then( () => {
						done.fail( "Should not resolve" );
					} )
					.catch( () => {
						expect( spy ).toHaveBeenCalledWith( "https://example.com/.system/security/roles/a-role/", jasmine.any( String ) );

						done();
					} )
				;
			} );

			it( "should add members in users' access point", ( done:DoneFn ):void => {
				spyOn( context.documents, "executeSELECTQuery" )
					.and.returnValue( Promise.resolve( [
					{
						bindings: [ {
							accessPoint: context.documents.getPointer( ".system/security/roles/a-role/users/" ),
						} ],
					},
					null,
				] ) );
				const spy:jasmine.Spy = spyOn( context.documents, "removeMembers" )
					.and.returnValue( Promise.reject( { fake: "Error" } ) );

				roles
					.removeUsers( "a-role/", [ "users/a-user/" ] )
					.then( () => {
						done.fail( "Should not resolve" );
					} )
					.catch( () => {
						expect( spy ).toHaveBeenCalledWith( "https://example.com/.system/security/roles/a-role/users/", [ "users/a-user/" ], void 0 );

						done();
					} )
				;
			} );
		} );

	} );

	it( hasDefaultExport( "Carbon.Auth.Roles.Class" ), ():void => {
		expect( Roles.default ).toBeDefined();
		expect( Roles.default ).toBe( Roles.Class );
	} );

} );
