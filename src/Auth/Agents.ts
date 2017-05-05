import * as Agent from "./Agent";
import Context from "./../Context";
import * as Errors from "./../Errors";
import * as HTTP from "./../HTTP";
import * as PersistedAgent from "./PersistedAgent";
import * as PersistedProtectedDocument from "./../PersistedProtectedDocument";
import * as URI from "./../RDF/URI";

export class Class {
	private context:Context;

	constructor( context:Context ) {
		this.context = context;
	}

	register( agentDocument:Agent.Class, slug:string = null ):Promise<[ PersistedProtectedDocument.Class, HTTP.Response.Class ]> {
		return this.resolveURI( "" ).then( ( containerURI:string ) => {
			if( ! Agent.Factory.is( agentDocument ) ) throw new Errors.IllegalArgumentError( "The Document is not a cs:Agent object." );

			return this.context.documents.createChild( containerURI, agentDocument, slug );
		} );
	}

	get( agentURI:string, requestOptions?:HTTP.Request.Options ):Promise<[ PersistedAgent.Class, HTTP.Response.Class ]> {
		return this.resolveURI( agentURI ).then( ( uri:string ) => {
			return this.context.documents.get( uri, requestOptions );
		} );
	}

	enable( agentURI:string, requestOptions?:HTTP.Request.Options ):Promise<[ PersistedAgent.Class, [ HTTP.Response.Class, HTTP.Response.Class ] ]> {
		return this.changeEnabledStatus( agentURI, true, requestOptions );
	}

	disable( agentURI:string, requestOptions?:HTTP.Request.Options ):Promise<[ PersistedAgent.Class, [ HTTP.Response.Class, HTTP.Response.Class ] ]> {
		return this.changeEnabledStatus( agentURI, false, requestOptions );
	}

	delete( agentURI:string, requestOptions?:HTTP.Request.Options ):Promise<HTTP.Response.Class> {
		return this.resolveURI( agentURI ).then( uri => {
			return this.context.documents.delete( uri, requestOptions );
		} );
	}

	private changeEnabledStatus( agentURI:string, value:boolean, requestOptions?:HTTP.Request.Options ):Promise<[ PersistedAgent.Class, [ HTTP.Response.Class, HTTP.Response.Class ] ]> {
		let getResponse:HTTP.Response.Class;
		return this.get( agentURI, requestOptions ).then( ( [ agent, response ]:[ PersistedAgent.Class, HTTP.Response.Class ] ) => {
			getResponse = response;
			agent.enabled = value;
			return agent.save();
		} ).then( ( [ agent, response ]:[ PersistedAgent.Class, HTTP.Response.Class ] ) => {
			return [ agent, [ getResponse, response ] ];
		} );
	}

	private resolveURI( agentURI:string ):Promise<string> {
		return new Promise<string>( ( resolve:( uri:string ) => void ) => {
			let containerURI:string = this.context.resolve( this.getContainerURI() );
			let uri:string = URI.Util.resolve( containerURI, agentURI );

			if( ! URI.Util.isBaseOf( containerURI, uri ) ) throw new Errors.IllegalArgumentError( "The URI provided is not a valid agent of the current context." );

			resolve( uri );
		} );
	}

	private getContainerURI():string {
		if( ! this.context.hasSetting( "system.agents.container" ) ) throw new Errors.IllegalStateError( "The agents container URI hasn't been set." );
		return this.context.getSetting( "system.agents.container" );
	}
}

export default Class;
