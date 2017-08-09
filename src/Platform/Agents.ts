import * as Agents from "./../Auth/Agents";
import Carbon from "./../Carbon";
import * as HTTP from "./../HTTP";
import * as PersistedAgent from "./PersistedAgent";

export class Class extends Agents.Class {

	constructor( appContext:Carbon ) {
		super( appContext );
	}

	get<T>( agentURI:string, requestOptions?:HTTP.Request.Options ):Promise<[ T & PersistedAgent.Class, HTTP.Response.Class ]> {
		return super.get<T>( agentURI, requestOptions );
	}

}

export default Class;
