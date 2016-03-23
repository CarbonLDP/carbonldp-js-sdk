import { Context as AppContext } from "./../App";
import * as Role from "./Roles/Role";
import * as Pointer from "./../Pointer";
import * as Response from "./../HTTP/Response";
import * as Utils from "./../Utils";
import * as Errors from "./../Errors";

export class Class {
	private context:AppContext;

	constructor( context:AppContext ) {
		this.context = context;
	}

	createRole( agentDocument:Role.Class ):Promise<[ Pointer.Class, Response.Class]>;
	createRole( slug:string, agentDocument:Role.Class ):Promise<[ Pointer.Class, Response.Class]>;
	createRole( slugOrAgent:any, agentDocument?:Role.Class ):Promise<[ Pointer.Class, Response.Class]> {
		let containerURI:string = this.context.resolve( this.getContainerURI() );
		let slug:string = Utils.isString( slugOrAgent ) ? slugOrAgent : null;
		agentDocument = agentDocument || slugOrAgent;

		if ( ! Role.Factory.is( agentDocument ) ) return Promise.reject<any>( new Errors.IllegalArgumentError( "The Document is not a `Carbon.Apps.Roles.Role.Class` object." ) );

		if( slug )
			return this.context.documents.createChild( containerURI, slug, agentDocument );

		return this.context.documents.createChild( containerURI, agentDocument );
	}

	private getContainerURI():string {
		if ( ! this.context.hasSetting( "platform.apps.roles.container" ) ) throw new Errors.IllegalStateError( "The apps roles container URI hasn't been set." );
		return this.context.getSetting( "platform.apps.roles.container" );
	}
}

export {
	Role,
};

export default Class;
