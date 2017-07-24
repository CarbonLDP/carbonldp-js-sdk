import * as Auth from "./Auth";

export interface Class {
	"auth.method"?:Auth.Method;
	"system.container"?:string;
	"system.platform.metadata"?:string;
	"system.instance.metadata"?:string;
	"system.users.container"?:string;
	"system.credentials.container"?:string;
	"system.roles.container"?:string;
	"vocabulary"?:string;
}

export const defaultSettings:Class = {
	"auth.method": Auth.Method.TOKEN,
	"system.container": ".system/",
	"system.platform.metadata": "platform/",
	"system.instance.metadata": "instance/",
	"system.users.container": "users/",
	"system.credentials.container": "credentials/",
	"system.roles.container": "roles/",
	"vocabulary": "vocabulary/#",
};

export default defaultSettings;
