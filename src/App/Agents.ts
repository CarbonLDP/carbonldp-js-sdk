import * as Agents from "./../Auth/Agents";
import * as Context from "./Context";
import * as HTTP from "./../HTTP";
import * as PersistedAgent from "./PersistedAgent";

export class Class extends Agents.Class {

	constructor( appContext:Context.Class ) {
		super( appContext );
	}

	get<T>( agentURI:string, requestOptions?:HTTP.Request.Options ):Promise<[ T & PersistedAgent.Class, HTTP.Response.Class ]> {
		return super.get<T>( agentURI, requestOptions );
	}

}

export default Class;
