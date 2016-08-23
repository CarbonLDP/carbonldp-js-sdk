import * as PersistedAgent from "./../Auth/PersistedAgent";
import * as Pointer from "./../Pointer";

export interface Class extends PersistedAgent.Class {
	parentRoles?:Pointer.Class[];
}
