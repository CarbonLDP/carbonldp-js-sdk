import * as LDP from "./LDP";
import * as PersistedDocument from "./PersistedDocument";
export interface Class extends PersistedDocument.Class {
    name: string;
    description: string;
    rootContainer: LDP.PersistedContainer.Class;
}
export declare class Factory {
    static hasClassProperties(resource: Object): boolean;
    static is(object: Object): boolean;
}
export default Class;
