import {
	hasProperty,
	interfaze,
	module,
	OBLIGATORY,
	property,
	STATIC,
} from "../test/JasmineExtender";

import { CS } from "./CS";

describe( module( "carbonldp/Vocabularies/CS" ), ():void => {

	describe( interfaze(
		"CarbonLDP.Vocabularies.CS",
		"Interface that describes the vocabulary for the security system of Carbon LDP."
	), ():void => {

		it( hasProperty(
			OBLIGATORY,
			"namespace",
			"https://carbonldp.com/ns/v1/security#"
		), ():void => {
			const target:CS[ "namespace" ] = "https://carbonldp.com/ns/v1/security#";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"AccessControlEntry",
			"https://carbonldp.com/ns/v1/security#AccessControlEntry"
		), ():void => {
			const target:CS[ "AccessControlEntry" ] = "https://carbonldp.com/ns/v1/security#AccessControlEntry";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"AccessControlList",
			"https://carbonldp.com/ns/v1/security#AccessControlList"
		), ():void => {
			const target:CS[ "AccessControlList" ] = "https://carbonldp.com/ns/v1/security#AccessControlList";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"AllOrigins",
			"https://carbonldp.com/ns/v1/security#AllOrigins"
		), ():void => {
			const target:CS[ "AllOrigins" ] = "https://carbonldp.com/ns/v1/security#AllOrigins";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"AuthenticatedUserMetadata",
			"https://carbonldp.com/ns/v1/security#AuthenticatedUserMetadata"
		), ():void => {
			const target:CS[ "AuthenticatedUserMetadata" ] = "https://carbonldp.com/ns/v1/security#AuthenticatedUserMetadata";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"CreateAccessPoint",
			"https://carbonldp.com/ns/v1/security#CreateAccessPoint"
		), ():void => {
			const target:CS[ "CreateAccessPoint" ] = "https://carbonldp.com/ns/v1/security#CreateAccessPoint";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"CreateChild",
			"https://carbonldp.com/ns/v1/security#CreateChild"
		), ():void => {
			const target:CS[ "CreateChild" ] = "https://carbonldp.com/ns/v1/security#CreateChild";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"Credentials",
			"https://carbonldp.com/ns/v1/security#Credentials"
		), ():void => {
			const target:CS[ "Credentials" ] = "https://carbonldp.com/ns/v1/security#Credentials";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"Delete",
			"https://carbonldp.com/ns/v1/security#Delete"
		), ():void => {
			const target:CS[ "Delete" ] = "https://carbonldp.com/ns/v1/security#Delete";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"Download",
			"https://carbonldp.com/ns/v1/security#Download"
		), ():void => {
			const target:CS[ "Download" ] = "https://carbonldp.com/ns/v1/security#Download";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"Extend",
			"https://carbonldp.com/ns/v1/security#Extend"
		), ():void => {
			const target:CS[ "Extend" ] = "https://carbonldp.com/ns/v1/security#Extend";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"ManageSecurity",
			"https://carbonldp.com/ns/v1/security#ManageSecurity"
		), ():void => {
			const target:CS[ "ManageSecurity" ] = "https://carbonldp.com/ns/v1/security#ManageSecurity";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"ProtectedDocument",
			"https://carbonldp.com/ns/v1/security#ProtectedDocument"
		), ():void => {
			const target:CS[ "ProtectedDocument" ] = "https://carbonldp.com/ns/v1/security#ProtectedDocument";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"Read",
			"https://carbonldp.com/ns/v1/security#Read"
		), ():void => {
			const target:CS[ "Read" ] = "https://carbonldp.com/ns/v1/security#Read";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"RemoveMember",
			"https://carbonldp.com/ns/v1/security#RemoveMember"
		), ():void => {
			const target:CS[ "RemoveMember" ] = "https://carbonldp.com/ns/v1/security#RemoveMember";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"Role",
			"https://carbonldp.com/ns/v1/security#Role"
		), ():void => {
			const target:CS[ "Role" ] = "https://carbonldp.com/ns/v1/security#Role";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"Ticket",
			"https://carbonldp.com/ns/v1/security#Ticket"
		), ():void => {
			const target:CS[ "Ticket" ] = "https://carbonldp.com/ns/v1/security#Ticket";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"Token",
			"https://carbonldp.com/ns/v1/security#Token"
		), ():void => {
			const target:CS[ "Token" ] = "https://carbonldp.com/ns/v1/security#Token";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"Update",
			"https://carbonldp.com/ns/v1/security#Update"
		), ():void => {
			const target:CS[ "Update" ] = "https://carbonldp.com/ns/v1/security#Update";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"Upload",
			"https://carbonldp.com/ns/v1/security#Upload"
		), ():void => {
			const target:CS[ "Upload" ] = "https://carbonldp.com/ns/v1/security#Upload";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"User",
			"https://carbonldp.com/ns/v1/security#User"
		), ():void => {
			const target:CS[ "User" ] = "https://carbonldp.com/ns/v1/security#User";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"UserMetadata",
			"https://carbonldp.com/ns/v1/security#UserMetadata"
		), ():void => {
			const target:CS[ "UserMetadata" ] = "https://carbonldp.com/ns/v1/security#UserMetadata";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"accessControlEntry",
			"https://carbonldp.com/ns/v1/security#accessControlEntry"
		), ():void => {
			const target:CS[ "accessControlEntry" ] = "https://carbonldp.com/ns/v1/security#accessControlEntry";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"accessControlList",
			"https://carbonldp.com/ns/v1/security#accessControlList"
		), ():void => {
			const target:CS[ "accessControlList" ] = "https://carbonldp.com/ns/v1/security#accessControlList";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"accessTo",
			"https://carbonldp.com/ns/v1/security#accessTo"
		), ():void => {
			const target:CS[ "accessTo" ] = "https://carbonldp.com/ns/v1/security#accessTo";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"allowsOrigin",
			"https://carbonldp.com/ns/v1/security#allowsOrigin"
		), ():void => {
			const target:CS[ "allowsOrigin" ] = "https://carbonldp.com/ns/v1/security#allowsOrigin";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"childRole",
			"https://carbonldp.com/ns/v1/security#childRole"
		), ():void => {
			const target:CS[ "childRole" ] = "https://carbonldp.com/ns/v1/security#childRole";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"credentials",
			"https://carbonldp.com/ns/v1/security#credentials"
		), ():void => {
			const target:CS[ "credentials" ] = "https://carbonldp.com/ns/v1/security#credentials";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"credentialsOf",
			"https://carbonldp.com/ns/v1/security#credentialsOf"
		), ():void => {
			const target:CS[ "credentialsOf" ] = "https://carbonldp.com/ns/v1/security#credentialsOf";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"description",
			"https://carbonldp.com/ns/v1/security#description"
		), ():void => {
			const target:CS[ "description" ] = "https://carbonldp.com/ns/v1/security#description";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"enabled",
			"https://carbonldp.com/ns/v1/security#enabled"
		), ():void => {
			const target:CS[ "enabled" ] = "https://carbonldp.com/ns/v1/security#enabled";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"expirationTime",
			"https://carbonldp.com/ns/v1/security#expirationTime"
		), ():void => {
			const target:CS[ "expirationTime" ] = "https://carbonldp.com/ns/v1/security#expirationTime";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"forIRI",
			"https://carbonldp.com/ns/v1/security#forIRI"
		), ():void => {
			const target:CS[ "forIRI" ] = "https://carbonldp.com/ns/v1/security#forIRI";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"granting",
			"https://carbonldp.com/ns/v1/security#granting"
		), ():void => {
			const target:CS[ "granting" ] = "https://carbonldp.com/ns/v1/security#granting";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"inheritableEntry",
			"https://carbonldp.com/ns/v1/security#inheritableEntry"
		), ():void => {
			const target:CS[ "inheritableEntry" ] = "https://carbonldp.com/ns/v1/security#inheritableEntry";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"name",
			"https://carbonldp.com/ns/v1/security#name"
		), ():void => {
			const target:CS[ "name" ] = "https://carbonldp.com/ns/v1/security#name";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"parentRole",
			"https://carbonldp.com/ns/v1/security#parentRole"
		), ():void => {
			const target:CS[ "parentRole" ] = "https://carbonldp.com/ns/v1/security#parentRole";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"password",
			"https://carbonldp.com/ns/v1/security#password"
		), ():void => {
			const target:CS[ "password" ] = "https://carbonldp.com/ns/v1/security#password";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"permission",
			"https://carbonldp.com/ns/v1/security#permission"
		), ():void => {
			const target:CS[ "permission" ] = "https://carbonldp.com/ns/v1/security#permission";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"rootContainer",
			"https://carbonldp.com/ns/v1/security#rootContainer"
		), ():void => {
			const target:CS[ "rootContainer" ] = "https://carbonldp.com/ns/v1/security#rootContainer";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"subject",
			"https://carbonldp.com/ns/v1/security#subject"
		), ():void => {
			const target:CS[ "subject" ] = "https://carbonldp.com/ns/v1/security#subject";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"subjectClass",
			"https://carbonldp.com/ns/v1/security#subjectClass"
		), ():void => {
			const target:CS[ "subjectClass" ] = "https://carbonldp.com/ns/v1/security#subjectClass";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"ticketKey",
			"https://carbonldp.com/ns/v1/security#ticketKey"
		), ():void => {
			const target:CS[ "ticketKey" ] = "https://carbonldp.com/ns/v1/security#ticketKey";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"tokenKey",
			"https://carbonldp.com/ns/v1/security#tokenKey"
		), ():void => {
			const target:CS[ "tokenKey" ] = "https://carbonldp.com/ns/v1/security#tokenKey";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"user",
			"https://carbonldp.com/ns/v1/security#user"
		), ():void => {
			const target:CS[ "user" ] = "https://carbonldp.com/ns/v1/security#user";
			expect( target ).toBeDefined();
		} );

	} );

	describe( property(
		STATIC,
		"CS",
		"CarbonLDP.Vocabularies.CS",
		"Constant that implements the vocabulary for the security system of Carbon LDP."
	), ():void => {

		it( "should exists", ():void => {
			expect( CS ).toBeDefined();
			expect( CS ).toEqual( jasmine.any( Object ) );
		} );

		it( "should test all exported IRIs", ():void => {
			expect( Object.keys( CS ).length ).toBe( 46 );
		} );

		it( "CS.namespace", ():void => {
			expect( CS.namespace ).toEqual( jasmine.any( String ) );
			expect( CS.namespace ).toBe( "https://carbonldp.com/ns/v1/security#" );
		} );

		it( "CS.AccessControlEntry", ():void => {
			expect( CS.AccessControlEntry ).toEqual( jasmine.any( String ) );
			expect( CS.AccessControlEntry ).toBe( "https://carbonldp.com/ns/v1/security#AccessControlEntry" );
		} );

		it( "CS.AccessControlList", ():void => {
			expect( CS.AccessControlList ).toEqual( jasmine.any( String ) );
			expect( CS.AccessControlList ).toBe( "https://carbonldp.com/ns/v1/security#AccessControlList" );
		} );

		it( "CS.AllOrigins", ():void => {
			expect( CS.AllOrigins ).toEqual( jasmine.any( String ) );
			expect( CS.AllOrigins ).toBe( "https://carbonldp.com/ns/v1/security#AllOrigins" );
		} );

		it( "CS.AuthenticatedUserMetadata", ():void => {
			expect( CS.AuthenticatedUserMetadata ).toEqual( jasmine.any( String ) );
			expect( CS.AuthenticatedUserMetadata ).toBe( "https://carbonldp.com/ns/v1/security#AuthenticatedUserMetadata" );
		} );

		it( "CS.CreateAccessPoint", ():void => {
			expect( CS.CreateAccessPoint ).toEqual( jasmine.any( String ) );
			expect( CS.CreateAccessPoint ).toBe( "https://carbonldp.com/ns/v1/security#CreateAccessPoint" );
		} );

		it( "CS.CreateChild", ():void => {
			expect( CS.CreateChild ).toEqual( jasmine.any( String ) );
			expect( CS.CreateChild ).toBe( "https://carbonldp.com/ns/v1/security#CreateChild" );
		} );

		it( "CS.Credentials", ():void => {
			expect( CS.Credentials ).toEqual( jasmine.any( String ) );
			expect( CS.Credentials ).toBe( "https://carbonldp.com/ns/v1/security#Credentials" );
		} );

		it( "CS.Delete", ():void => {
			expect( CS.Delete ).toEqual( jasmine.any( String ) );
			expect( CS.Delete ).toBe( "https://carbonldp.com/ns/v1/security#Delete" );
		} );

		it( "CS.Download", ():void => {
			expect( CS.Download ).toEqual( jasmine.any( String ) );
			expect( CS.Download ).toBe( "https://carbonldp.com/ns/v1/security#Download" );
		} );

		it( "CS.Extend", ():void => {
			expect( CS.Extend ).toEqual( jasmine.any( String ) );
			expect( CS.Extend ).toBe( "https://carbonldp.com/ns/v1/security#Extend" );
		} );

		it( "CS.ManageSecurity", ():void => {
			expect( CS.ManageSecurity ).toEqual( jasmine.any( String ) );
			expect( CS.ManageSecurity ).toBe( "https://carbonldp.com/ns/v1/security#ManageSecurity" );
		} );

		it( "CS.ProtectedDocument", ():void => {
			expect( CS.ProtectedDocument ).toEqual( jasmine.any( String ) );
			expect( CS.ProtectedDocument ).toBe( "https://carbonldp.com/ns/v1/security#ProtectedDocument" );
		} );

		it( "CS.Read", ():void => {
			expect( CS.Read ).toEqual( jasmine.any( String ) );
			expect( CS.Read ).toBe( "https://carbonldp.com/ns/v1/security#Read" );
		} );

		it( "CS.RemoveMember", ():void => {
			expect( CS.RemoveMember ).toEqual( jasmine.any( String ) );
			expect( CS.RemoveMember ).toBe( "https://carbonldp.com/ns/v1/security#RemoveMember" );
		} );

		it( "CS.Role", ():void => {
			expect( CS.Role ).toEqual( jasmine.any( String ) );
			expect( CS.Role ).toBe( "https://carbonldp.com/ns/v1/security#Role" );
		} );

		it( "CS.Ticket", ():void => {
			expect( CS.Ticket ).toEqual( jasmine.any( String ) );
			expect( CS.Ticket ).toBe( "https://carbonldp.com/ns/v1/security#Ticket" );
		} );

		it( "CS.Token", ():void => {
			expect( CS.Token ).toEqual( jasmine.any( String ) );
			expect( CS.Token ).toBe( "https://carbonldp.com/ns/v1/security#Token" );
		} );

		it( "CS.Update", ():void => {
			expect( CS.Update ).toEqual( jasmine.any( String ) );
			expect( CS.Update ).toBe( "https://carbonldp.com/ns/v1/security#Update" );
		} );

		it( "CS.Upload", ():void => {
			expect( CS.Upload ).toEqual( jasmine.any( String ) );
			expect( CS.Upload ).toBe( "https://carbonldp.com/ns/v1/security#Upload" );
		} );

		it( "CS.User", ():void => {
			expect( CS.User ).toEqual( jasmine.any( String ) );
			expect( CS.User ).toBe( "https://carbonldp.com/ns/v1/security#User" );
		} );

		it( "CS.UserMetadata", ():void => {
			expect( CS.UserMetadata ).toEqual( jasmine.any( String ) );
			expect( CS.UserMetadata ).toBe( "https://carbonldp.com/ns/v1/security#UserMetadata" );
		} );


		it( "CS.accessControlEntry", ():void => {
			expect( CS.accessControlEntry ).toEqual( jasmine.any( String ) );
			expect( CS.accessControlEntry ).toBe( "https://carbonldp.com/ns/v1/security#accessControlEntry" );
		} );

		it( "CS.accessControlList", ():void => {
			expect( CS.accessControlList ).toEqual( jasmine.any( String ) );
			expect( CS.accessControlList ).toBe( "https://carbonldp.com/ns/v1/security#accessControlList" );
		} );

		it( "CS.accessTo", ():void => {
			expect( CS.accessTo ).toEqual( jasmine.any( String ) );
			expect( CS.accessTo ).toBe( "https://carbonldp.com/ns/v1/security#accessTo" );
		} );

		it( "CS.allowsOrigin", ():void => {
			expect( CS.allowsOrigin ).toEqual( jasmine.any( String ) );
			expect( CS.allowsOrigin ).toBe( "https://carbonldp.com/ns/v1/security#allowsOrigin" );
		} );

		it( "CS.authenticatedUser", ():void => {
			expect( CS.authenticatedUser ).toEqual( jasmine.any( String ) );
			expect( CS.authenticatedUser ).toBe( "https://carbonldp.com/ns/v1/security#authenticatedUser" );
		} );

		it( "CS.childRole", ():void => {
			expect( CS.childRole ).toEqual( jasmine.any( String ) );
			expect( CS.childRole ).toBe( "https://carbonldp.com/ns/v1/security#childRole" );
		} );

		it( "CS.credentials", ():void => {
			expect( CS.credentials ).toEqual( jasmine.any( String ) );
			expect( CS.credentials ).toBe( "https://carbonldp.com/ns/v1/security#credentials" );
		} );

		it( "CS.credentialsOf", ():void => {
			expect( CS.credentialsOf ).toEqual( jasmine.any( String ) );
			expect( CS.credentialsOf ).toBe( "https://carbonldp.com/ns/v1/security#credentialsOf" );
		} );

		it( "CS.description", ():void => {
			expect( CS.description ).toEqual( jasmine.any( String ) );
			expect( CS.description ).toBe( "https://carbonldp.com/ns/v1/security#description" );
		} );

		it( "CS.enabled", ():void => {
			expect( CS.enabled ).toEqual( jasmine.any( String ) );
			expect( CS.enabled ).toBe( "https://carbonldp.com/ns/v1/security#enabled" );
		} );

		it( "CS.expirationTime", ():void => {
			expect( CS.expirationTime ).toEqual( jasmine.any( String ) );
			expect( CS.expirationTime ).toBe( "https://carbonldp.com/ns/v1/security#expirationTime" );
		} );

		it( "CS.forIRI", ():void => {
			expect( CS.forIRI ).toEqual( jasmine.any( String ) );
			expect( CS.forIRI ).toBe( "https://carbonldp.com/ns/v1/security#forIRI" );
		} );

		it( "CS.granting", ():void => {
			expect( CS.granting ).toEqual( jasmine.any( String ) );
			expect( CS.granting ).toBe( "https://carbonldp.com/ns/v1/security#granting" );
		} );

		it( "CS.inheritableEntry", ():void => {
			expect( CS.inheritableEntry ).toEqual( jasmine.any( String ) );
			expect( CS.inheritableEntry ).toBe( "https://carbonldp.com/ns/v1/security#inheritableEntry" );
		} );

		it( "CS.name", ():void => {
			expect( CS.name ).toEqual( jasmine.any( String ) );
			expect( CS.name ).toBe( "https://carbonldp.com/ns/v1/security#name" );
		} );

		it( "CS.parentRole", ():void => {
			expect( CS.parentRole ).toEqual( jasmine.any( String ) );
			expect( CS.parentRole ).toBe( "https://carbonldp.com/ns/v1/security#parentRole" );
		} );

		it( "CS.password", ():void => {
			expect( CS.password ).toEqual( jasmine.any( String ) );
			expect( CS.password ).toBe( "https://carbonldp.com/ns/v1/security#password" );
		} );

		it( "CS.permission", ():void => {
			expect( CS.permission ).toEqual( jasmine.any( String ) );
			expect( CS.permission ).toBe( "https://carbonldp.com/ns/v1/security#permission" );
		} );

		it( "CS.rootContainer", ():void => {
			expect( CS.rootContainer ).toEqual( jasmine.any( String ) );
			expect( CS.rootContainer ).toBe( "https://carbonldp.com/ns/v1/security#rootContainer" );
		} );

		it( "CS.subject", ():void => {
			expect( CS.subject ).toEqual( jasmine.any( String ) );
			expect( CS.subject ).toBe( "https://carbonldp.com/ns/v1/security#subject" );
		} );

		it( "CS.subjectClass", ():void => {
			expect( CS.subjectClass ).toEqual( jasmine.any( String ) );
			expect( CS.subjectClass ).toBe( "https://carbonldp.com/ns/v1/security#subjectClass" );
		} );

		it( "CS.ticketKey", ():void => {
			expect( CS.ticketKey ).toEqual( jasmine.any( String ) );
			expect( CS.ticketKey ).toBe( "https://carbonldp.com/ns/v1/security#ticketKey" );
		} );

		it( "CS.tokenKey", ():void => {
			expect( CS.tokenKey ).toEqual( jasmine.any( String ) );
			expect( CS.tokenKey ).toBe( "https://carbonldp.com/ns/v1/security#tokenKey" );
		} );

		it( "CS.user", ():void => {
			expect( CS.user ).toEqual( jasmine.any( String ) );
			expect( CS.user ).toBe( "https://carbonldp.com/ns/v1/security#user" );
		} );

	} );

} );
