import * as LDP from "./LDP";
import * as App from "./App";
export interface Class extends App.Class {
    rootContainer: LDP.PersistedContainer.Class;
}
export declare class Factory {
    static hasClassProperties(resource: Object): boolean;
    static is(object: Object): boolean;
}
export default Class;
