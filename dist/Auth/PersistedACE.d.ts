import { Fragment } from "../Fragment";
import { ACE } from "./ACE";
import { ACL } from "./ACL";
export interface PersistedACE extends ACE, Fragment {
    _document: ACL;
}
