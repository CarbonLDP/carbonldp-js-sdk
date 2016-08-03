import * as Auth from "./Auth";
export interface Class {
    "domain"?: string;
    "http.ssl"?: boolean;
    "auth.method"?: Auth.Method;
    "platform.container"?: string;
    "platform.apps.container"?: string;
    "platform.agents.container"?: string;
    "platform.roles.container"?: string;
    "vocabulary"?: string;
}
export declare const defaultSettings: Class;
export default defaultSettings;
