import Context from "./Context";
import * as Agent from "./Agent";
import * as Pointer from "./Pointer";
import * as Response from "./HTTP/Response";
import * as Errors from "./Errors";

export class Class {
	private context:Context;

	constructor( context:Context ) {
		this.context = context;
	}

	create( agentDocument:Agent.Class, slug:string = null ):Promise<[ Pointer.Class, Response.Class]> {
		let containerURI:string = this.context.resolve( this.getContainerURI() );

		if( ! Agent.Factory.is( agentDocument ) ) return Promise.reject<any>( new Errors.IllegalArgumentError( "The Document is not a `Carbon.Agents.Agent.Class` object." ) );

		return this.context.documents.createChild( containerURI, agentDocument, slug );
	}

	private getContainerURI():string {
		if( ! this.context.hasSetting( "platform.agents.container" ) ) throw new Errors.IllegalStateError( "The agents container URI hasn't been set." );
		return this.context.getSetting( "platform.agents.container" );
	}
}

export default Class;
