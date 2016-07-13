import * as Agents from "./Agents";
import Carbon from "./../Carbon";
import * as Auth from "./../Auth";
export declare class Class extends Auth.Class {
    agents: Agents.Class;
    roles: Auth.Roles.Class;
    constructor(platformContext: Carbon);
}
export default Class;
