import Context from "./Context";
import * as Agent from "./Agents/Agent";
import * as Pointer from "./Pointer";
import * as Response from "./HTTP/Response";
import * as Utils from "./Utils";
import * as Errors from "./Errors";

export class Class {
	private context:Context;

	constructor( context:Context ) {
		this.context = context;
	}
	createAgent( agentDocument:Agent.Class ):Promise<[ Pointer.Class, Response.Class]>;
	createAgent( slug:string, agentDocument:Agent.Class ):Promise<[ Pointer.Class, Response.Class]>;
	createAgent( slugOrAgent:any, agentDocument?:Agent.Class ):Promise<[ Pointer.Class, Response.Class]> {
		let containerURI:string = this.context.resolve( this.getContainerURI() );
		let slug:string = Utils.isString( slugOrAgent ) ? slugOrAgent : null;
		agentDocument = agentDocument || slugOrAgent;

		if ( ! Agent.Factory.is( agentDocument ) ) return Promise.reject<any>( new Errors.IllegalArgumentError( "The Document is not a `Carbon.Agents.Agent.Class` object." ) );

		return this.context.documents.createChild( containerURI, slug, agentDocument );
	}

	private getContainerURI():string {
		if ( ! this.context.hasSetting( "platform.agents.container" ) ) throw new Errors.IllegalStateError( "The agents container URI hasn't been set." );
		return this.context.getSetting( "platform.agents.container" );
	}
}

export {
	Agent,
};

export default Class;
