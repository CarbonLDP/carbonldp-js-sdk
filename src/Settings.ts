
export interface Class {
	"vocabulary"?:string;
}

export interface InternalSettings extends Class {
	"system.container"?:string;
	"system.platform.metadata"?:string;
	"system.instance.metadata"?:string;
	"system.users.container"?:string;
	"system.credentials.container"?:string;
	"system.roles.container"?:string;
}

export const defaultSettings:InternalSettings = Object.freeze( {
	"system.container": ".system/",
	"system.platform.metadata": "platform/",
	"system.instance.metadata": "instance/",
	"system.users.container": "users/",
	"system.credentials.container": "credentials/",
	"system.roles.container": "roles/",
	"vocabulary": "vocabulary/#",
} );

export default defaultSettings;
