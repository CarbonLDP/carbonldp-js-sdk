import { Fragment } from "../Fragment";
import { ACE } from "./ACE";
import { PersistedACL } from "./PersistedACL";

export interface PersistedACE extends ACE, Fragment {
	_document:PersistedACL;
}
