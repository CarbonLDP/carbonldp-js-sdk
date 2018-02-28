import { PersistedFragment } from "../PersistedFragment";
import { ACE } from "./ACE";
import * as PersistedACL from "./PersistedACL";
export interface PersistedACE extends ACE, PersistedFragment {
    _document: PersistedACL.Class;
}
export default PersistedACE;
