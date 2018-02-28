import * as ACE from "./ACE";
import * as PersistedACL from "./PersistedACL";
import { PersistedFragment } from "../PersistedFragment";

export interface Class extends ACE.Class, PersistedFragment {
	_document:PersistedACL.Class;
}

export default Class;
