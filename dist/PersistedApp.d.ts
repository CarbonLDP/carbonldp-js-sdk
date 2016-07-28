import * as PersistedDocument from "./PersistedDocument";
import Pointer from "./Pointer";
export interface Class extends PersistedDocument.Class {
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
