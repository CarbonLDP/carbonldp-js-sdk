import * as HTTP from "./../HTTP";
import * as PersistedDocument from "./../PersistedDocument";
import * as PersistedProtectedDocument from "./../PersistedProtectedDocument";
export interface Class extends PersistedProtectedDocument.Class {
    name: string;
    email: string;
    enabled: boolean;
    password?: string;
    enable(): Promise<[Class, HTTP.Response.Class]>;
    disable(): Promise<[Class, HTTP.Response.Class]>;
}
export declare class Factory {
    static hasClassProperties(object: Object): boolean;
    static is(object: Object): boolean;
    static decorate<T extends PersistedDocument.Class>(object: T): Class & T;
}
export default Class;
