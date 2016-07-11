import {
	STATIC,

	module,
	clazz,

	isDefined,
	hasProperty
} from "./../test/JasmineExtender";
import * as Utils from "./../Utils";

import * as CS from "./CS";

describe( module(
	"Carbon/NS/CS"
), ():void => {

	it( isDefined(), ():void => {
		expect( CS ).toBeDefined();
		expect( Utils.isObject( CS ) ).toBe( true );
	} );

	it( hasProperty(
		STATIC,
		"namespace",
		"string"
	), ():void => {
		expect( CS.namespace ).toBeDefined();
		expect( Utils.isString( CS.namespace ) ).toBe( true );

		expect( CS.namespace ).toBe( "https://carbonldp.com/ns/v1/security#" )
	} );

	describe( clazz(
		"Carbon.NS.CS.Class",
		"Class that contains objects defined by Carbon Security"
	), ():void => {

		it( isDefined(), ():void => {
			expect( CS.Class ).toBeDefined();
			expect( Utils.isFunction( CS.Class ) ).toBe( true );
			expect( Object.keys( CS.Class ).length ).toBe( 7 );
		});

		it( hasProperty(
			STATIC,
			"AccessControlEntry",
			"string"
		), ():void => {
			expect( CS.Class.AccessControlEntry ).toBeDefined();
			expect( Utils.isString( CS.Class.AccessControlEntry ) ).toBe( true );

			expect( CS.Class.AccessControlEntry ).toBe( "https://carbonldp.com/ns/v1/security#AccessControlEntry" );
		});

		it( hasProperty(
			STATIC,
			"AccessControlList",
			"string"
		), ():void => {
			expect( CS.Class.AccessControlList ).toBeDefined();
			expect( Utils.isString( CS.Class.AccessControlList ) ).toBe( true );

			expect( CS.Class.AccessControlList ).toBe( "https://carbonldp.com/ns/v1/security#AccessControlList" );
		});

		it( hasProperty(
			STATIC,
			"Agent",
			"string"
		), ():void => {
			expect( CS.Class.Agent ).toBeDefined();
			expect( Utils.isString( CS.Class.Agent ) ).toBe( true );

			expect( CS.Class.Agent ).toBe( "https://carbonldp.com/ns/v1/security#Agent" );
		});

		it( hasProperty(
			STATIC,
			"AllOrigins",
			"string"
		), ():void => {
			expect( CS.Class.Agent ).toBeDefined();
			expect( Utils.isString( CS.Class.Agent ) ).toBe( true );

			expect( CS.Class.Agent ).toBe( "https://carbonldp.com/ns/v1/security#Agent" );
		} );

		it( hasProperty(
			STATIC,
			"Application",
			"string"
		), ():void => {
			expect( CS.Class.Application ).toBeDefined();
			expect( Utils.isString( CS.Class.Application ) ).toBe( true );

			expect( CS.Class.Application ).toBe( "https://carbonldp.com/ns/v1/security#Application" );
		});

		it( hasProperty(
			STATIC,
			"Ticket",
			"string"
		), ():void => {
			expect( CS.Class.Ticket ).toBeDefined();
			expect( Utils.isString( CS.Class.Ticket ) ).toBe( true );

			expect( CS.Class.Ticket ).toBe( "https://carbonldp.com/ns/v1/security#Ticket" );
		} );

		it( hasProperty(
			STATIC,
			"Token",
			"string"
		), ():void => {
			expect( CS.Class.Token ).toBeDefined();
			expect( Utils.isString( CS.Class.Token ) ).toBe( true );

			expect( CS.Class.Token ).toBe( "https://carbonldp.com/ns/v1/security#Token" );
		});

	} );

	describe( clazz(
		"Carbon.NS.CS.Predicate",
		"Class that contains predicates defined by Carbon Security"
	), ():void => {

		it( isDefined(), ():void => {
			expect( CS.Predicate ).toBeDefined();
			expect( Utils.isFunction( CS.Predicate ) ).toBe( true );

			expect( Object.keys( CS.Predicate ).length ).toBe( 17 );
		});

		it( hasProperty(
			STATIC,
			"accessControlEntry",
			"string"
		), ():void => {
			expect( CS.Predicate.accessControlEntry ).toBeDefined();
			expect( Utils.isString( CS.Predicate.accessControlEntry ) ).toBe( true );

			expect( CS.Predicate.accessControlEntry ).toBe( "https://carbonldp.com/ns/v1/security#accessControlEntry" );
		});

		it( hasProperty(
			STATIC,
			"accessControlList",
			"string"
		), ():void => {
			expect( CS.Predicate.accessControlList ).toBeDefined();
			expect( Utils.isString( CS.Predicate.accessControlList ) ).toBe( true );

			expect( CS.Predicate.accessControlList ).toBe( "https://carbonldp.com/ns/v1/security#accessControlList" );
		});

		it( hasProperty(
			STATIC,
			"accessTo",
			"string"
		), ():void => {
			expect( CS.Predicate.accessTo ).toBeDefined();
			expect( Utils.isString( CS.Predicate.accessTo ) ).toBe( true );

			expect( CS.Predicate.accessTo ).toBe( "https://carbonldp.com/ns/v1/security#accessTo" );
		});

		it( hasProperty(
			STATIC,
			"allowsOrigin",
			"string"
		), ():void => {
			expect( CS.Predicate.allowsOrigin ).toBeDefined();
			expect( Utils.isString( CS.Predicate.allowsOrigin ) ).toBe( true );

			expect( CS.Predicate.allowsOrigin ).toBe( "https://carbonldp.com/ns/v1/security#allowsOrigin" );
		});

		it( hasProperty(
			STATIC,
			"description",
			"string"
		), ():void => {
			expect( CS.Predicate.description ).toBeDefined();
			expect( Utils.isString( CS.Predicate.description ) ).toBe( true );

			expect( CS.Predicate.description ).toBe( "https://carbonldp.com/ns/v1/security#description" );
		});

		it( hasProperty(
			STATIC,
			"expirationTime",
			"string"
		), ():void => {
			expect( CS.Predicate.expirationTime ).toBeDefined();
			expect( Utils.isString( CS.Predicate.expirationTime ) ).toBe( true );

			expect( CS.Predicate.expirationTime ).toBe( "https://carbonldp.com/ns/v1/security#expirationTime" );
		} );

		it( hasProperty(
			STATIC,
			"forIRI",
			"string"
		), ():void => {
			expect( CS.Predicate.forIRI ).toBeDefined();
			expect( Utils.isString( CS.Predicate.forIRI ) ).toBe( true );

			expect( CS.Predicate.forIRI ).toBe( "https://carbonldp.com/ns/v1/security#forIRI" );
		} );

		it( hasProperty(
			STATIC,
			"granting",
			"string"
		), ():void => {
			expect( CS.Predicate.granting ).toBeDefined();
			expect( Utils.isString( CS.Predicate.granting ) ).toBe( true );

			expect( CS.Predicate.granting ).toBe( "https://carbonldp.com/ns/v1/security#granting" );
		});

		it( hasProperty(
			STATIC,
			"inheritableEntry",
			"string"
		), ():void => {
			expect( CS.Predicate.inheritableEntry ).toBeDefined();
			expect( Utils.isString( CS.Predicate.inheritableEntry ) ).toBe( true );

			expect( CS.Predicate.inheritableEntry ).toBe( "https://carbonldp.com/ns/v1/security#inheritableEntry" );
		});

		it( hasProperty(
			STATIC,
			"namae",
			"string"
		), ():void => {
			expect( CS.Predicate.namae ).toBeDefined();
			expect( Utils.isString( CS.Predicate.namae ) ).toBe( true );

			expect( CS.Predicate.namae ).toBe( "https://carbonldp.com/ns/v1/security#name" );
		});

		it( hasProperty(
			STATIC,
			"password",
			"string"
		), ():void => {
			expect( CS.Predicate.password ).toBeDefined();
			expect( Utils.isString( CS.Predicate.password ) ).toBe( true );

			expect( CS.Predicate.password ).toBe( "https://carbonldp.com/ns/v1/security#password" );
		} );

		it( hasProperty(
			STATIC,
			"permission",
			"string"
		), ():void => {
			expect( CS.Predicate.permission ).toBeDefined();
			expect( Utils.isString( CS.Predicate.permission ) ).toBe( true );

			expect( CS.Predicate.permission ).toBe( "https://carbonldp.com/ns/v1/security#permission" );
		});

		it( hasProperty(
			STATIC,
			"rootContainer",
			"string"
		), ():void => {
			expect( CS.Predicate.rootContainer ).toBeDefined();
			expect( Utils.isString( CS.Predicate.rootContainer ) ).toBe( true );

			expect( CS.Predicate.rootContainer ).toBe( "https://carbonldp.com/ns/v1/security#rootContainer" );
		});

		it( hasProperty(
			STATIC,
			"subject",
			"string"
		), ():void => {
			expect( CS.Predicate.subject ).toBeDefined();
			expect( Utils.isString( CS.Predicate.subject ) ).toBe( true );

			expect( CS.Predicate.subject ).toBe( "https://carbonldp.com/ns/v1/security#subject" );
		});

		it( hasProperty(
			STATIC,
			"subjectClass",
			"string"
		), ():void => {
			expect( CS.Predicate.subjectClass ).toBeDefined();
			expect( Utils.isString( CS.Predicate.subjectClass ) ).toBe( true );

			expect( CS.Predicate.subjectClass ).toBe( "https://carbonldp.com/ns/v1/security#subjectClass" );
		});

		it( hasProperty(
			STATIC,
			"ticketKey",
			"string"
		), ():void => {
			expect( CS.Predicate.ticketKey ).toBeDefined();
			expect( Utils.isString( CS.Predicate.ticketKey ) ).toBe( true );

			expect( CS.Predicate.ticketKey ).toBe( "https://carbonldp.com/ns/v1/security#ticketKey" );
		} );

		it( hasProperty(
			STATIC,
			"tokenKey",
			"string"
		), ():void => {
			expect( CS.Predicate.tokenKey ).toBeDefined();
			expect( Utils.isString( CS.Predicate.tokenKey ) ).toBe( true );

			expect( CS.Predicate.tokenKey ).toBe( "https://carbonldp.com/ns/v1/security#tokenKey" );
		});

	} );

} );