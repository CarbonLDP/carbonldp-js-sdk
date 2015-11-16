/// <reference path="../../typings/jasmine/jasmine.d.ts" />
/// <reference path="../../typings/jasmine-ajax/mock-ajax.d.ts" />
/// <reference path="../../typings/es6/es6.d.ts" />
/// <reference path="../../typings/es6-promise/es6-promise.d.ts" />

import {
	INSTANCE,
	STATIC,

	module,
	submodule,

	isDefined,

	interfaze,
	clazz,
	method,

	hasConstructor,
	hasMethod,
	hasSignature,
	hasProperty,
	hasInterface,
	extendsClass,

	MethodArgument,
} from "./../test/JasmineExtender";

import * as Utils from "./../Utils";

import * as TokenAuthenticator from "./TokenAuthenticator";

describe( module( "Carbon/Auth/TokenAuthenticator" ), ():void => {
	it( isDefined(), ():void => {
		expect( TokenAuthenticator ).toBeDefined();
		expect( Utils.isObject( TokenAuthenticator ) ).toEqual( true );
	});

	describe( clazz( "Carbon.Auth.TokenAuthenticator.Class", "Authenticates requests using JWT Authentication" ), ():void => {

	});
});
