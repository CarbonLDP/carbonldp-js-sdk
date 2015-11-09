import * as Auth from "./Auth";
export interface CarbonSettings {
    "domain"?: string;
    "http.ssl"?: boolean;
    "auth.method"?: Auth.Method;
    "platform.container"?: string;
    "platform.apps.container"?: string;
}
declare let settings: CarbonSettings;
export default settings;
