import * as Auth from "./Auth";
export interface Class {
    "auth.method"?: Auth.Method;
    "system.container"?: string;
    "system.platform.metadata"?: string;
    "system.instance.metadata"?: string;
    "system.users.container"?: string;
    "system.credentials.container"?: string;
    "system.roles.container"?: string;
    "vocabulary"?: string;
}
export declare const defaultSettings: Class;
export default defaultSettings;
