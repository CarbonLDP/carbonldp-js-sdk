export interface Class {
	"vocabulary"?:string;

	"system.container"?:string;
	"system.platform.metadata"?:string;
	"system.instance.metadata"?:string;

	"users.container"?:string;
	"system.security.container"?:string;
	"system.roles.container"?:string;
}

export const defaultSettings:Class = {
	"vocabulary": "vocabulary/#",

	"system.container": ".system/",
	"system.platform.metadata": "platform/",
	"system.instance.metadata": "instance/",

	"users.container": "users/",
	"system.security.container": "security/",
	"system.roles.container": "roles/",
};

export default defaultSettings;
