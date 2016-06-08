import * as PersistedDocument from "./../PersistedDocument";
export interface Class extends PersistedDocument.Class {
    name: string;
    email: string;
    enabled: boolean;
}
export declare class Factory {
    static hasClassProperties(object: Object): boolean;
    static is(object: Object): boolean;
}
export default Class;
