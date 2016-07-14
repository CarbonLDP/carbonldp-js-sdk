import * as HTTP from "./../HTTP";
import * as PersistedDocument from "./../PersistedDocument";
export interface Class extends PersistedDocument.Class {
    name: string;
    email: string;
    enabled: boolean;
    enable(): Promise<[Class, HTTP.Response.Class]>;
    disable(): Promise<[Class, HTTP.Response.Class]>;
}
export declare class Factory {
    static hasClassProperties(object: Object): boolean;
    static is(object: Object): boolean;
    static decorate<T extends Object>(object: T): Class & T;
}
export default Class;
