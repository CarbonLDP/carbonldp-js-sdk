import * as PersistedFragment from "./PersistedFragment";
import * as ObjectSchema from "./ObjectSchema";
export declare const SCHEMA: ObjectSchema.Class;
export interface Class extends PersistedFragment.Class {
    bNodeIdentifier: string;
}
export default Class;
