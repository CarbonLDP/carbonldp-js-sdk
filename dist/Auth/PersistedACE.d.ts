import { Fragment } from "../Fragment";
import { TransientACE } from "./TransientACE";
import { ACL } from "./ACL";
export interface PersistedACE extends TransientACE, Fragment {
    _document: ACL;
}
