import { PersistedProtectedDocument } from "./PersistedProtectedDocument";
import { Pointer } from "./Pointer";

export interface PersistedAccessPoint extends PersistedProtectedDocument {
	membershipResource?:Pointer;
	hasMemberRelation?:Pointer;
	isMemberOfRelation?:Pointer;
	insertedContentRelation?:Pointer;
}
