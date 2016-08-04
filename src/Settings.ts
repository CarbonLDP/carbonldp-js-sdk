import * as Auth from "./Auth";

export interface Class {
	"domain"?:string;
	"http.ssl"?:boolean;
	"auth.method"?:Auth.Method;
	"platform.container"?:string;
	"platform.apps.container"?:string;
	"platform.agents.container"?:string;
	"vocabulary"?:string;
}

export const defaultSettings:Class = {
	"domain": "carbonldp.com",
	"http.ssl": true,
	"auth.method": Auth.Method.TOKEN,
	"platform.container": "platform/",
	"platform.apps.container": "apps/",
	"platform.agents.container": "agents/",
	"vocabulary": "vocabulary/#",
};

export default defaultSettings;
