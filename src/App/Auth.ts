import AppAgents from "./Agents";
import AppContext from "./Context";
import AppRoles from "./Roles";
import Auth from "./../Auth";
import * as Errors from "./../Errors";
import * as Utils from "./../Utils";

export class Class extends Auth {
	public agents:AppAgents;
	public roles:AppRoles;

	constructor( appContext:AppContext ) {
		super( appContext );
		this.roles = new AppRoles( appContext );
		this.agents = new AppAgents( appContext );
	}

}

export default Class;
