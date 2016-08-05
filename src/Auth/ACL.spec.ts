import {module, isDefined, clazz, hasProperty, STATIC, hasMethod, decoratedObject, INSTANCE, method, hasSignature} from "../test/JasmineExtender";

import * as ACE from "./ACE";
import Documents from "./../Documents";
import Fragment from "./../Fragment";
import * as NS from "./../NS";
import * as PersistedDocument from "./../PersistedDocument";
import * as Pointer from "./../Pointer";
import * as Utils from "./../Utils";

import * as ACL from "./ACL";

describe( module( "Carbon/Auth/ACL" ), ():void => {

	it( isDefined(), ():void => {
		expect( ACL ).toBeDefined();
		expect( Utils.isObject( ACL ) ).toBe( true );
	} );

	it( hasProperty(
		STATIC,
		"RDF_Class",
		"string"
	), ():void => {
		expect( ACL.RDF_CLASS ).toBeDefined();
		expect( Utils.isString( ACL.RDF_CLASS ) ).toBe( true );

		expect( ACL.RDF_CLASS ).toBe( NS.CS.Class.AccessControlList );
	} );

	it( hasProperty(
		STATIC,
		"SCHEMA",
		"Carbon.ObjectSchema.Class"
	), ():void => {
		expect( ACL.SCHEMA ).toBeDefined();
		expect( Utils.isObject( ACL.SCHEMA ) ).toBe( true );

		expect( Utils.hasProperty( ACL.SCHEMA, "entries" ) ).toBe( true );
		expect( ACL.SCHEMA[ "entries" ] ).toEqual( {
			"@id": NS.CS.Predicate.accessControlEntry,
			"@type": "@id",
			"@container": "@set",
		} );

		expect( Utils.hasProperty( ACL.SCHEMA, "accessTo" ) ).toBe( true );
		expect( ACL.SCHEMA[ "accessTo" ] ).toEqual( {
			"@id": NS.CS.Predicate.accessTo,
			"@type": "@id",
		} );

		expect( Utils.hasProperty( ACL.SCHEMA, "inheritableEntries" ) ).toBe( true );
		expect( ACL.SCHEMA[ "inheritableEntries" ] ).toEqual( {
			"@id": NS.CS.Predicate.inheritableEntry,
			"@type": "@id",
			"@container": "@set",
		} );
	} );

	describe( clazz( "Carbon.Auth.ACL.Factory", "Factory class for `Carbon.Auth.ACL.Class` objects." ), ():void => {

		it( isDefined(), ():void => {
			expect( ACL.Factory ).toBeDefined();
			expect( Utils.isFunction( ACL.Factory ) ).toBe( true );
		} );

		it( hasMethod(
			STATIC,
			"hasClassProperties",
			"Return true if the object provided has the properties and methods of a `Carbon.Auth.ACL.Class` object.", [
				{name: "object", type: "Object", description: "The object to analise."},
			],
			{type: "boolean"}
		), ():void => {
			expect( ACL.Factory.hasClassProperties ).toBeDefined();
			expect( Utils.isFunction( ACL.Factory.hasClassProperties ) ).toBe( true );

			let object:any;
			expect( ACL.Factory.hasClassProperties( object ) ).toBe( false );

			object = {
				entries: null,
				accessTo: null,
				inheritableEntries: null,
				grant: ():void => {},
				deny: ():void => {},
				configureChildInheritance: ():void => {},
				grants: ():void => {},
				denies: ():void => {},
				getChildInheritance: ():void => {},
				remove: ():void => {},
				removeChildInheritance: ():void => {},
			};
			expect( ACL.Factory.hasClassProperties( object ) ).toBe( true );

			delete object.accessTo;
			expect( ACL.Factory.hasClassProperties( object ) ).toBe( false );
			object.accessTo = null;

			delete object.entries;
			expect( ACL.Factory.hasClassProperties( object ) ).toBe( true );
			object.entries = null;

			delete object.inheritableEntries;
			expect( ACL.Factory.hasClassProperties( object ) ).toBe( true );
			object.inheritableEntries = null;

			delete object.grant;
			expect( ACL.Factory.hasClassProperties( object ) ).toBe( false );
			object.grant = ():void => {};

			delete object.deny;
			expect( ACL.Factory.hasClassProperties( object ) ).toBe( false );
			object.deny = ():void => {};

			delete object.configureChildInheritance;
			expect( ACL.Factory.hasClassProperties( object ) ).toBe( false );
			object.configureChildInheritance = ():void => {};

			delete object.grants;
			expect( ACL.Factory.hasClassProperties( object ) ).toBe( false );
			object.grants = ():void => {};

			delete object.denies;
			expect( ACL.Factory.hasClassProperties( object ) ).toBe( false );
			object.denies = ():void => {};

			delete object.getChildInheritance;
			expect( ACL.Factory.hasClassProperties( object ) ).toBe( false );
			object.getChildInheritance = ():void => {};

			delete object.remove;
			expect( ACL.Factory.hasClassProperties( object ) ).toBe( false );
			object.remove = ():void => {};

			delete object.removeChildInheritance;
			expect( ACL.Factory.hasClassProperties( object ) ).toBe( false );
			object.removeChildInheritance = ():void => {};
		} );

		it( hasMethod(
			STATIC,
			"decorate",
			[ "T extends Object" ],
			"Decorate the object with the methods o a `Carbon.Auth.ACL.Class` object.", [
				{name: "object", type: "T", description: "The object to decorate."},
			],
			{type: "T & Carbon.Auth.ACl.Class"}
		), ():void => {
			expect( ACL.Factory.decorate ).toBeDefined();
			expect( Utils.isFunction( ACL.Factory.decorate ) ).toBe( true );

			let document:PersistedDocument.Class = PersistedDocument.Factory.create( "http://example.com/resource/~acl/", new Documents() );
			let acl:ACL.Class = ACL.Factory.decorate( document );
			acl.accessTo = acl.getPointer( "http://example.com/resource/" );

			expect( ACL.Factory.hasClassProperties( acl ) );
		} );

		describe( decoratedObject( "Object decorated for the Carbon.Auth.ACL.Factory.decorate method.", [ "Carbon.Auth.ACL.Class" ] ), ():void => {
			let acl:ACL.Class;

			function getACEsOf( subject:string, fragments:Fragment[] ):ACE.Class[] {
				return <ACE.Class[]> fragments.filter( fragment => {
					let ids:string[] = Pointer.Util.getIDs( (<ACE.Class> fragment).subjects );
					return ids.indexOf( subject ) !== - 1;
				} );
			}

			beforeEach( ():void => {
				let document:PersistedDocument.Class = PersistedDocument.Factory.create( "http://example.com/resource/~acl/", new Documents() );
				acl = ACL.Factory.decorate( document );
				acl.accessTo = acl.getPointer( "http://example.com/resource/" );
			} );

			it( isDefined(), ():void => {
				expect( acl ).toBeTruthy();
				expect( ACL.Factory.hasClassProperties( acl ) ).toBe( true );
			} );

			describe( method( INSTANCE, "grant" ), ():void => {

				it( isDefined(), ():void => {
					expect( acl.grant ).toBeDefined();
					expect( Utils.isFunction( acl.grant ) ).toBe( true );
				} );

				it( hasSignature(
					"Grant the permission specified to the subject provided for the document related to the ACL.", [
						{name: "subject", type: "string | Carbon.Pointer.Class", description: "The subject which will be assigned the permission specified."},
						{name: "subjectClass", type: "string | Carbon.Pointer.Class", description: "The type of subject provided."},
						{name: "permission", type: "string | Carbon.Pointer.Class", description: "The permission that will be granted to the subject specified."},
					]
				), ():void => {
					let fragments:Fragment[];
					let aces:ACE.Class[];
					let ace:ACE.Class;

					acl.grant( "http://example.com/ns#Subject", "http://example.com/ns#SubjetClass", "http://example.com/ns#READ" );
					fragments = acl.getFragments();
					expect( fragments.length ).toBe( 1 );
					aces = getACEsOf( "http://example.com/ns#Subject", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( true );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 1 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#READ" );
					expect( acl.entries ).toContain( ace );

					acl.grant( acl.getPointer( "http://example.com/ns#Subject" ), "http://example.com/ns#SubjetClass", "http://example.com/ns#WRITE" );
					fragments = acl.getFragments();
					expect( fragments.length ).toBe( 1 );
					aces = getACEsOf( "http://example.com/ns#Subject", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( true );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 2 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#WRITE" );
					expect( acl.entries ).toContain( ace );

					acl.grant( acl.getPointer( "http://example.com/ns#Subject-2" ), acl.getPointer( "http://example.com/ns#SubjetClass" ), "http://example.com/ns#UPDATE" );
					fragments = acl.getFragments();
					expect( fragments.length ).toBe( 2 );
					aces = getACEsOf( "http://example.com/ns#Subject-2", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject-2" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( true );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 1 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#UPDATE" );
					expect( acl.entries ).toContain( ace );

					acl.grant( acl.getPointer( "http://example.com/ns#Subject-2" ), acl.getPointer( "http://example.com/ns#SubjetClass" ), acl.getPointer( "http://example.com/ns#DELETE" ) );
					fragments = acl.getFragments();
					expect( fragments.length ).toBe( 2 );
					aces = getACEsOf( "http://example.com/ns#Subject-2", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject-2" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( true );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 2 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#DELETE" );
					expect( acl.entries ).toContain( ace );
				} );

				it( hasSignature(
					"Grant several permissions to the subject provided for the document related to the ACL.", [
						{name: "subject", type: "string | Carbon.Pointer.Class", description: "The subject which will be assigned the permission specified."},
						{name: "subjectClass", type: "string | Carbon.Pointer.Class", description: "The type of subject provided."},
						{name: "permissions", type: "(string | Carbon.Pointer.Class)[]", description: "The permissions that will be granted to the subject specified."},
					]
				), ():void => {
					let fragments:Fragment[];
					let aces:ACE.Class[];
					let ace:ACE.Class;

					acl.grant( "http://example.com/ns#Subject", "http://example.com/ns#SubjetClass", [ "http://example.com/ns#READ" ] );
					fragments = acl.getFragments();
					expect( fragments.length ).toBe( 1 );
					aces = getACEsOf( "http://example.com/ns#Subject", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( true );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 1 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#READ" );
					expect( acl.entries ).toContain( ace );

					acl.grant( acl.getPointer( "http://example.com/ns#Subject" ), "http://example.com/ns#SubjetClass", [ "http://example.com/ns#WRITE", "http://example.com/ns#UPDATE" ] );
					fragments = acl.getFragments();
					expect( fragments.length ).toBe( 1 );
					aces = getACEsOf( "http://example.com/ns#Subject", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( true );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 3 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#READ" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#WRITE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#UPDATE" );
					expect( acl.entries ).toContain( ace );

					acl.grant( acl.getPointer( "http://example.com/ns#Subject-2" ), acl.getPointer( "http://example.com/ns#SubjetClass" ), [ "http://example.com/ns#UPDATE" ] );
					fragments = acl.getFragments();
					expect( fragments.length ).toBe( 2 );
					aces = getACEsOf( "http://example.com/ns#Subject-2", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject-2" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( true );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 1 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#UPDATE" );
					expect( acl.entries ).toContain( ace );

					acl.grant( acl.getPointer( "http://example.com/ns#Subject-2" ), acl.getPointer( "http://example.com/ns#SubjetClass" ), [ acl.getPointer( "http://example.com/ns#DELETE" ) ] );
					fragments = acl.getFragments();
					expect( fragments.length ).toBe( 2 );
					aces = getACEsOf( "http://example.com/ns#Subject-2", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject-2" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( true );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 2 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#UPDATE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#DELETE" );
					expect( acl.entries ).toContain( ace );

					acl.grant( acl.getPointer( "http://example.com/ns#Subject-2" ), acl.getPointer( "http://example.com/ns#SubjetClass" ), [ "http://example.com/ns#UPDATE", acl.getPointer( "http://example.com/ns#DELETE" ), "http://example.com/ns#WRITE" ] );
					fragments = acl.getFragments();
					expect( fragments.length ).toBe( 2 );
					aces = getACEsOf( "http://example.com/ns#Subject-2", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject-2" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( true );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 3 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#UPDATE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#DELETE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#WRITE" );
					expect( acl.entries ).toContain( ace );
				} );

				it( hasSignature(
					"Grant the permission specified to the every subject provided for the document related to the ACL.", [
						{name: "subjects", type: "(string | Carbon.Pointer.Class)[]", description: "The subjects which will be assigned the every permissions specified."},
						{name: "subjectClass", type: "string | Carbon.Pointer.Class", description: "The type of subjects provided."},
						{name: "permission", type: "string | Carbon.Pointer.Class", description: "The permission that will be granted to the every subject."},
					]
				), ():void => {
					let fragments:Fragment[];
					let aces:ACE.Class[];
					let ace:ACE.Class;

					acl.grant( [ "http://example.com/ns#Subject" ], "http://example.com/ns#SubjetClass", "http://example.com/ns#READ" );
					fragments = acl.getFragments();
					expect( fragments.length ).toBe( 1 );
					aces = getACEsOf( "http://example.com/ns#Subject", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( true );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 1 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#READ" );
					expect( acl.entries ).toContain( ace );

					acl.grant( [ acl.getPointer( "http://example.com/ns#Subject" ) ], "http://example.com/ns#SubjetClass", "http://example.com/ns#WRITE" );
					fragments = acl.getFragments();
					expect( fragments.length ).toBe( 1 );
					aces = getACEsOf( "http://example.com/ns#Subject", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( true );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 2 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#READ" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#WRITE" );
					expect( acl.entries ).toContain( ace );

					acl.grant( [ acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#Subject-2" ) ], acl.getPointer( "http://example.com/ns#SubjetClass" ), "http://example.com/ns#UPDATE" );
					fragments = acl.getFragments();
					expect( fragments.length ).toBe( 2 );
					aces = getACEsOf( "http://example.com/ns#Subject-2", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject-2" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( true );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 1 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#UPDATE" );
					expect( acl.entries ).toContain( ace );
					aces = getACEsOf( "http://example.com/ns#Subject", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( true );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 3 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#READ" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#WRITE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#UPDATE" );
					expect( acl.entries ).toContain( ace );

					acl.grant( [ acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#Subject-2" ), acl.getPointer( "http://example.com/ns#Subject-3" ) ], acl.getPointer( "http://example.com/ns#SubjetClass" ), acl.getPointer( "http://example.com/ns#DELETE" ) );
					fragments = acl.getFragments();
					expect( fragments.length ).toBe( 3 );
					aces = getACEsOf( "http://example.com/ns#Subject", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( true );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 4 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#READ" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#WRITE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#UPDATE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#DELETE" );
					expect( acl.entries ).toContain( ace );
					aces = getACEsOf( "http://example.com/ns#Subject-2", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject-2" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( true );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 2 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#UPDATE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#DELETE" );
					expect( acl.entries ).toContain( ace );
					aces = getACEsOf( "http://example.com/ns#Subject-3", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject-3" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( true );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 1 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#DELETE" );
					expect( acl.entries ).toContain( ace );
				} );

				it( hasSignature(
					"Grant several permissions to the every subject provided for the document related to the ACL.", [
						{name: "subjects", type: "(string | Carbon.Pointer.Class)[]", description: "The subjects which will be assigned the every permissions specified."},
						{name: "subjectClass", type: "string | Carbon.Pointer.Class", description: "The type of subjects provided."},
						{name: "permissions", type: "(string | Carbon.Pointer.Class)[]", description: "The permissions that will be granted to the every subject."},
					]
				), ():void => {
					let fragments:Fragment[];
					let aces:ACE.Class[];
					let ace:ACE.Class;

					acl.grant( [ "http://example.com/ns#Subject" ], "http://example.com/ns#SubjetClass", [ "http://example.com/ns#READ" ] );
					fragments = acl.getFragments();
					expect( fragments.length ).toBe( 1 );
					aces = getACEsOf( "http://example.com/ns#Subject", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( true );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 1 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#READ" );
					expect( acl.entries ).toContain( ace );

					acl.grant( [ acl.getPointer( "http://example.com/ns#Subject" ) ], "http://example.com/ns#SubjetClass", [ "http://example.com/ns#WRITE", "http://example.com/ns#UPDATE" ] );
					fragments = acl.getFragments();
					expect( fragments.length ).toBe( 1 );
					aces = getACEsOf( "http://example.com/ns#Subject", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( true );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 3 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#READ" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#WRITE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#UPDATE" );
					expect( acl.entries ).toContain( ace );

					acl.grant( [ acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#Subject-2" ) ], acl.getPointer( "http://example.com/ns#SubjetClass" ), [ "http://example.com/ns#UPDATE" ] );
					fragments = acl.getFragments();
					expect( fragments.length ).toBe( 2 );
					aces = getACEsOf( "http://example.com/ns#Subject-2", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject-2" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( true );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 1 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#UPDATE" );
					expect( acl.entries ).toContain( ace );
					aces = getACEsOf( "http://example.com/ns#Subject", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( true );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 3 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#READ" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#WRITE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#UPDATE" );
					expect( acl.entries ).toContain( ace );

					acl.grant( [ acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#Subject-2" ) ], acl.getPointer( "http://example.com/ns#SubjetClass" ), [ acl.getPointer( "http://example.com/ns#DELETE" ) ] );
					fragments = acl.getFragments();
					expect( fragments.length ).toBe( 2 );
					aces = getACEsOf( "http://example.com/ns#Subject-2", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject-2" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( true );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 2 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#UPDATE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#DELETE" );
					expect( acl.entries ).toContain( ace );
					aces = getACEsOf( "http://example.com/ns#Subject", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( true );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 4 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#READ" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#WRITE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#UPDATE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#DELETE" );
					expect( acl.entries ).toContain( ace );

					acl.grant( [ acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#Subject-2" ), acl.getPointer( "http://example.com/ns#Subject-3" ) ], acl.getPointer( "http://example.com/ns#SubjetClass" ), [ "http://example.com/ns#UPDATE", acl.getPointer( "http://example.com/ns#CREATE" ), "http://example.com/ns#WRITE" ] );
					fragments = acl.getFragments();
					expect( fragments.length ).toBe( 3 );
					aces = getACEsOf( "http://example.com/ns#Subject", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( true );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 5 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#READ" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#WRITE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#UPDATE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#DELETE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#CREATE" );
					expect( acl.entries ).toContain( ace );
					aces = getACEsOf( "http://example.com/ns#Subject-2", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject-2" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( true );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 4 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#UPDATE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#DELETE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#WRITE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#CREATE" );
					expect( acl.entries ).toContain( ace );
					aces = getACEsOf( "http://example.com/ns#Subject-3", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject-3" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( true );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 3 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#UPDATE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#WRITE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#CREATE" );
					expect( acl.entries ).toContain( ace );


					acl.entries.forEach( forEachACE => acl._removeFragment( forEachACE.id ) );
					acl.entries = [];

					ace = ACE.Factory.createFrom(
						acl.createFragment(),
						false,
						[ acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#Subject-2" ) ],
						acl.getPointer( "http://example.com/ns#SubjetClass" ),
						[ acl.getPointer( "http://example.com/ns#CREATE" ), acl.getPointer( "http://example.com/ns#DELETE" ) ]
					);
					acl.entries.push( ace );

					ace = ACE.Factory.createFrom(
						acl.createFragment(),
						true,
						[ acl.getPointer( "http://example.com/ns#Subject-2" ), acl.getPointer( "http://example.com/ns#Subject-3" ) ],
						acl.getPointer( "http://example.com/ns#SubjetClass" ),
						[ acl.getPointer( "http://example.com/ns#READ" ), acl.getPointer( "http://example.com/ns#WRITE" ) ]
					);
					acl.entries.push( ace );

					acl.grant( [ acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#Subject-2" ), acl.getPointer( "http://example.com/ns#Subject-3" ) ], acl.getPointer( "http://example.com/ns#SubjetClass" ), [ "http://example.com/ns#UPDATE", acl.getPointer( "http://example.com/ns#CREATE" ), acl.getPointer( "http://example.com/ns#READ" ) ] );
					fragments = acl.getFragments();
					expect( fragments.length ).toBe( 5 );
					aces = getACEsOf( "http://example.com/ns#Subject", fragments );
					expect( aces.length ).toBe( 2 );
					aces.sort( ( a, b ) => a.granting ? - 1 : 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( true );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 3 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#UPDATE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#CREATE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#READ" );
					expect( acl.entries ).toContain( ace );
					ace = <ACE.Class> aces[ 1 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( false );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 1 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#DELETE" );
					expect( acl.entries ).toContain( ace );
					aces = getACEsOf( "http://example.com/ns#Subject-2", fragments );
					expect( aces.length ).toBe( 2 );
					aces.sort( ( a, b ) => a.granting ? - 1 : 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject-2" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( true );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 4 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#READ" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#WRITE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#UPDATE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#CREATE" );
					expect( acl.entries ).toContain( ace );
					ace = <ACE.Class> aces[ 1 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject-2" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( false );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 1 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#DELETE" );
					expect( acl.entries ).toContain( ace );
					aces = getACEsOf( "http://example.com/ns#Subject-3", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject-3" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( true );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 4 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#READ" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#WRITE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#UPDATE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#CREATE" );
					expect( acl.entries ).toContain( ace );

					acl.entries.forEach( forEachACE => acl._removeFragment( forEachACE.id ) );
					acl.entries = [];
					acl.inheritableEntries = [];

					ace = ACE.Factory.createFrom(
						acl.createFragment(),
						true,
						[ acl.getPointer( "http://example.com/ns#Subject" ) ],
						acl.getPointer( "http://example.com/ns#SubjetClass" ),
						[ acl.getPointer( "http://example.com/ns#READ" ), acl.getPointer( "http://example.com/ns#WRITE" ) ]
					);
					acl.entries.push( ace );
					acl.inheritableEntries.push( ace );

					expect( acl.grants( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#READ" ) ) ).toBe( true );
					expect( acl.grants( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#WRITE" ) ) ).toBe( true );
					expect( acl.grants( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#UPDATE" ) ) ).toBeNull();
					expect( acl.grants( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#CREATE" ) ) ).toBeNull();

					expect( acl.getChildInheritance( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#READ" ) ) ).toBe( true );
					expect( acl.getChildInheritance( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#WRITE" ) ) ).toBe( true );
					expect( acl.getChildInheritance( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#UPDATE" ) ) ).toBeNull();
					expect( acl.getChildInheritance( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#CREATE" ) ) ).toBeNull();

					acl.grant( [ "http://example.com/ns#Subject", "http://example.com/ns#Subject-1" ], "http://example.com/ns#SubjetClass", [ "http://example.com/ns#UPDATE", "http://example.com/ns#CREATE" ] );

					expect( acl.grants( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#READ" ) ) ).toBe( true );
					expect( acl.grants( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#WRITE" ) ) ).toBe( true );
					expect( acl.grants( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#UPDATE" ) ) ).toBe( true );
					expect( acl.grants( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#CREATE" ) ) ).toBe( true );

					expect( acl.grants( acl.getPointer( "http://example.com/ns#Subject-1" ), acl.getPointer( "http://example.com/ns#READ" ) ) ).toBeNull();
					expect( acl.grants( acl.getPointer( "http://example.com/ns#Subject-1" ), acl.getPointer( "http://example.com/ns#WRITE" ) ) ).toBeNull();
					expect( acl.grants( acl.getPointer( "http://example.com/ns#Subject-1" ), acl.getPointer( "http://example.com/ns#UPDATE" ) ) ).toBe( true );
					expect( acl.grants( acl.getPointer( "http://example.com/ns#Subject-1" ), acl.getPointer( "http://example.com/ns#CREATE" ) ) ).toBe( true );

					expect( acl.getChildInheritance( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#READ" ) ) ).toBe( true );
					expect( acl.getChildInheritance( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#WRITE" ) ) ).toBe( true );
					expect( acl.getChildInheritance( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#UPDATE" ) ) ).toBeNull();
					expect( acl.getChildInheritance( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#CREATE" ) ) ).toBeNull();
				} );

			} );

			describe( method( INSTANCE, "deny" ), ():void => {

				it( isDefined(), ():void => {
					expect( acl.deny ).toBeDefined();
					expect( Utils.isFunction( acl.deny ) ).toBe( true );
				} );

				it( hasSignature(
					"Grant the permission specified to the subject provided for the document related to the ACL.", [
						{name: "subject", type: "string | Carbon.Pointer.Class", description: "The subject which will be assigned the permission specified."},
						{name: "subjectClass", type: "string | Carbon.Pointer.Class", description: "The type of subject provided."},
						{name: "permission", type: "string | Carbon.Pointer.Class", description: "The permission that will be granted to the subject specified."},
					]
				), ():void => {
					let fragments:Fragment[];
					let aces:ACE.Class[];
					let ace:ACE.Class;

					acl.deny( "http://example.com/ns#Subject", "http://example.com/ns#SubjetClass", "http://example.com/ns#READ" );
					fragments = acl.getFragments();
					expect( fragments.length ).toBe( 1 );
					aces = getACEsOf( "http://example.com/ns#Subject", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( false );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 1 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#READ" );
					expect( acl.entries ).toContain( ace );

					acl.deny( acl.getPointer( "http://example.com/ns#Subject" ), "http://example.com/ns#SubjetClass", "http://example.com/ns#WRITE" );
					fragments = acl.getFragments();
					expect( fragments.length ).toBe( 1 );
					aces = getACEsOf( "http://example.com/ns#Subject", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( false );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 2 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#WRITE" );
					expect( acl.entries ).toContain( ace );

					acl.deny( acl.getPointer( "http://example.com/ns#Subject-2" ), acl.getPointer( "http://example.com/ns#SubjetClass" ), "http://example.com/ns#UPDATE" );
					fragments = acl.getFragments();
					expect( fragments.length ).toBe( 2 );
					aces = getACEsOf( "http://example.com/ns#Subject-2", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject-2" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( false );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 1 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#UPDATE" );
					expect( acl.entries ).toContain( ace );

					acl.deny( acl.getPointer( "http://example.com/ns#Subject-2" ), acl.getPointer( "http://example.com/ns#SubjetClass" ), acl.getPointer( "http://example.com/ns#DELETE" ) );
					fragments = acl.getFragments();
					expect( fragments.length ).toBe( 2 );
					aces = getACEsOf( "http://example.com/ns#Subject-2", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject-2" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( false );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 2 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#DELETE" );
					expect( acl.entries ).toContain( ace );
				} );

				it( hasSignature(
					"Grant several permissions to the subject provided for the document related to the ACL.", [
						{name: "subject", type: "string | Carbon.Pointer.Class", description: "The subject which will be assigned the permission specified."},
						{name: "subjectClass", type: "string | Carbon.Pointer.Class", description: "The type of subject provided."},
						{name: "permissions", type: "(string | Carbon.Pointer.Class)[]", description: "The permissions that will be granted to the subject specified."},
					]
				), ():void => {
					let fragments:Fragment[];
					let aces:ACE.Class[];
					let ace:ACE.Class;

					acl.deny( "http://example.com/ns#Subject", "http://example.com/ns#SubjetClass", [ "http://example.com/ns#READ" ] );
					fragments = acl.getFragments();
					expect( fragments.length ).toBe( 1 );
					aces = getACEsOf( "http://example.com/ns#Subject", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( false );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 1 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#READ" );
					expect( acl.entries ).toContain( ace );

					acl.deny( acl.getPointer( "http://example.com/ns#Subject" ), "http://example.com/ns#SubjetClass", [ "http://example.com/ns#WRITE", "http://example.com/ns#UPDATE" ] );
					fragments = acl.getFragments();
					expect( fragments.length ).toBe( 1 );
					aces = getACEsOf( "http://example.com/ns#Subject", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( false );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 3 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#READ" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#WRITE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#UPDATE" );
					expect( acl.entries ).toContain( ace );

					acl.deny( acl.getPointer( "http://example.com/ns#Subject-2" ), acl.getPointer( "http://example.com/ns#SubjetClass" ), [ "http://example.com/ns#UPDATE" ] );
					fragments = acl.getFragments();
					expect( fragments.length ).toBe( 2 );
					aces = getACEsOf( "http://example.com/ns#Subject-2", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject-2" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( false );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 1 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#UPDATE" );
					expect( acl.entries ).toContain( ace );

					acl.deny( acl.getPointer( "http://example.com/ns#Subject-2" ), acl.getPointer( "http://example.com/ns#SubjetClass" ), [ acl.getPointer( "http://example.com/ns#DELETE" ) ] );
					fragments = acl.getFragments();
					expect( fragments.length ).toBe( 2 );
					aces = getACEsOf( "http://example.com/ns#Subject-2", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject-2" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( false );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 2 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#UPDATE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#DELETE" );
					expect( acl.entries ).toContain( ace );

					acl.deny( acl.getPointer( "http://example.com/ns#Subject-2" ), acl.getPointer( "http://example.com/ns#SubjetClass" ), [ "http://example.com/ns#UPDATE", acl.getPointer( "http://example.com/ns#DELETE" ), "http://example.com/ns#WRITE" ] );
					fragments = acl.getFragments();
					expect( fragments.length ).toBe( 2 );
					aces = getACEsOf( "http://example.com/ns#Subject-2", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject-2" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( false );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 3 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#UPDATE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#DELETE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#WRITE" );
					expect( acl.entries ).toContain( ace );
				} );

				it( hasSignature(
					"Grant the permission specified to the every subject provided for the document related to the ACL.", [
						{name: "subjects", type: "(string | Carbon.Pointer.Class)[]", description: "The subjects which will be assigned the every permissions specified."},
						{name: "subjectClass", type: "string | Carbon.Pointer.Class", description: "The type of subjects provided."},
						{name: "permission", type: "string | Carbon.Pointer.Class", description: "The permission that will be granted to the every subject."},
					]
				), ():void => {
					let fragments:Fragment[];
					let aces:ACE.Class[];
					let ace:ACE.Class;

					acl.deny( [ "http://example.com/ns#Subject" ], "http://example.com/ns#SubjetClass", "http://example.com/ns#READ" );
					fragments = acl.getFragments();
					expect( fragments.length ).toBe( 1 );
					aces = getACEsOf( "http://example.com/ns#Subject", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( false );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 1 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#READ" );
					expect( acl.entries ).toContain( ace );

					acl.deny( [ acl.getPointer( "http://example.com/ns#Subject" ) ], "http://example.com/ns#SubjetClass", "http://example.com/ns#WRITE" );
					fragments = acl.getFragments();
					expect( fragments.length ).toBe( 1 );
					aces = getACEsOf( "http://example.com/ns#Subject", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( false );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 2 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#READ" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#WRITE" );
					expect( acl.entries ).toContain( ace );

					acl.deny( [ acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#Subject-2" ) ], acl.getPointer( "http://example.com/ns#SubjetClass" ), "http://example.com/ns#UPDATE" );
					fragments = acl.getFragments();
					expect( fragments.length ).toBe( 2 );
					aces = getACEsOf( "http://example.com/ns#Subject-2", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject-2" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( false );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 1 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#UPDATE" );
					expect( acl.entries ).toContain( ace );
					aces = getACEsOf( "http://example.com/ns#Subject", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( false );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 3 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#READ" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#WRITE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#UPDATE" );
					expect( acl.entries ).toContain( ace );

					acl.deny( [ acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#Subject-2" ), acl.getPointer( "http://example.com/ns#Subject-3" ) ], acl.getPointer( "http://example.com/ns#SubjetClass" ), acl.getPointer( "http://example.com/ns#DELETE" ) );
					fragments = acl.getFragments();
					expect( fragments.length ).toBe( 3 );
					aces = getACEsOf( "http://example.com/ns#Subject", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( false );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 4 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#READ" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#WRITE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#UPDATE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#DELETE" );
					expect( acl.entries ).toContain( ace );
					aces = getACEsOf( "http://example.com/ns#Subject-2", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject-2" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( false );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 2 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#UPDATE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#DELETE" );
					expect( acl.entries ).toContain( ace );
					aces = getACEsOf( "http://example.com/ns#Subject-3", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject-3" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( false );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 1 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#DELETE" );
					expect( acl.entries ).toContain( ace );
				} );

				it( hasSignature(
					"Grant several permissions to the every subject provided for the document related to the ACL.", [
						{name: "subjects", type: "(string | Carbon.Pointer.Class)[]", description: "The subjects which will be assigned the every permissions specified."},
						{name: "subjectClass", type: "string | Carbon.Pointer.Class", description: "The type of subjects provided."},
						{name: "permissions", type: "(string | Carbon.Pointer.Class)[]", description: "The permissions that will be granted to the every subject."},
					]
				), ():void => {
					let fragments:Fragment[];
					let aces:ACE.Class[];
					let ace:ACE.Class;

					acl.deny( [ "http://example.com/ns#Subject" ], "http://example.com/ns#SubjetClass", [ "http://example.com/ns#READ" ] );
					fragments = acl.getFragments();
					expect( fragments.length ).toBe( 1 );
					aces = getACEsOf( "http://example.com/ns#Subject", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( false );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 1 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#READ" );
					expect( acl.entries ).toContain( ace );

					acl.deny( [ acl.getPointer( "http://example.com/ns#Subject" ) ], "http://example.com/ns#SubjetClass", [ "http://example.com/ns#WRITE", "http://example.com/ns#UPDATE" ] );
					fragments = acl.getFragments();
					expect( fragments.length ).toBe( 1 );
					aces = getACEsOf( "http://example.com/ns#Subject", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( false );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 3 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#READ" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#WRITE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#UPDATE" );
					expect( acl.entries ).toContain( ace );

					acl.deny( [ acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#Subject-2" ) ], acl.getPointer( "http://example.com/ns#SubjetClass" ), [ "http://example.com/ns#UPDATE" ] );
					fragments = acl.getFragments();
					expect( fragments.length ).toBe( 2 );
					aces = getACEsOf( "http://example.com/ns#Subject-2", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject-2" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( false );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 1 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#UPDATE" );
					expect( acl.entries ).toContain( ace );
					aces = getACEsOf( "http://example.com/ns#Subject", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( false );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 3 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#READ" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#WRITE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#UPDATE" );
					expect( acl.entries ).toContain( ace );

					acl.deny( [ acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#Subject-2" ) ], acl.getPointer( "http://example.com/ns#SubjetClass" ), [ acl.getPointer( "http://example.com/ns#DELETE" ) ] );
					fragments = acl.getFragments();
					expect( fragments.length ).toBe( 2 );
					aces = getACEsOf( "http://example.com/ns#Subject-2", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject-2" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( false );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 2 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#UPDATE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#DELETE" );
					expect( acl.entries ).toContain( ace );
					aces = getACEsOf( "http://example.com/ns#Subject", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( false );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 4 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#READ" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#WRITE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#UPDATE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#DELETE" );
					expect( acl.entries ).toContain( ace );

					acl.deny( [ acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#Subject-2" ), acl.getPointer( "http://example.com/ns#Subject-3" ) ], acl.getPointer( "http://example.com/ns#SubjetClass" ), [ "http://example.com/ns#UPDATE", acl.getPointer( "http://example.com/ns#CREATE" ), "http://example.com/ns#WRITE" ] );
					fragments = acl.getFragments();
					expect( fragments.length ).toBe( 3 );
					aces = getACEsOf( "http://example.com/ns#Subject", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( false );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 5 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#READ" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#WRITE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#UPDATE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#DELETE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#CREATE" );
					expect( acl.entries ).toContain( ace );
					aces = getACEsOf( "http://example.com/ns#Subject-2", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject-2" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( false );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 4 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#UPDATE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#DELETE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#WRITE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#CREATE" );
					expect( acl.entries ).toContain( ace );
					aces = getACEsOf( "http://example.com/ns#Subject-3", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject-3" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( false );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 3 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#UPDATE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#WRITE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#CREATE" );
					expect( acl.entries ).toContain( ace );


					acl.entries.forEach( forEachACE => acl._removeFragment( forEachACE.id ) );
					acl.entries = [];
					ace = ACE.Factory.createFrom(
						acl.createFragment(),
						false,
						[ acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#Subject-2" ) ],
						acl.getPointer( "http://example.com/ns#SubjetClass" ),
						[ acl.getPointer( "http://example.com/ns#CREATE" ), acl.getPointer( "http://example.com/ns#DELETE" ) ]
					);
					acl.entries.push( ace );
					ace = ACE.Factory.createFrom(
						acl.createFragment(),
						true,
						[ acl.getPointer( "http://example.com/ns#Subject-2" ), acl.getPointer( "http://example.com/ns#Subject-3" ) ],
						acl.getPointer( "http://example.com/ns#SubjetClass" ),
						[ acl.getPointer( "http://example.com/ns#READ" ), acl.getPointer( "http://example.com/ns#WRITE" ) ]
					);
					acl.entries.push( ace );

					acl.deny( [ acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#Subject-2" ), acl.getPointer( "http://example.com/ns#Subject-3" ) ], acl.getPointer( "http://example.com/ns#SubjetClass" ), [ "http://example.com/ns#UPDATE", acl.getPointer( "http://example.com/ns#CREATE" ), acl.getPointer( "http://example.com/ns#READ" ) ] );
					fragments = acl.getFragments();
					expect( fragments.length ).toBe( 5 );
					aces = getACEsOf( "http://example.com/ns#Subject", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( false );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 4 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#CREATE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#DELETE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#UPDATE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#READ" );
					expect( acl.entries ).toContain( ace );

					aces = getACEsOf( "http://example.com/ns#Subject-2", fragments );
					expect( aces.length ).toBe( 2 );
					aces.sort( ( a, b ) => a.granting ? 1 : - 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject-2" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( false );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 4 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#CREATE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#DELETE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#UPDATE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#READ" );
					expect( acl.entries ).toContain( ace );
					ace = <ACE.Class> aces[ 1 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject-2" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( true );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 1 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#WRITE" );
					expect( acl.entries ).toContain( ace );

					aces = getACEsOf( "http://example.com/ns#Subject-3", fragments );
					expect( aces.length ).toBe( 2 );
					aces.sort( ( a, b ) => a.granting ? 1 : - 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject-3" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( false );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 3 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#UPDATE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#CREATE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#READ" );
					expect( acl.entries ).toContain( ace );
					ace = <ACE.Class> aces[ 1 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject-3" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( true );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 1 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#WRITE" );
					expect( acl.entries ).toContain( ace );


					acl.entries.forEach( forEachACE => acl._removeFragment( forEachACE.id ) );
					acl.entries = [];
					acl.inheritableEntries = [];

					ace = ACE.Factory.createFrom(
						acl.createFragment(),
						false,
						[ acl.getPointer( "http://example.com/ns#Subject" ) ],
						acl.getPointer( "http://example.com/ns#SubjetClass" ),
						[ acl.getPointer( "http://example.com/ns#READ" ), acl.getPointer( "http://example.com/ns#WRITE" ) ]
					);
					acl.entries.push( ace );
					acl.inheritableEntries.push( ace );

					expect( acl.denies( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#READ" ) ) ).toBe( true );
					expect( acl.denies( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#WRITE" ) ) ).toBe( true );
					expect( acl.denies( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#UPDATE" ) ) ).toBeNull();
					expect( acl.denies( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#CREATE" ) ) ).toBeNull();

					expect( acl.getChildInheritance( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#READ" ) ) ).toBe( false );
					expect( acl.getChildInheritance( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#WRITE" ) ) ).toBe( false );
					expect( acl.getChildInheritance( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#UPDATE" ) ) ).toBeNull();
					expect( acl.getChildInheritance( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#CREATE" ) ) ).toBeNull();

					acl.deny( [ "http://example.com/ns#Subject", "http://example.com/ns#Subject-1" ], "http://example.com/ns#SubjetClass", [ "http://example.com/ns#UPDATE", "http://example.com/ns#CREATE" ] );

					expect( acl.denies( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#READ" ) ) ).toBe( true );
					expect( acl.denies( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#WRITE" ) ) ).toBe( true );
					expect( acl.denies( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#UPDATE" ) ) ).toBe( true );
					expect( acl.denies( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#CREATE" ) ) ).toBe( true );

					expect( acl.denies( acl.getPointer( "http://example.com/ns#Subject-1" ), acl.getPointer( "http://example.com/ns#READ" ) ) ).toBeNull();
					expect( acl.denies( acl.getPointer( "http://example.com/ns#Subject-1" ), acl.getPointer( "http://example.com/ns#WRITE" ) ) ).toBeNull();
					expect( acl.denies( acl.getPointer( "http://example.com/ns#Subject-1" ), acl.getPointer( "http://example.com/ns#UPDATE" ) ) ).toBe( true );
					expect( acl.denies( acl.getPointer( "http://example.com/ns#Subject-1" ), acl.getPointer( "http://example.com/ns#CREATE" ) ) ).toBe( true );

					expect( acl.getChildInheritance( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#READ" ) ) ).toBe( false );
					expect( acl.getChildInheritance( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#WRITE" ) ) ).toBe( false );
					expect( acl.getChildInheritance( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#UPDATE" ) ) ).toBeNull();
					expect( acl.getChildInheritance( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#CREATE" ) ) ).toBeNull();
				} );

			} );

			describe( method( INSTANCE, "configureChildInheritance" ), ():void => {

				it( isDefined(), ():void => {
					expect( acl.configureChildInheritance ).toBeDefined();
					expect( Utils.isFunction( acl.configureChildInheritance ) ).toBe( true );
				} );

				it( hasSignature(
					"Configures the permission specified to the subject provided either granting or denying it for the children of the document related to the ACL.", [
						{name: "granting", type: "boolean", description: "Boolean to indicate if the permission will be granted o denied."},
						{name: "subject", type: "string | Carbon.Pointer.Class", description: "The subject which will be assigned the permission specified."},
						{name: "subjectClass", type: "string | Carbon.Pointer.Class", description: "The type of subject provided."},
						{name: "permission", type: "string | Carbon.Pointer.Class", description: "The permission that will be granted to the subject specified."},
					]
				), ():void => {
					let fragments:Fragment[];
					let aces:ACE.Class[];
					let ace:ACE.Class;

					acl.configureChildInheritance( true, "http://example.com/ns#Subject-01", "http://example.com/ns#SubjetClass", "http://example.com/ns#READ" );
					fragments = acl.getFragments();
					expect( fragments.length ).toBe( 1 );
					aces = getACEsOf( "http://example.com/ns#Subject-01", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject-01" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( true );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 1 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#READ" );
					expect( acl.inheritableEntries ).toContain( ace );

					acl.configureChildInheritance( true, acl.getPointer( "http://example.com/ns#Subject-01" ), "http://example.com/ns#SubjetClass", "http://example.com/ns#WRITE" );
					fragments = acl.getFragments();
					expect( fragments.length ).toBe( 1 );
					aces = getACEsOf( "http://example.com/ns#Subject-01", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject-01" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( true );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 2 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#WRITE" );
					expect( acl.inheritableEntries ).toContain( ace );

					acl.configureChildInheritance( true, acl.getPointer( "http://example.com/ns#Subject-11" ), acl.getPointer( "http://example.com/ns#SubjetClass" ), "http://example.com/ns#UPDATE" );
					fragments = acl.getFragments();
					expect( fragments.length ).toBe( 2 );
					aces = getACEsOf( "http://example.com/ns#Subject-11", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject-11" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( true );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 1 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#UPDATE" );
					expect( acl.inheritableEntries ).toContain( ace );

					acl.configureChildInheritance( true, acl.getPointer( "http://example.com/ns#Subject-11" ), acl.getPointer( "http://example.com/ns#SubjetClass" ), acl.getPointer( "http://example.com/ns#DELETE" ) );
					fragments = acl.getFragments();
					expect( fragments.length ).toBe( 2 );
					aces = getACEsOf( "http://example.com/ns#Subject-11", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject-11" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( true );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 2 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#DELETE" );
					expect( acl.inheritableEntries ).toContain( ace );

					acl.inheritableEntries.forEach( forEachACE => acl._removeFragment( forEachACE.id ) );
					delete acl.inheritableEntries;

					acl.configureChildInheritance( false, "http://example.com/ns#Subject-02", "http://example.com/ns#SubjetClass", "http://example.com/ns#READ" );
					fragments = acl.getFragments();
					expect( fragments.length ).toBe( 1 );
					aces = getACEsOf( "http://example.com/ns#Subject-02", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject-02" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( false );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 1 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#READ" );
					expect( acl.inheritableEntries ).toContain( ace );

					acl.configureChildInheritance( false, acl.getPointer( "http://example.com/ns#Subject-02" ), "http://example.com/ns#SubjetClass", "http://example.com/ns#WRITE" );
					fragments = acl.getFragments();
					expect( fragments.length ).toBe( 1 );
					aces = getACEsOf( "http://example.com/ns#Subject-02", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject-02" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( false );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 2 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#WRITE" );
					expect( acl.inheritableEntries ).toContain( ace );

					acl.configureChildInheritance( false, acl.getPointer( "http://example.com/ns#Subject-12" ), acl.getPointer( "http://example.com/ns#SubjetClass" ), "http://example.com/ns#UPDATE" );
					fragments = acl.getFragments();
					expect( fragments.length ).toBe( 2 );
					aces = getACEsOf( "http://example.com/ns#Subject-12", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject-12" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( false );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 1 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#UPDATE" );
					expect( acl.inheritableEntries ).toContain( ace );

					acl.configureChildInheritance( false, acl.getPointer( "http://example.com/ns#Subject-12" ), acl.getPointer( "http://example.com/ns#SubjetClass" ), acl.getPointer( "http://example.com/ns#DELETE" ) );
					fragments = acl.getFragments();
					expect( fragments.length ).toBe( 2 );
					aces = getACEsOf( "http://example.com/ns#Subject-12", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject-12" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( false );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 2 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#DELETE" );
					expect( acl.inheritableEntries ).toContain( ace );
				} );

				it( hasSignature(
					"Configure several permissions to the subject provided either granting or denying them for the children of the document related to the ACL.", [
						{name: "granting", type: "boolean", description: "Boolean to indicate if the permission will be granted o denied."},
						{name: "subject", type: "string | Carbon.Pointer.Class", description: "The subject which will be assigned the permission specified."},
						{name: "subjectClass", type: "string | Carbon.Pointer.Class", description: "The type of subject provided."},
						{name: "permissions", type: "(string | Carbon.Pointer.Class)[]", description: "The permissions that will be granted to the subject specified."},
					]
				), ():void => {
					let fragments:Fragment[];
					let aces:ACE.Class[];
					let ace:ACE.Class;

					acl.configureChildInheritance( true, "http://example.com/ns#Subject", "http://example.com/ns#SubjetClass", [ "http://example.com/ns#READ" ] );
					fragments = acl.getFragments();
					expect( fragments.length ).toBe( 1 );
					aces = getACEsOf( "http://example.com/ns#Subject", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( true );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 1 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#READ" );
					expect( acl.inheritableEntries ).toContain( ace );

					acl.configureChildInheritance( true, acl.getPointer( "http://example.com/ns#Subject" ), "http://example.com/ns#SubjetClass", [ "http://example.com/ns#WRITE", "http://example.com/ns#UPDATE" ] );
					fragments = acl.getFragments();
					expect( fragments.length ).toBe( 1 );
					aces = getACEsOf( "http://example.com/ns#Subject", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( true );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 3 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#READ" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#WRITE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#UPDATE" );
					expect( acl.inheritableEntries ).toContain( ace );

					acl.configureChildInheritance( true, acl.getPointer( "http://example.com/ns#Subject-2" ), acl.getPointer( "http://example.com/ns#SubjetClass" ), [ "http://example.com/ns#UPDATE" ] );
					fragments = acl.getFragments();
					expect( fragments.length ).toBe( 2 );
					aces = getACEsOf( "http://example.com/ns#Subject-2", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject-2" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( true );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 1 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#UPDATE" );
					expect( acl.inheritableEntries ).toContain( ace );

					acl.configureChildInheritance( true, acl.getPointer( "http://example.com/ns#Subject-2" ), acl.getPointer( "http://example.com/ns#SubjetClass" ), [ acl.getPointer( "http://example.com/ns#DELETE" ) ] );
					fragments = acl.getFragments();
					expect( fragments.length ).toBe( 2 );
					aces = getACEsOf( "http://example.com/ns#Subject-2", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject-2" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( true );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 2 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#UPDATE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#DELETE" );
					expect( acl.inheritableEntries ).toContain( ace );

					acl.configureChildInheritance( true, acl.getPointer( "http://example.com/ns#Subject-2" ), acl.getPointer( "http://example.com/ns#SubjetClass" ), [ "http://example.com/ns#UPDATE", acl.getPointer( "http://example.com/ns#DELETE" ), "http://example.com/ns#WRITE" ] );
					fragments = acl.getFragments();
					expect( fragments.length ).toBe( 2 );
					aces = getACEsOf( "http://example.com/ns#Subject-2", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject-2" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( true );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 3 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#UPDATE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#DELETE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#WRITE" );
					expect( acl.inheritableEntries ).toContain( ace );

					acl.inheritableEntries.forEach( forEachACE => acl._removeFragment( forEachACE.id ) );
					delete acl.inheritableEntries;

					acl.configureChildInheritance( false, "http://example.com/ns#Subject", "http://example.com/ns#SubjetClass", [ "http://example.com/ns#READ" ] );
					fragments = acl.getFragments();
					expect( fragments.length ).toBe( 1 );
					aces = getACEsOf( "http://example.com/ns#Subject", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( false );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 1 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#READ" );
					expect( acl.inheritableEntries ).toContain( ace );

					acl.configureChildInheritance( false, acl.getPointer( "http://example.com/ns#Subject" ), "http://example.com/ns#SubjetClass", [ "http://example.com/ns#WRITE", "http://example.com/ns#UPDATE" ] );
					fragments = acl.getFragments();
					expect( fragments.length ).toBe( 1 );
					aces = getACEsOf( "http://example.com/ns#Subject", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( false );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 3 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#READ" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#WRITE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#UPDATE" );
					expect( acl.inheritableEntries ).toContain( ace );

					acl.configureChildInheritance( false, acl.getPointer( "http://example.com/ns#Subject-2" ), acl.getPointer( "http://example.com/ns#SubjetClass" ), [ "http://example.com/ns#UPDATE" ] );
					fragments = acl.getFragments();
					expect( fragments.length ).toBe( 2 );
					aces = getACEsOf( "http://example.com/ns#Subject-2", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject-2" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( false );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 1 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#UPDATE" );
					expect( acl.inheritableEntries ).toContain( ace );

					acl.configureChildInheritance( false, acl.getPointer( "http://example.com/ns#Subject-2" ), acl.getPointer( "http://example.com/ns#SubjetClass" ), [ acl.getPointer( "http://example.com/ns#DELETE" ) ] );
					fragments = acl.getFragments();
					expect( fragments.length ).toBe( 2 );
					aces = getACEsOf( "http://example.com/ns#Subject-2", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject-2" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( false );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 2 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#UPDATE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#DELETE" );
					expect( acl.inheritableEntries ).toContain( ace );

					acl.configureChildInheritance( false, acl.getPointer( "http://example.com/ns#Subject-2" ), acl.getPointer( "http://example.com/ns#SubjetClass" ), [ "http://example.com/ns#UPDATE", acl.getPointer( "http://example.com/ns#DELETE" ), "http://example.com/ns#WRITE" ] );
					fragments = acl.getFragments();
					expect( fragments.length ).toBe( 2 );
					aces = getACEsOf( "http://example.com/ns#Subject-2", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject-2" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( false );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 3 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#UPDATE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#DELETE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#WRITE" );
					expect( acl.inheritableEntries ).toContain( ace );
				} );

				it( hasSignature(
					"Configure the permission specified to the every subject provided either granting or denying it for the children of the document related to the ACL.", [
						{name: "granting", type: "boolean", description: "Boolean to indicate if the permission will be granted o denied."},
						{name: "subjects", type: "(string | Carbon.Pointer.Class)[]", description: "The subjects which will be assigned the every permissions specified."},
						{name: "subjectClass", type: "string | Carbon.Pointer.Class", description: "The type of subjects provided."},
						{name: "permission", type: "string | Carbon.Pointer.Class", description: "The permission that will be granted to the every subject."},
					]
				), ():void => {
					let fragments:Fragment[];
					let aces:ACE.Class[];
					let ace:ACE.Class;

					acl.configureChildInheritance( true, [ "http://example.com/ns#Subject" ], "http://example.com/ns#SubjetClass", "http://example.com/ns#READ" );
					fragments = acl.getFragments();
					expect( fragments.length ).toBe( 1 );
					aces = getACEsOf( "http://example.com/ns#Subject", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( true );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 1 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#READ" );
					expect( acl.inheritableEntries ).toContain( ace );

					acl.configureChildInheritance( true, [ acl.getPointer( "http://example.com/ns#Subject" ) ], "http://example.com/ns#SubjetClass", "http://example.com/ns#WRITE" );
					fragments = acl.getFragments();
					expect( fragments.length ).toBe( 1 );
					aces = getACEsOf( "http://example.com/ns#Subject", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( true );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 2 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#READ" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#WRITE" );
					expect( acl.inheritableEntries ).toContain( ace );

					acl.configureChildInheritance( true, [ acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#Subject-2" ) ], acl.getPointer( "http://example.com/ns#SubjetClass" ), "http://example.com/ns#UPDATE" );
					fragments = acl.getFragments();
					expect( fragments.length ).toBe( 2 );
					aces = getACEsOf( "http://example.com/ns#Subject-2", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject-2" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( true );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 1 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#UPDATE" );
					expect( acl.inheritableEntries ).toContain( ace );
					aces = getACEsOf( "http://example.com/ns#Subject", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( true );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 3 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#READ" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#WRITE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#UPDATE" );
					expect( acl.inheritableEntries ).toContain( ace );

					acl.configureChildInheritance( true, [ acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#Subject-2" ), acl.getPointer( "http://example.com/ns#Subject-3" ) ], acl.getPointer( "http://example.com/ns#SubjetClass" ), acl.getPointer( "http://example.com/ns#DELETE" ) );
					fragments = acl.getFragments();
					expect( fragments.length ).toBe( 3 );
					aces = getACEsOf( "http://example.com/ns#Subject", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( true );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 4 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#READ" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#WRITE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#UPDATE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#DELETE" );
					expect( acl.inheritableEntries ).toContain( ace );
					aces = getACEsOf( "http://example.com/ns#Subject-2", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject-2" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( true );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 2 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#UPDATE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#DELETE" );
					expect( acl.inheritableEntries ).toContain( ace );
					aces = getACEsOf( "http://example.com/ns#Subject-3", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject-3" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( true );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 1 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#DELETE" );
					expect( acl.inheritableEntries ).toContain( ace );

					acl.inheritableEntries.forEach( forEachACE => acl._removeFragment( forEachACE.id ) );
					delete acl.inheritableEntries;

					acl.configureChildInheritance( false, [ "http://example.com/ns#Subject" ], "http://example.com/ns#SubjetClass", "http://example.com/ns#READ" );
					fragments = acl.getFragments();
					expect( fragments.length ).toBe( 1 );
					aces = getACEsOf( "http://example.com/ns#Subject", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( false );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 1 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#READ" );
					expect( acl.inheritableEntries ).toContain( ace );

					acl.configureChildInheritance( false, [ acl.getPointer( "http://example.com/ns#Subject" ) ], "http://example.com/ns#SubjetClass", "http://example.com/ns#WRITE" );
					fragments = acl.getFragments();
					expect( fragments.length ).toBe( 1 );
					aces = getACEsOf( "http://example.com/ns#Subject", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( false );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 2 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#READ" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#WRITE" );
					expect( acl.inheritableEntries ).toContain( ace );

					acl.configureChildInheritance( false, [ acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#Subject-2" ) ], acl.getPointer( "http://example.com/ns#SubjetClass" ), "http://example.com/ns#UPDATE" );
					fragments = acl.getFragments();
					expect( fragments.length ).toBe( 2 );
					aces = getACEsOf( "http://example.com/ns#Subject-2", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject-2" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( false );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 1 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#UPDATE" );
					expect( acl.inheritableEntries ).toContain( ace );
					aces = getACEsOf( "http://example.com/ns#Subject", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( false );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 3 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#READ" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#WRITE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#UPDATE" );
					expect( acl.inheritableEntries ).toContain( ace );

					acl.configureChildInheritance( false, [ acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#Subject-2" ), acl.getPointer( "http://example.com/ns#Subject-3" ) ], acl.getPointer( "http://example.com/ns#SubjetClass" ), acl.getPointer( "http://example.com/ns#DELETE" ) );
					fragments = acl.getFragments();
					expect( fragments.length ).toBe( 3 );
					aces = getACEsOf( "http://example.com/ns#Subject", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( false );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 4 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#READ" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#WRITE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#UPDATE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#DELETE" );
					expect( acl.inheritableEntries ).toContain( ace );
					aces = getACEsOf( "http://example.com/ns#Subject-2", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject-2" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( false );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 2 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#UPDATE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#DELETE" );
					expect( acl.inheritableEntries ).toContain( ace );
					aces = getACEsOf( "http://example.com/ns#Subject-3", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject-3" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( false );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 1 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#DELETE" );
					expect( acl.inheritableEntries ).toContain( ace );
				} );

				it( hasSignature(
					"Configure several permissions to the every subject provided either granting or denying them for the children of the document related to the ACL.", [
						{name: "granting", type: "boolean", description: "Boolean to indicate if the permission will be granted o denied."},
						{name: "subjects", type: "(string | Carbon.Pointer.Class)[]", description: "The subjects which will be assigned the every permissions specified."},
						{name: "subjectClass", type: "string | Carbon.Pointer.Class", description: "The type of subjects provided."},
						{name: "permissions", type: "(string | Carbon.Pointer.Class)[]", description: "The permissions that will be granted to the every subject."},
					]
				), ():void => {
					let fragments:Fragment[];
					let aces:ACE.Class[];
					let ace:ACE.Class;

					acl.configureChildInheritance( true, [ "http://example.com/ns#Subject" ], "http://example.com/ns#SubjetClass", [ "http://example.com/ns#READ" ] );
					fragments = acl.getFragments();
					expect( fragments.length ).toBe( 1 );
					aces = getACEsOf( "http://example.com/ns#Subject", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( true );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 1 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#READ" );
					expect( acl.inheritableEntries ).toContain( ace );

					acl.configureChildInheritance( true, [ acl.getPointer( "http://example.com/ns#Subject" ) ], "http://example.com/ns#SubjetClass", [ "http://example.com/ns#WRITE", "http://example.com/ns#UPDATE" ] );
					fragments = acl.getFragments();
					expect( fragments.length ).toBe( 1 );
					aces = getACEsOf( "http://example.com/ns#Subject", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( true );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 3 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#READ" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#WRITE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#UPDATE" );
					expect( acl.inheritableEntries ).toContain( ace );

					acl.configureChildInheritance( true, [ acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#Subject-2" ) ], acl.getPointer( "http://example.com/ns#SubjetClass" ), [ "http://example.com/ns#UPDATE" ] );
					fragments = acl.getFragments();
					expect( fragments.length ).toBe( 2 );
					aces = getACEsOf( "http://example.com/ns#Subject-2", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject-2" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( true );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 1 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#UPDATE" );
					expect( acl.inheritableEntries ).toContain( ace );
					aces = getACEsOf( "http://example.com/ns#Subject", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( true );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 3 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#READ" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#WRITE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#UPDATE" );
					expect( acl.inheritableEntries ).toContain( ace );

					acl.configureChildInheritance( true, [ acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#Subject-2" ) ], acl.getPointer( "http://example.com/ns#SubjetClass" ), [ acl.getPointer( "http://example.com/ns#DELETE" ) ] );
					fragments = acl.getFragments();
					expect( fragments.length ).toBe( 2 );
					aces = getACEsOf( "http://example.com/ns#Subject-2", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject-2" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( true );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 2 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#UPDATE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#DELETE" );
					expect( acl.inheritableEntries ).toContain( ace );
					aces = getACEsOf( "http://example.com/ns#Subject", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( true );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 4 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#READ" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#WRITE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#UPDATE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#DELETE" );
					expect( acl.inheritableEntries ).toContain( ace );

					acl.configureChildInheritance( true, [ acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#Subject-2" ), acl.getPointer( "http://example.com/ns#Subject-3" ) ], acl.getPointer( "http://example.com/ns#SubjetClass" ), [ "http://example.com/ns#UPDATE", acl.getPointer( "http://example.com/ns#CREATE" ), "http://example.com/ns#WRITE" ] );
					fragments = acl.getFragments();
					expect( fragments.length ).toBe( 3 );
					aces = getACEsOf( "http://example.com/ns#Subject", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( true );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 5 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#READ" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#WRITE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#UPDATE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#DELETE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#CREATE" );
					expect( acl.inheritableEntries ).toContain( ace );
					aces = getACEsOf( "http://example.com/ns#Subject-2", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject-2" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( true );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 4 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#UPDATE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#DELETE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#WRITE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#CREATE" );
					expect( acl.inheritableEntries ).toContain( ace );
					aces = getACEsOf( "http://example.com/ns#Subject-3", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject-3" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( true );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 3 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#UPDATE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#WRITE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#CREATE" );
					expect( acl.inheritableEntries ).toContain( ace );

					acl.inheritableEntries.forEach( forEachACE => acl._removeFragment( forEachACE.id ) );
					delete acl.inheritableEntries;

					acl.configureChildInheritance( false, [ "http://example.com/ns#Subject" ], "http://example.com/ns#SubjetClass", [ "http://example.com/ns#READ" ] );
					fragments = acl.getFragments();
					expect( fragments.length ).toBe( 1 );
					aces = getACEsOf( "http://example.com/ns#Subject", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( false );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 1 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#READ" );
					expect( acl.inheritableEntries ).toContain( ace );

					acl.configureChildInheritance( false, [ acl.getPointer( "http://example.com/ns#Subject" ) ], "http://example.com/ns#SubjetClass", [ "http://example.com/ns#WRITE", "http://example.com/ns#UPDATE" ] );
					fragments = acl.getFragments();
					expect( fragments.length ).toBe( 1 );
					aces = getACEsOf( "http://example.com/ns#Subject", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( false );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 3 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#READ" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#WRITE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#UPDATE" );
					expect( acl.inheritableEntries ).toContain( ace );

					acl.configureChildInheritance( false, [ acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#Subject-2" ) ], acl.getPointer( "http://example.com/ns#SubjetClass" ), [ "http://example.com/ns#UPDATE" ] );
					fragments = acl.getFragments();
					expect( fragments.length ).toBe( 2 );
					aces = getACEsOf( "http://example.com/ns#Subject-2", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject-2" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( false );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 1 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#UPDATE" );
					expect( acl.inheritableEntries ).toContain( ace );
					aces = getACEsOf( "http://example.com/ns#Subject", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( false );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 3 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#READ" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#WRITE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#UPDATE" );
					expect( acl.inheritableEntries ).toContain( ace );

					acl.configureChildInheritance( false, [ acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#Subject-2" ) ], acl.getPointer( "http://example.com/ns#SubjetClass" ), [ acl.getPointer( "http://example.com/ns#DELETE" ) ] );
					fragments = acl.getFragments();
					expect( fragments.length ).toBe( 2 );
					aces = getACEsOf( "http://example.com/ns#Subject-2", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject-2" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( false );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 2 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#UPDATE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#DELETE" );
					expect( acl.inheritableEntries ).toContain( ace );
					aces = getACEsOf( "http://example.com/ns#Subject", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( false );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 4 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#READ" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#WRITE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#UPDATE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#DELETE" );
					expect( acl.inheritableEntries ).toContain( ace );

					acl.configureChildInheritance( false, [ acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#Subject-2" ), acl.getPointer( "http://example.com/ns#Subject-3" ) ], acl.getPointer( "http://example.com/ns#SubjetClass" ), [ "http://example.com/ns#UPDATE", acl.getPointer( "http://example.com/ns#CREATE" ), "http://example.com/ns#WRITE" ] );
					fragments = acl.getFragments();
					expect( fragments.length ).toBe( 3 );
					aces = getACEsOf( "http://example.com/ns#Subject", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( false );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 5 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#READ" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#WRITE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#UPDATE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#DELETE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#CREATE" );
					expect( acl.inheritableEntries ).toContain( ace );
					aces = getACEsOf( "http://example.com/ns#Subject-2", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject-2" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( false );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 4 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#UPDATE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#DELETE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#WRITE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#CREATE" );
					expect( acl.inheritableEntries ).toContain( ace );
					aces = getACEsOf( "http://example.com/ns#Subject-3", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject-3" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( false );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 3 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#UPDATE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#WRITE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#CREATE" );
					expect( acl.inheritableEntries ).toContain( ace );

					acl.inheritableEntries.forEach( forEachACE => acl._removeFragment( forEachACE.id ) );
					acl.inheritableEntries = [];

					ace = ACE.Factory.createFrom(
						acl.createFragment(),
						false,
						[ acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#Subject-2" ) ],
						acl.getPointer( "http://example.com/ns#SubjetClass" ),
						[ acl.getPointer( "http://example.com/ns#CREATE" ), acl.getPointer( "http://example.com/ns#DELETE" ) ]
					);
					acl.inheritableEntries.push( ace );
					ace = ACE.Factory.createFrom(
						acl.createFragment(),
						true,
						[ acl.getPointer( "http://example.com/ns#Subject-2" ), acl.getPointer( "http://example.com/ns#Subject-3" ) ],
						acl.getPointer( "http://example.com/ns#SubjetClass" ),
						[ acl.getPointer( "http://example.com/ns#READ" ), acl.getPointer( "http://example.com/ns#WRITE" ) ]
					);
					acl.inheritableEntries.push( ace );

					acl.configureChildInheritance( true, [ acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#Subject-2" ), acl.getPointer( "http://example.com/ns#Subject-3" ) ], acl.getPointer( "http://example.com/ns#SubjetClass" ), [ "http://example.com/ns#UPDATE", acl.getPointer( "http://example.com/ns#CREATE" ), acl.getPointer( "http://example.com/ns#READ" ) ] );
					fragments = acl.getFragments();
					expect( fragments.length ).toBe( 5 );
					aces = getACEsOf( "http://example.com/ns#Subject", fragments );
					expect( aces.length ).toBe( 2 );
					aces.sort( ( a, b ) => a.granting ? - 1 : 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( true );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 3 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#UPDATE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#CREATE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#READ" );
					expect( acl.inheritableEntries ).toContain( ace );
					ace = <ACE.Class> aces[ 1 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( false );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 1 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#DELETE" );
					expect( acl.inheritableEntries ).toContain( ace );
					aces = getACEsOf( "http://example.com/ns#Subject-2", fragments );
					expect( aces.length ).toBe( 2 );
					aces.sort( ( a, b ) => a.granting ? - 1 : 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject-2" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( true );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 4 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#READ" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#WRITE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#UPDATE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#CREATE" );
					expect( acl.inheritableEntries ).toContain( ace );
					ace = <ACE.Class> aces[ 1 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject-2" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( false );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 1 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#DELETE" );
					expect( acl.inheritableEntries ).toContain( ace );
					aces = getACEsOf( "http://example.com/ns#Subject-3", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject-3" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( true );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 4 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#READ" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#WRITE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#UPDATE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#CREATE" );
					expect( acl.inheritableEntries ).toContain( ace );

					acl.inheritableEntries.forEach( forEachACE => acl._removeFragment( forEachACE.id ) );
					acl.inheritableEntries = [];

					ace = ACE.Factory.createFrom(
						acl.createFragment(),
						false,
						[ acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#Subject-2" ) ],
						acl.getPointer( "http://example.com/ns#SubjetClass" ),
						[ acl.getPointer( "http://example.com/ns#CREATE" ), acl.getPointer( "http://example.com/ns#DELETE" ) ]
					);
					acl.inheritableEntries.push( ace );
					ace = ACE.Factory.createFrom(
						acl.createFragment(),
						true,
						[ acl.getPointer( "http://example.com/ns#Subject-2" ), acl.getPointer( "http://example.com/ns#Subject-3" ) ],
						acl.getPointer( "http://example.com/ns#SubjetClass" ),
						[ acl.getPointer( "http://example.com/ns#READ" ), acl.getPointer( "http://example.com/ns#WRITE" ) ]
					);
					acl.inheritableEntries.push( ace );

					acl.configureChildInheritance( false, [ acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#Subject-2" ), acl.getPointer( "http://example.com/ns#Subject-3" ) ], acl.getPointer( "http://example.com/ns#SubjetClass" ), [ "http://example.com/ns#UPDATE", acl.getPointer( "http://example.com/ns#CREATE" ), acl.getPointer( "http://example.com/ns#READ" ) ] );
					fragments = acl.getFragments();
					expect( fragments.length ).toBe( 5 );
					aces = getACEsOf( "http://example.com/ns#Subject", fragments );
					expect( aces.length ).toBe( 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( false );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 4 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#CREATE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#DELETE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#UPDATE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#READ" );
					expect( acl.inheritableEntries ).toContain( ace );

					aces = getACEsOf( "http://example.com/ns#Subject-2", fragments );
					expect( aces.length ).toBe( 2 );
					aces.sort( ( a, b ) => a.granting ? 1 : - 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject-2" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( false );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 4 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#CREATE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#DELETE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#UPDATE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#READ" );
					expect( acl.inheritableEntries ).toContain( ace );
					ace = <ACE.Class> aces[ 1 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject-2" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( true );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 1 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#WRITE" );
					expect( acl.inheritableEntries ).toContain( ace );

					aces = getACEsOf( "http://example.com/ns#Subject-3", fragments );
					expect( aces.length ).toBe( 2 );
					aces.sort( ( a, b ) => a.granting ? 1 : - 1 );
					ace = <ACE.Class> aces[ 0 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject-3" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( false );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 3 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#UPDATE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#CREATE" );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#READ" );
					expect( acl.inheritableEntries ).toContain( ace );
					ace = <ACE.Class> aces[ 1 ];
					expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "http://example.com/ns#Subject-3" );
					expect( ace.types ).toContain( ACE.RDF_CLASS );
					expect( ace.granting ).toBe( true );
					expect( ace.subjectsClass.id ).toBe( "http://example.com/ns#SubjetClass" );
					expect( ace.permissions.length ).toBe( 1 );
					expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "http://example.com/ns#WRITE" );
					expect( acl.inheritableEntries ).toContain( ace );

					acl.inheritableEntries.forEach( forEachACE => acl._removeFragment( forEachACE.id ) );
					acl.inheritableEntries = [];
					acl.entries = [];

					ace = ACE.Factory.createFrom(
						acl.createFragment(),
						true,
						[ acl.getPointer( "http://example.com/ns#Subject" ) ],
						acl.getPointer( "http://example.com/ns#SubjetClass" ),
						[ acl.getPointer( "http://example.com/ns#READ" ), acl.getPointer( "http://example.com/ns#WRITE" ) ]
					);
					acl.inheritableEntries.push( ace );
					acl.entries.push( ace );

					expect( acl.getChildInheritance( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#READ" ) ) ).toBe( true );
					expect( acl.getChildInheritance( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#WRITE" ) ) ).toBe( true );
					expect( acl.getChildInheritance( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#UPDATE" ) ) ).toBeNull();
					expect( acl.getChildInheritance( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#CREATE" ) ) ).toBeNull();

					expect( acl.grants( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#READ" ) ) ).toBe( true );
					expect( acl.grants( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#WRITE" ) ) ).toBe( true );
					expect( acl.grants( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#UPDATE" ) ) ).toBeNull();
					expect( acl.grants( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#CREATE" ) ) ).toBeNull();

					acl.configureChildInheritance( true, [ "http://example.com/ns#Subject", "http://example.com/ns#Subject-1" ], "http://example.com/ns#SubjetClass", [ "http://example.com/ns#UPDATE", "http://example.com/ns#CREATE" ] );

					expect( acl.getChildInheritance( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#READ" ) ) ).toBe( true );
					expect( acl.getChildInheritance( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#WRITE" ) ) ).toBe( true );
					expect( acl.getChildInheritance( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#UPDATE" ) ) ).toBe( true );
					expect( acl.getChildInheritance( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#CREATE" ) ) ).toBe( true );

					expect( acl.getChildInheritance( acl.getPointer( "http://example.com/ns#Subject-1" ), acl.getPointer( "http://example.com/ns#READ" ) ) ).toBeNull();
					expect( acl.getChildInheritance( acl.getPointer( "http://example.com/ns#Subject-1" ), acl.getPointer( "http://example.com/ns#WRITE" ) ) ).toBeNull();
					expect( acl.getChildInheritance( acl.getPointer( "http://example.com/ns#Subject-1" ), acl.getPointer( "http://example.com/ns#UPDATE" ) ) ).toBe( true );
					expect( acl.getChildInheritance( acl.getPointer( "http://example.com/ns#Subject-1" ), acl.getPointer( "http://example.com/ns#CREATE" ) ) ).toBe( true );

					expect( acl.grants( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#READ" ) ) ).toBe( true );
					expect( acl.grants( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#WRITE" ) ) ).toBe( true );
					expect( acl.grants( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#UPDATE" ) ) ).toBeNull();
					expect( acl.grants( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#CREATE" ) ) ).toBeNull();
				} );

			} );

			it( hasMethod(
				INSTANCE,
				"grants",
				"Returns true if the subject has a configuration where it grants the permission specified for the document related to de ACL.\nReturns `null` if no configuration of the subject and permission exists in the ACL.", [
					{name: "subject", type: "string | Carbon.Pointer.Class", description: "The subject to look for its configuration."},
					{name: "permission", type: "string | Carbon.Pointer.Class", description: "The permission to check if it has a granting configuration."},
				],
				{type: "boolean"}
			), ():void => {
				expect( acl.grants ).toBeDefined();
				expect( Utils.isFunction( acl.grants ) ).toBe( true );

				expect( acl.grants( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#READ" ) ) ).toBeNull();
				expect( acl.grants( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#CREATE" ) ) ).toBeNull();

				let ace:ACE.Class;

				ace = ACE.Factory.createFrom(
					acl.createFragment(),
					true,
					[ acl.getPointer( "http://example.com/ns#Subject" ) ],
					acl.getPointer( "http://example.com/ns#SubjectClass" ),
					[ acl.getPointer( "http://example.com/ns#READ" ), acl.getPointer( "http://example.com/ns#WRITE" ) ]
				);
				acl.entries = [ ace ];

				expect( acl.grants( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#READ" ) ) ).toBe( true );
				expect( acl.grants( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#WRITE" ) ) ).toBe( true );

				expect( acl.grants( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#ANOTHER" ) ) ).toBeNull();
				expect( acl.grants( acl.getPointer( "http://example.com/ns#Subject-02" ), acl.getPointer( "http://example.com/ns#READ" ) ) ).toBeNull();

				ace = ACE.Factory.createFrom(
					acl.createFragment(),
					false,
					[ acl.getPointer( "http://example.com/ns#Subject" ) ],
					acl.getPointer( "http://example.com/ns#SubjectClass" ),
					[ acl.getPointer( "http://example.com/ns#CREATE" ), acl.getPointer( "http://example.com/ns#DELETE" ) ]
				);
				acl.entries.push( ace );

				expect( acl.grants( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#READ" ) ) ).toBe( true );
				expect( acl.grants( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#WRITE" ) ) ).toBe( true );

				expect( acl.grants( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#CREATE" ) ) ).toBe( false );
				expect( acl.grants( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#DELETE" ) ) ).toBe( false );

				expect( acl.grants( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#ANOTHER" ) ) ).toBeNull();
				expect( acl.grants( acl.getPointer( "http://example.com/ns#Subject-02" ), acl.getPointer( "http://example.com/ns#READ" ) ) ).toBeNull();
			} );

			it( hasMethod(
				INSTANCE,
				"denies",
				"Returns true if the subject has a configuration where it denies the permission specified for the document related to de ACL.\nReturns `null` if no configuration of the subject and permission exists in the ACL.", [
					{name: "subject", type: "string | Carbon.Pointer.Class", description: "The subject to look for its configuration."},
					{name: "permission", type: "string | Carbon.Pointer.Class", description: "The permission to check if it has a granting configuration."},
				],
				{type: "boolean"}
			), ():void => {
				expect( acl.denies ).toBeDefined();
				expect( Utils.isFunction( acl.denies ) ).toBe( true );

				expect( acl.denies( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#READ" ) ) ).toBeNull();
				expect( acl.denies( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#CREATE" ) ) ).toBeNull();

				let ace:ACE.Class;

				ace = ACE.Factory.createFrom(
					acl.createFragment(),
					false,
					[ acl.getPointer( "http://example.com/ns#Subject" ) ],
					acl.getPointer( "http://example.com/ns#SubjectClass" ),
					[ acl.getPointer( "http://example.com/ns#READ" ), acl.getPointer( "http://example.com/ns#WRITE" ) ]
				);
				acl.entries = [ ace ];

				expect( acl.denies( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#READ" ) ) ).toBe( true );
				expect( acl.denies( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#WRITE" ) ) ).toBe( true );

				expect( acl.denies( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#ANOTHER" ) ) ).toBeNull();
				expect( acl.denies( acl.getPointer( "http://example.com/ns#Subject-02" ), acl.getPointer( "http://example.com/ns#READ" ) ) ).toBeNull();

				ace = ACE.Factory.createFrom(
					acl.createFragment(),
					true,
					[ acl.getPointer( "http://example.com/ns#Subject" ) ],
					acl.getPointer( "http://example.com/ns#SubjectClass" ),
					[ acl.getPointer( "http://example.com/ns#CREATE" ), acl.getPointer( "http://example.com/ns#DELETE" ) ]
				);
				acl.entries.push( ace );

				expect( acl.denies( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#READ" ) ) ).toBe( true );
				expect( acl.denies( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#WRITE" ) ) ).toBe( true );

				expect( acl.denies( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#CREATE" ) ) ).toBe( false );
				expect( acl.denies( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#DELETE" ) ) ).toBe( false );

				expect( acl.denies( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#ANOTHER" ) ) ).toBeNull();
				expect( acl.denies( acl.getPointer( "http://example.com/ns#Subject-02" ), acl.getPointer( "http://example.com/ns#READ" ) ) ).toBeNull();
			} );

			it( hasMethod(
				INSTANCE,
				"getChildInheritance",
				"Returns if grants or denies a configuration of the subject and the permission specified for the children of document related to de ACL.\nReturns `null` if no configuration of the subject and permission exists in the ACL.", [
					{name: "subject", type: "string | Carbon.Pointer.Class", description: "The subject to look for its configuration."},
					{name: "permission", type: "string | Carbon.Pointer.Class", description: "The permission to check if it has a granting configuration."},
				],
				{type: "boolean"}
			), ():void => {
				expect( acl.getChildInheritance ).toBeDefined();
				expect( Utils.isFunction( acl.getChildInheritance ) ).toBe( true );

				expect( acl.getChildInheritance( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#READ" ) ) ).toBeNull();
				expect( acl.getChildInheritance( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#CREATE" ) ) ).toBeNull();

				let ace:ACE.Class;

				ace = ACE.Factory.createFrom(
					acl.createFragment(),
					true,
					[ acl.getPointer( "http://example.com/ns#Subject" ) ],
					acl.getPointer( "http://example.com/ns#SubjectClass" ),
					[ acl.getPointer( "http://example.com/ns#READ" ), acl.getPointer( "http://example.com/ns#WRITE" ) ]
				);
				acl.inheritableEntries = [ ace ];

				expect( acl.getChildInheritance( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#READ" ) ) ).toBe( true );
				expect( acl.getChildInheritance( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#WRITE" ) ) ).toBe( true );

				expect( acl.getChildInheritance( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#ANOTHER" ) ) ).toBeNull();
				expect( acl.getChildInheritance( acl.getPointer( "http://example.com/ns#Subject-02" ), acl.getPointer( "http://example.com/ns#READ" ) ) ).toBeNull();

				ace = ACE.Factory.createFrom(
					acl.createFragment(),
					false,
					[ acl.getPointer( "http://example.com/ns#Subject" ) ],
					acl.getPointer( "http://example.com/ns#SubjectClass" ),
					[ acl.getPointer( "http://example.com/ns#CREATE" ), acl.getPointer( "http://example.com/ns#DELETE" ) ]
				);
				acl.inheritableEntries.push( ace );

				expect( acl.getChildInheritance( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#READ" ) ) ).toBe( true );
				expect( acl.getChildInheritance( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#WRITE" ) ) ).toBe( true );

				expect( acl.getChildInheritance( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#CREATE" ) ) ).toBe( false );
				expect( acl.getChildInheritance( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#DELETE" ) ) ).toBe( false );

				expect( acl.getChildInheritance( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#ANOTHER" ) ) ).toBeNull();
				expect( acl.getChildInheritance( acl.getPointer( "http://example.com/ns#Subject-02" ), acl.getPointer( "http://example.com/ns#READ" ) ) ).toBeNull();
			} );

			describe( method(
				INSTANCE,
				"remove"
			), ():void => {

				it( isDefined(), ():void => {
					expect( acl.remove ).toBeDefined();
					expect( Utils.isFunction( acl.remove ) ).toBe( true );
				} );

				it( hasSignature(
					"Remove the configuration of a permission from a subject for the document related to the ACL.", [
						{name: "subject", type: "string | Carbon.Pointer.Class", description: "The subject from will be removed the permission."},
						{name: "permission", type: "string | Carbon.Pointer.Class", description: "The permission to remove from the subject configuration."},
					]
				), ():void => {
					acl.remove( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#READ" ) );
					acl.remove( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#CREATE" ) );

					let ace:ACE.Class;

					ace = ACE.Factory.createFrom(
						acl.createFragment(),
						true,
						[ acl.getPointer( "http://example.com/ns#Subject" ) ],
						acl.getPointer( "http://example.com/ns#SubjectClass" ),
						[ acl.getPointer( "http://example.com/ns#READ" ), acl.getPointer( "http://example.com/ns#WRITE" ) ]
					);
					acl.entries = [ ace ];

					expect( acl.grants( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#READ" ) ) ).toBe( true );
					expect( acl.grants( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#WRITE" ) ) ).toBe( true );
					expect( acl.grants( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#ANOTHER" ) ) ).toBeNull();

					acl.remove( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#READ" ) );
					expect( acl.grants( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#READ" ) ) ).toBeNull();
					expect( acl.grants( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#WRITE" ) ) ).toBe( true );
					expect( acl.grants( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#ANOTHER" ) ) ).toBeNull();

					acl.remove( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#CREATE" ) );
					expect( acl.grants( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#READ" ) ) ).toBeNull();
					expect( acl.grants( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#WRITE" ) ) ).toBe( true );
					expect( acl.grants( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#ANOTHER" ) ) ).toBeNull();

					acl.remove( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#WRITE" ) );
					expect( acl.grants( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#READ" ) ) ).toBeNull();
					expect( acl.grants( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#WRITE" ) ) ).toBeNull();
					expect( acl.grants( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#ANOTHER" ) ) ).toBeNull();

					expect( acl.entries.length ).toBe( 0 );

					ace = ACE.Factory.createFrom(
						acl.createFragment(),
						true,
						[ acl.getPointer( "http://example.com/ns#Subject" ) ],
						acl.getPointer( "http://example.com/ns#SubjectClass" ),
						[ acl.getPointer( "http://example.com/ns#READ" ), acl.getPointer( "http://example.com/ns#WRITE" ) ]
					);
					acl.entries.push( ace );
					acl.inheritableEntries = [ ace ];

					acl.remove( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#READ" ) );

					expect( acl.grants( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#READ" ) ) ).toBeNull();
					expect( acl.grants( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#WRITE" ) ) ).toBe( true );

					expect( acl.getChildInheritance( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#READ" ) ) ).toBe( true );
					expect( acl.getChildInheritance( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#WRITE" ) ) ).toBe( true );
				} );

				it( hasSignature(
					"Remove the configuration of several permissions from a subject for the document related to the ACL.", [
						{name: "subject", type: "string | Carbon.Pointer.Class", description: "The subject from will removed the permission."},
						{name: "permissions", type: "(string | Carbon.Pointer.Class)[]", description: "The permissions to remove from the subject configuration."},
					]
				), ():void => {
					acl.remove( acl.getPointer( "http://example.com/ns#Subject" ), [ acl.getPointer( "http://example.com/ns#READ" ) ] );
					acl.remove( acl.getPointer( "http://example.com/ns#Subject" ), [ acl.getPointer( "http://example.com/ns#READ" ), acl.getPointer( "http://example.com/ns#CREATE" ) ] );

					let ace:ACE.Class;

					ace = ACE.Factory.createFrom(
						acl.createFragment(),
						true,
						[ acl.getPointer( "http://example.com/ns#Subject" ) ],
						acl.getPointer( "http://example.com/ns#SubjectClass" ),
						[ acl.getPointer( "http://example.com/ns#READ" ), acl.getPointer( "http://example.com/ns#WRITE" ), acl.getPointer( "http://example.com/ns#CREATE" ) ]
					);
					acl.entries = [ ace ];

					expect( acl.grants( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#READ" ) ) ).toBe( true );
					expect( acl.grants( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#CREATE" ) ) ).toBe( true );
					expect( acl.grants( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#WRITE" ) ) ).toBe( true );
					expect( acl.grants( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#ANOTHER" ) ) ).toBeNull();

					acl.remove( acl.getPointer( "http://example.com/ns#Subject" ), [ acl.getPointer( "http://example.com/ns#READ" ), acl.getPointer( "http://example.com/ns#CREATE" ) ] );
					expect( acl.grants( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#READ" ) ) ).toBeNull();
					expect( acl.grants( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#CREATE" ) ) ).toBeNull();
					expect( acl.grants( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#WRITE" ) ) ).toBe( true );
					expect( acl.grants( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#ANOTHER" ) ) ).toBeNull();

					acl.remove( acl.getPointer( "http://example.com/ns#Subject" ), [ acl.getPointer( "http://example.com/ns#READ" ), acl.getPointer( "http://example.com/ns#WRITE" ) ] );
					expect( acl.grants( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#READ" ) ) ).toBeNull();
					expect( acl.grants( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#CREATE" ) ) ).toBeNull();
					expect( acl.grants( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#WRITE" ) ) ).toBeNull();
					expect( acl.grants( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#ANOTHER" ) ) ).toBeNull();

					expect( acl.entries.length ).toBe( 0 );

					ace = ACE.Factory.createFrom(
						acl.createFragment(),
						true,
						[ acl.getPointer( "http://example.com/ns#Subject" ) ],
						acl.getPointer( "http://example.com/ns#SubjectClass" ),
						[ acl.getPointer( "http://example.com/ns#READ" ), acl.getPointer( "http://example.com/ns#WRITE" ), acl.getPointer( "http://example.com/ns#CREATE" ) ]
					);
					acl.entries.push( ace );
					acl.inheritableEntries = [ ace ];

					acl.remove( acl.getPointer( "http://example.com/ns#Subject" ), [ acl.getPointer( "http://example.com/ns#READ" ), acl.getPointer( "http://example.com/ns#CREATE" ) ] );

					expect( acl.grants( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#READ" ) ) ).toBeNull();
					expect( acl.grants( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#CREATE" ) ) ).toBeNull();
					expect( acl.grants( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#WRITE" ) ) ).toBe( true );

					expect( acl.getChildInheritance( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#READ" ) ) ).toBe( true );
					expect( acl.getChildInheritance( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#CREATE" ) ) ).toBe( true );
					expect( acl.getChildInheritance( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#WRITE" ) ) ).toBe( true );
				} );

			} );

			describe( method(
				INSTANCE,
				"removeChildInheritance"
			), ():void => {

				it( isDefined(), ():void => {
					expect( acl.removeChildInheritance ).toBeDefined();
					expect( Utils.isFunction( acl.removeChildInheritance ) ).toBe( true );
				} );

				it( hasSignature(
					"Remove the configuration of a permission from a subject for the children of the document related to the ACL.", [
						{name: "subject", type: "string | Carbon.Pointer.Class", description: "The subject from will be removed the permission."},
						{name: "permission", type: "string | Carbon.Pointer.Class", description: "The permission to remove from the subject configuration."},
					]
				), ():void => {
					acl.removeChildInheritance( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#READ" ) );
					acl.removeChildInheritance( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#CREATE" ) );

					let ace:ACE.Class;

					ace = ACE.Factory.createFrom(
						acl.createFragment(),
						true,
						[ acl.getPointer( "http://example.com/ns#Subject" ) ],
						acl.getPointer( "http://example.com/ns#SubjectClass" ),
						[ acl.getPointer( "http://example.com/ns#READ" ), acl.getPointer( "http://example.com/ns#WRITE" ) ]
					);
					acl.inheritableEntries = [ ace ];

					expect( acl.getChildInheritance( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#READ" ) ) ).toBe( true );
					expect( acl.getChildInheritance( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#WRITE" ) ) ).toBe( true );
					expect( acl.getChildInheritance( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#ANOTHER" ) ) ).toBeNull();

					acl.removeChildInheritance( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#READ" ) );
					expect( acl.getChildInheritance( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#READ" ) ) ).toBeNull();
					expect( acl.getChildInheritance( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#WRITE" ) ) ).toBe( true );
					expect( acl.getChildInheritance( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#ANOTHER" ) ) ).toBeNull();

					acl.removeChildInheritance( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#CREATE" ) );
					expect( acl.getChildInheritance( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#READ" ) ) ).toBeNull();
					expect( acl.getChildInheritance( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#WRITE" ) ) ).toBe( true );
					expect( acl.getChildInheritance( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#ANOTHER" ) ) ).toBeNull();

					acl.removeChildInheritance( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#WRITE" ) );
					expect( acl.getChildInheritance( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#READ" ) ) ).toBeNull();
					expect( acl.getChildInheritance( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#WRITE" ) ) ).toBeNull();
					expect( acl.getChildInheritance( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#ANOTHER" ) ) ).toBeNull();

					expect( acl.inheritableEntries.length ).toBe( 0 );

					ace = ACE.Factory.createFrom(
						acl.createFragment(),
						true,
						[ acl.getPointer( "http://example.com/ns#Subject" ) ],
						acl.getPointer( "http://example.com/ns#SubjectClass" ),
						[ acl.getPointer( "http://example.com/ns#READ" ), acl.getPointer( "http://example.com/ns#WRITE" ) ]
					);
					acl.inheritableEntries.push( ace );
					acl.entries = [ ace ];

					acl.removeChildInheritance( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#READ" ) );

					expect( acl.getChildInheritance( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#READ" ) ) ).toBeNull();
					expect( acl.getChildInheritance( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#WRITE" ) ) ).toBe( true );

					expect( acl.grants( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#READ" ) ) ).toBe( true );
					expect( acl.grants( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#WRITE" ) ) ).toBe( true );
				} );

				it( hasSignature(
					"Remove the configuration of several permissions from a subject for the children of the document related to the ACL.", [
						{name: "subject", type: "string | Carbon.Pointer.Class", description: "The subject from will removed the permission."},
						{name: "permissions", type: "(string | Carbon.Pointer.Class)[]", description: "The permissions to remove from the subject configuration."},
					]
				), ():void => {
					acl.removeChildInheritance( acl.getPointer( "http://example.com/ns#Subject" ), [ acl.getPointer( "http://example.com/ns#READ" ) ] );
					acl.removeChildInheritance( acl.getPointer( "http://example.com/ns#Subject" ), [ acl.getPointer( "http://example.com/ns#READ" ), acl.getPointer( "http://example.com/ns#CREATE" ) ] );

					let ace:ACE.Class;

					ace = ACE.Factory.createFrom(
						acl.createFragment(),
						true,
						[ acl.getPointer( "http://example.com/ns#Subject" ) ],
						acl.getPointer( "http://example.com/ns#SubjectClass" ),
						[ acl.getPointer( "http://example.com/ns#READ" ), acl.getPointer( "http://example.com/ns#WRITE" ), acl.getPointer( "http://example.com/ns#CREATE" ) ]
					);
					acl.inheritableEntries = [ ace ];

					expect( acl.getChildInheritance( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#READ" ) ) ).toBe( true );
					expect( acl.getChildInheritance( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#CREATE" ) ) ).toBe( true );
					expect( acl.getChildInheritance( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#WRITE" ) ) ).toBe( true );
					expect( acl.getChildInheritance( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#ANOTHER" ) ) ).toBeNull();

					acl.removeChildInheritance( acl.getPointer( "http://example.com/ns#Subject" ), [ acl.getPointer( "http://example.com/ns#READ" ), acl.getPointer( "http://example.com/ns#CREATE" ) ] );
					expect( acl.getChildInheritance( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#READ" ) ) ).toBeNull();
					expect( acl.getChildInheritance( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#CREATE" ) ) ).toBeNull();
					expect( acl.getChildInheritance( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#WRITE" ) ) ).toBe( true );
					expect( acl.getChildInheritance( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#ANOTHER" ) ) ).toBeNull();

					acl.removeChildInheritance( acl.getPointer( "http://example.com/ns#Subject" ), [ acl.getPointer( "http://example.com/ns#READ" ), acl.getPointer( "http://example.com/ns#WRITE" ) ] );
					expect( acl.getChildInheritance( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#READ" ) ) ).toBeNull();
					expect( acl.getChildInheritance( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#CREATE" ) ) ).toBeNull();
					expect( acl.getChildInheritance( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#WRITE" ) ) ).toBeNull();
					expect( acl.getChildInheritance( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#ANOTHER" ) ) ).toBeNull();

					expect( acl.inheritableEntries.length ).toBe( 0 );

					ace = ACE.Factory.createFrom(
						acl.createFragment(),
						true,
						[ acl.getPointer( "http://example.com/ns#Subject" ) ],
						acl.getPointer( "http://example.com/ns#SubjectClass" ),
						[ acl.getPointer( "http://example.com/ns#READ" ), acl.getPointer( "http://example.com/ns#WRITE" ), acl.getPointer( "http://example.com/ns#CREATE" ) ]
					);
					acl.inheritableEntries.push( ace );
					acl.entries = [ ace ];

					acl.removeChildInheritance( acl.getPointer( "http://example.com/ns#Subject" ), [ acl.getPointer( "http://example.com/ns#READ" ), acl.getPointer( "http://example.com/ns#CREATE" ) ] );

					expect( acl.getChildInheritance( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#READ" ) ) ).toBeNull();
					expect( acl.getChildInheritance( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#CREATE" ) ) ).toBeNull();
					expect( acl.getChildInheritance( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#WRITE" ) ) ).toBe( true );

					expect( acl.grants( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#READ" ) ) ).toBe( true );
					expect( acl.grants( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#CREATE" ) ) ).toBe( true );
					expect( acl.grants( acl.getPointer( "http://example.com/ns#Subject" ), acl.getPointer( "http://example.com/ns#WRITE" ) ) ).toBe( true );
				} );

			} );

		} );

	} );

} );
