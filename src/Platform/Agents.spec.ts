import {
	INSTANCE,

	module,
	clazz,

	isDefined,
	hasDefaultExport,
	hasConstructor,
	hasMethod, extendsClass,
} from "./../test/JasmineExtender";
import * as AuthAgents from "./../Auth/Agents";
import PlatformContext from "./../Carbon";
import * as Utils from "./../Utils";

import * as AppAgents from "./Agents";
import DefaultExport from "./Agents";

describe( module( "Carbon/Platform/Agents" ), ():void => {

	it( isDefined(), ():void => {
		expect( AppAgents ).toBeDefined();
		expect( Utils.isObject( AppAgents ) ).toBe( true );
	} );

	describe( clazz(
		"Carbon.Platform.Agents.Class",
		"Class for manage Agents of an platform context."
	), ():void => {

		it( isDefined(), ():void => {
			expect( AppAgents.Class ).toBeDefined();
			expect( Utils.isFunction( AppAgents.Class ) ).toBe( true );
		} );

		it( hasConstructor( [
			{name: "context", type: "Carbon", description: "The platform context where to manage its Agents."},
		] ), ():void => {
			let platformContext:PlatformContext = new PlatformContext();
			let agents:AppAgents.Class = new AppAgents.Class( platformContext );

			expect( agents ).toBeTruthy();
			expect( agents instanceof AppAgents.Class ).toBe( true );
		} );

		it( extendsClass( "Carbon.Auth.Agents.Class" ), ():void => {
			let platformContext:PlatformContext = new PlatformContext();
			let agents:AppAgents.Class = new AppAgents.Class( platformContext );

			expect( agents instanceof AppAgents.Class ).toBe( true );
			expect( agents instanceof AuthAgents.Class ).toBe( true );
		} );

		it( hasMethod(
			INSTANCE,
			"get",
			"Retrieves the platform agent specified from the current platform context.", [
				{name: "agentURI", type: "string", description: "The URI of the platform agent to retrieve."},
				{name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true},
			],
			{type: "Promise<[ Carbon.Platform.PersistedAgent.Class, Carbon.HTTP.Response.Class ]>"}
		), () => {
			let platformContext:PlatformContext = new PlatformContext();
			let agents:AppAgents.Class = new AppAgents.Class( platformContext );

			expect( agents.get ).toBeDefined();
			expect( Utils.isFunction( agents.get ) ).toBe( true );

			let spy:jasmine.Spy = spyOn( AuthAgents.Class.prototype, "get" );

			agents.get( "http://example.com/platform/agents/an-agent/" );
			expect( spy ).toHaveBeenCalledWith( "http://example.com/platform/agents/an-agent/", undefined );
		} );

	} );

	it( hasDefaultExport(
		"Carbon.Platform.Agents.Class"
	), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( AppAgents.Class );
	} );

} );
