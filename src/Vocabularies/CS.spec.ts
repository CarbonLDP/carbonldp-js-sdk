import {
	hasProperty,
	module,
	namespaze,
	INSTANCE,
} from "../test/JasmineExtender";

import { CS } from "./CS";

describe( module( "CarbonLDP/Vocabularies/CS" ), ():void => {

	describe( namespaze( "CarbonLDP.Vocabularies.CS", "Vocabulary for the security system of Carbon LDP." ), ():void => {

		it( "should exists", ():void => {
			expect( CS ).toBeDefined();
			expect( CS ).toEqual( jasmine.any( Object ) );
		} );

		it( "should test all exported IRIs", ():void => {
			expect( Object.keys( CS ).length ).toBe( 43 );
		} );

		it( hasProperty(
			INSTANCE,
			"namespace",
			"string"
		), ():void => {
			expect( CS.namespace ).toEqual( jasmine.any( String ) );
			expect( CS.namespace ).toBe( "https://carbonldp.com/ns/v1/security#" );
		} );

		it( hasProperty(
			INSTANCE,
			"AccessControlEntry",
			"string"
		), ():void => {
			expect( CS.AccessControlEntry ).toEqual( jasmine.any( String ) );
			expect( CS.AccessControlEntry ).toBe( "https://carbonldp.com/ns/v1/security#AccessControlEntry" );
		} );

		it( hasProperty(
			INSTANCE,
			"AccessControlList",
			"string"
		), ():void => {
			expect( CS.AccessControlList ).toEqual( jasmine.any( String ) );
			expect( CS.AccessControlList ).toBe( "https://carbonldp.com/ns/v1/security#AccessControlList" );
		} );

		it( hasProperty(
			INSTANCE,
			"AllOrigins",
			"string"
		), ():void => {
			expect( CS.AllOrigins ).toEqual( jasmine.any( String ) );
			expect( CS.AllOrigins ).toBe( "https://carbonldp.com/ns/v1/security#AllOrigins" );
		} );

		it( hasProperty(
			INSTANCE,
			"CreateAccessPoint",
			"string"
		), ():void => {
			expect( CS.CreateAccessPoint ).toEqual( jasmine.any( String ) );
			expect( CS.CreateAccessPoint ).toBe( "https://carbonldp.com/ns/v1/security#CreateAccessPoint" );
		} );

		it( hasProperty(
			INSTANCE,
			"CreateChild",
			"string"
		), ():void => {
			expect( CS.CreateChild ).toEqual( jasmine.any( String ) );
			expect( CS.CreateChild ).toBe( "https://carbonldp.com/ns/v1/security#CreateChild" );
		} );

		it( hasProperty(
			INSTANCE,
			"Credentials",
			"string"
		), ():void => {
			expect( CS.Credentials ).toEqual( jasmine.any( String ) );
			expect( CS.Credentials ).toBe( "https://carbonldp.com/ns/v1/security#Credentials" );
		} );

		it( hasProperty(
			INSTANCE,
			"Delete",
			"string"
		), ():void => {
			expect( CS.Delete ).toEqual( jasmine.any( String ) );
			expect( CS.Delete ).toBe( "https://carbonldp.com/ns/v1/security#Delete" );
		} );

		it( hasProperty(
			INSTANCE,
			"Download",
			"string"
		), ():void => {
			expect( CS.Download ).toEqual( jasmine.any( String ) );
			expect( CS.Download ).toBe( "https://carbonldp.com/ns/v1/security#Download" );
		} );

		it( hasProperty(
			INSTANCE,
			"Extend",
			"string"
		), ():void => {
			expect( CS.Extend ).toEqual( jasmine.any( String ) );
			expect( CS.Extend ).toBe( "https://carbonldp.com/ns/v1/security#Extend" );
		} );

		it( hasProperty(
			INSTANCE,
			"ManageSecurity",
			"string"
		), ():void => {
			expect( CS.ManageSecurity ).toEqual( jasmine.any( String ) );
			expect( CS.ManageSecurity ).toBe( "https://carbonldp.com/ns/v1/security#ManageSecurity" );
		} );

		it( hasProperty(
			INSTANCE,
			"ProtectedDocument",
			"string"
		), ():void => {
			expect( CS.ProtectedDocument ).toEqual( jasmine.any( String ) );
			expect( CS.ProtectedDocument ).toBe( "https://carbonldp.com/ns/v1/security#ProtectedDocument" );
		} );

		it( hasProperty(
			INSTANCE,
			"Read",
			"string"
		), ():void => {
			expect( CS.Read ).toEqual( jasmine.any( String ) );
			expect( CS.Read ).toBe( "https://carbonldp.com/ns/v1/security#Read" );
		} );

		it( hasProperty(
			INSTANCE,
			"RemoveMember",
			"string"
		), ():void => {
			expect( CS.RemoveMember ).toEqual( jasmine.any( String ) );
			expect( CS.RemoveMember ).toBe( "https://carbonldp.com/ns/v1/security#RemoveMember" );
		} );

		it( hasProperty(
			INSTANCE,
			"Role",
			"string"
		), ():void => {
			expect( CS.Role ).toEqual( jasmine.any( String ) );
			expect( CS.Role ).toBe( "https://carbonldp.com/ns/v1/security#Role" );
		} );

		it( hasProperty(
			INSTANCE,
			"Ticket",
			"string"
		), ():void => {
			expect( CS.Ticket ).toEqual( jasmine.any( String ) );
			expect( CS.Ticket ).toBe( "https://carbonldp.com/ns/v1/security#Ticket" );
		} );

		it( hasProperty(
			INSTANCE,
			"Token",
			"string"
		), ():void => {
			expect( CS.Token ).toEqual( jasmine.any( String ) );
			expect( CS.Token ).toBe( "https://carbonldp.com/ns/v1/security#Token" );
		} );

		it( hasProperty(
			INSTANCE,
			"Update",
			"string"
		), ():void => {
			expect( CS.Update ).toEqual( jasmine.any( String ) );
			expect( CS.Update ).toBe( "https://carbonldp.com/ns/v1/security#Update" );
		} );

		it( hasProperty(
			INSTANCE,
			"Upload",
			"string"
		), ():void => {
			expect( CS.Upload ).toEqual( jasmine.any( String ) );
			expect( CS.Upload ).toBe( "https://carbonldp.com/ns/v1/security#Upload" );
		} );

		it( hasProperty(
			INSTANCE,
			"User",
			"string"
		), ():void => {
			expect( CS.User ).toEqual( jasmine.any( String ) );
			expect( CS.User ).toBe( "https://carbonldp.com/ns/v1/security#User" );
		} );

		it( hasProperty(
			INSTANCE,
			"accessControlEntry",
			"string"
		), ():void => {
			expect( CS.accessControlEntry ).toEqual( jasmine.any( String ) );
			expect( CS.accessControlEntry ).toBe( "https://carbonldp.com/ns/v1/security#accessControlEntry" );
		} );

		it( hasProperty(
			INSTANCE,
			"accessControlList",
			"string"
		), ():void => {
			expect( CS.accessControlList ).toEqual( jasmine.any( String ) );
			expect( CS.accessControlList ).toBe( "https://carbonldp.com/ns/v1/security#accessControlList" );
		} );

		it( hasProperty(
			INSTANCE,
			"accessTo",
			"string"
		), ():void => {
			expect( CS.accessTo ).toEqual( jasmine.any( String ) );
			expect( CS.accessTo ).toBe( "https://carbonldp.com/ns/v1/security#accessTo" );
		} );

		it( hasProperty(
			INSTANCE,
			"allowsOrigin",
			"string"
		), ():void => {
			expect( CS.allowsOrigin ).toEqual( jasmine.any( String ) );
			expect( CS.allowsOrigin ).toBe( "https://carbonldp.com/ns/v1/security#allowsOrigin" );
		} );

		it( hasProperty(
			INSTANCE,
			"childRole",
			"string"
		), ():void => {
			expect( CS.childRole ).toEqual( jasmine.any( String ) );
			expect( CS.childRole ).toBe( "https://carbonldp.com/ns/v1/security#childRole" );
		} );

		it( hasProperty(
			INSTANCE,
			"credentials",
			"string"
		), ():void => {
			expect( CS.credentials ).toEqual( jasmine.any( String ) );
			expect( CS.credentials ).toBe( "https://carbonldp.com/ns/v1/security#credentials" );
		} );

		it( hasProperty(
			INSTANCE,
			"credentialsOf",
			"string"
		), ():void => {
			expect( CS.credentialsOf ).toEqual( jasmine.any( String ) );
			expect( CS.credentialsOf ).toBe( "https://carbonldp.com/ns/v1/security#credentialsOf" );
		} );

		it( hasProperty(
			INSTANCE,
			"description",
			"string"
		), ():void => {
			expect( CS.description ).toEqual( jasmine.any( String ) );
			expect( CS.description ).toBe( "https://carbonldp.com/ns/v1/security#description" );
		} );

		it( hasProperty(
			INSTANCE,
			"enabled",
			"string"
		), ():void => {
			expect( CS.enabled ).toEqual( jasmine.any( String ) );
			expect( CS.enabled ).toBe( "https://carbonldp.com/ns/v1/security#enabled" );
		} );

		it( hasProperty(
			INSTANCE,
			"expirationTime",
			"string"
		), ():void => {
			expect( CS.expirationTime ).toEqual( jasmine.any( String ) );
			expect( CS.expirationTime ).toBe( "https://carbonldp.com/ns/v1/security#expirationTime" );
		} );

		it( hasProperty(
			INSTANCE,
			"forIRI",
			"string"
		), ():void => {
			expect( CS.forIRI ).toEqual( jasmine.any( String ) );
			expect( CS.forIRI ).toBe( "https://carbonldp.com/ns/v1/security#forIRI" );
		} );

		it( hasProperty(
			INSTANCE,
			"granting",
			"string"
		), ():void => {
			expect( CS.granting ).toEqual( jasmine.any( String ) );
			expect( CS.granting ).toBe( "https://carbonldp.com/ns/v1/security#granting" );
		} );

		it( hasProperty(
			INSTANCE,
			"inheritableEntry",
			"string"
		), ():void => {
			expect( CS.inheritableEntry ).toEqual( jasmine.any( String ) );
			expect( CS.inheritableEntry ).toBe( "https://carbonldp.com/ns/v1/security#inheritableEntry" );
		} );

		it( hasProperty(
			INSTANCE,
			"name",
			"string"
		), ():void => {
			expect( CS.name ).toEqual( jasmine.any( String ) );
			expect( CS.name ).toBe( "https://carbonldp.com/ns/v1/security#name" );
		} );

		it( hasProperty(
			INSTANCE,
			"parentRole",
			"string"
		), ():void => {
			expect( CS.parentRole ).toEqual( jasmine.any( String ) );
			expect( CS.parentRole ).toBe( "https://carbonldp.com/ns/v1/security#parentRole" );
		} );

		it( hasProperty(
			INSTANCE,
			"password",
			"string"
		), ():void => {
			expect( CS.password ).toEqual( jasmine.any( String ) );
			expect( CS.password ).toBe( "https://carbonldp.com/ns/v1/security#password" );
		} );

		it( hasProperty(
			INSTANCE,
			"permission",
			"string"
		), ():void => {
			expect( CS.permission ).toEqual( jasmine.any( String ) );
			expect( CS.permission ).toBe( "https://carbonldp.com/ns/v1/security#permission" );
		} );

		it( hasProperty(
			INSTANCE,
			"rootContainer",
			"string"
		), ():void => {
			expect( CS.rootContainer ).toEqual( jasmine.any( String ) );
			expect( CS.rootContainer ).toBe( "https://carbonldp.com/ns/v1/security#rootContainer" );
		} );

		it( hasProperty(
			INSTANCE,
			"subject",
			"string"
		), ():void => {
			expect( CS.subject ).toEqual( jasmine.any( String ) );
			expect( CS.subject ).toBe( "https://carbonldp.com/ns/v1/security#subject" );
		} );

		it( hasProperty(
			INSTANCE,
			"subjectClass",
			"string"
		), ():void => {
			expect( CS.subjectClass ).toEqual( jasmine.any( String ) );
			expect( CS.subjectClass ).toBe( "https://carbonldp.com/ns/v1/security#subjectClass" );
		} );

		it( hasProperty(
			INSTANCE,
			"ticketKey",
			"string"
		), ():void => {
			expect( CS.ticketKey ).toEqual( jasmine.any( String ) );
			expect( CS.ticketKey ).toBe( "https://carbonldp.com/ns/v1/security#ticketKey" );
		} );

		it( hasProperty(
			INSTANCE,
			"tokenKey",
			"string"
		), ():void => {
			expect( CS.tokenKey ).toEqual( jasmine.any( String ) );
			expect( CS.tokenKey ).toBe( "https://carbonldp.com/ns/v1/security#tokenKey" );
		} );

		it( hasProperty(
			INSTANCE,
			"user",
			"string"
		), ():void => {
			expect( CS.user ).toEqual( jasmine.any( String ) );
			expect( CS.user ).toBe( "https://carbonldp.com/ns/v1/security#user" );
		} );

	} );

} );
