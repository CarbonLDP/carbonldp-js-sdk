import * as Auth from "./Auth";

export interface CarbonSettings {
	"domain"?:string;
	"http.ssl"?:boolean;
	"auth.method"?:Auth.Method;
	"platform.container"?:string;
	"platform.apps.container"?:string;
}

let settings:CarbonSettings = {};
settings[ "domain" ] = "carbonldp.com";
settings[ "http.ssl" ] = true;
settings[ "auth.method" ] = Auth.Method.TOKEN;
settings[ "platform.container" ] = "platform/";
settings[ "platform.apps.container" ] = "apps/";
settings[ "platform.apps.roles.container" ] = "roles/";

export default settings;
