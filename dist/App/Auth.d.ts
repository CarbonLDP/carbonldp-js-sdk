import AppAgents from "./Agents";
import AppContext from "./Context";
import AppRoles from "./Roles";
import Auth from "./../Auth";
export declare class Class extends Auth {
    agents: AppAgents;
    roles: AppRoles;
    constructor(appContext: AppContext);
}
export default Class;
