import * as Auth from "./Auth";

export interface Class {
	"auth.method"?:Auth.Method;
	"system.container"?:string;
	"system.agents.container"?:string;
	"system.roles.container"?:string;
	"vocabulary"?:string;
}

export const defaultSettings:Class = {
	"auth.method": Auth.Method.TOKEN,
	"system.container": ".system/",
	"system.agents.container": "agents/",
	"system.roles.container": "roles/",
	"vocabulary": "vocabulary/#",
};

export default defaultSettings;
