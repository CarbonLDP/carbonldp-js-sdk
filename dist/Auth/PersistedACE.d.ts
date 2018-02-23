import * as ACE from "./ACE";
import * as PersistedACL from "./PersistedACL";
import * as PersistedFragment from "./../PersistedFragment";
export interface Class extends ACE.Class, PersistedFragment.Class {
    _document: PersistedACL.Class;
}
export default Class;
