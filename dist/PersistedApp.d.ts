import * as PersistedProtectedDocument from "./PersistedProtectedDocument";
import Pointer from "./Pointer";
export interface Class extends PersistedProtectedDocument.Class {
    name: string;
    description?: string;
    rootContainer: Pointer;
    allowsOrigins?: (Pointer | string)[];
}
export declare class Factory {
    static hasClassProperties(resource: Object): boolean;
    static is(object: Object): boolean;
}
export default Class;
