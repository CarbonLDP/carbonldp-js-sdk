import { PersistedFragment } from "../PersistedFragment";
import { ACE } from "./ACE";
import { PersistedACL } from "./PersistedACL";

export interface PersistedACE extends ACE, PersistedFragment {
	_document:PersistedACL;
}
