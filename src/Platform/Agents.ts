import * as Agents from "./../Auth/Agents";
import Carbon from "./../Carbon";
import * as HTTP from "./../HTTP";
import * as PersistedAgent from "./PersistedAgent";

export class Class extends Agents.Class {

	constructor( appContext:Carbon ) {
		super( appContext );
	}

	get( agentURI:string, requestOptions?:HTTP.Request.Options ):Promise<[ PersistedAgent.Class, HTTP.Response.Class ]> {
		return super.get( agentURI, requestOptions );
	}

}

export default Class;
