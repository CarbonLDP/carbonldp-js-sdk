import * as Agent from "./Agent";
import Context from "./../Context";
import * as Errors from "./../Errors";
import * as Pointer from "./../Pointer";
import * as Response from "./../HTTP/Response";
import * as Utils from "./../Utils";

export class Class {
	private context:Context;

	constructor( context:Context ) {
		this.context = context;
	}

	create( agentDocument:Agent.Class ):Promise<[ Pointer.Class, Response.Class]>;
	create( slug:string, agentDocument:Agent.Class ):Promise<[ Pointer.Class, Response.Class]>;
	create( slugOrAgent:any, agentDocument?:Agent.Class ):Promise<[ Pointer.Class, Response.Class]> {
		let containerURI:string = this.context.resolve( this.getContainerURI() );
		let slug:string = Utils.isString( slugOrAgent ) ? slugOrAgent : null;
		agentDocument = agentDocument || slugOrAgent;

		if ( ! Agent.Factory.is( agentDocument ) ) return Promise.reject<any>( new Errors.IllegalArgumentError( "The Document is not a cs:Agent object." ) );

		if( slug ) {
			return this.context.documents.createChild( containerURI, slug, agentDocument );
		} else {
			return this.context.documents.createChild( containerURI, agentDocument );
		}
	}

	private getContainerURI():string {
		if ( ! this.context.hasSetting( "platform.agents.container" ) ) throw new Errors.IllegalStateError( "The agents container URI hasn't been set." );
		return this.context.getSetting( "platform.agents.container" );
	}
}

export default Class;
