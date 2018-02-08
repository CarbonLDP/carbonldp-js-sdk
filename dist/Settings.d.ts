export interface Class {
    "vocabulary"?: string;
}
export interface InternalSettings extends Class {
    "system.container"?: string;
    "system.platform.metadata"?: string;
    "system.instance.metadata"?: string;
    "system.users.container"?: string;
    "system.credentials.container"?: string;
    "system.roles.container"?: string;
}
export declare const defaultSettings: InternalSettings;
export default defaultSettings;
