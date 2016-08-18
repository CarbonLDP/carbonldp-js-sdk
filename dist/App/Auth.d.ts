import AppContext from "./Context";
import AppRoles from "./Roles";
import Auth from "./../Auth";
export declare class Class extends Auth {
    roles: AppRoles;
    constructor(appContext: AppContext);
}
export default Class;
