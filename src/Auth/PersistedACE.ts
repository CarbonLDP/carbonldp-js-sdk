import * as ACE from "./ACE";
import * as PersistedDocument from "./../PersistedDocument";
import * as PersistedFragment from "./../PersistedFragment";

export interface Class extends ACE.Class, PersistedFragment.Class {
	document: PersistedDocument.Class;
}

export default Class;
