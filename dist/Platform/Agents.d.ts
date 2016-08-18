import * as Agents from "./../Auth/Agents";
import Carbon from "./../Carbon";
import * as HTTP from "./../HTTP";
import * as PersistedAgent from "./PersistedAgent";
export declare class Class extends Agents.Class {
    constructor(appContext: Carbon);
    get(agentURI: string, requestOptions?: HTTP.Request.Options): Promise<[PersistedAgent.Class, HTTP.Response.Class]>;
}
export default Class;
