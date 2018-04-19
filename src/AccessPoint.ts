import { AccessPointBase } from "./TransientAccessPoint";
import { ProtectedDocument } from "./ProtectedDocument";
import { Pointer } from "./Pointer";

export interface AccessPoint extends AccessPointBase, ProtectedDocument {
	membershipResource:Pointer;
	hasMemberRelation:Pointer;
	isMemberOfRelation?:Pointer;
	insertedContentRelation?:Pointer;
}
