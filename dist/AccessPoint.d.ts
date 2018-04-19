import { AccessPointBase } from "./TransientAccessPoint";
import { PersistedProtectedDocument } from "./PersistedProtectedDocument";
import { Pointer } from "./Pointer";
export interface AccessPoint extends AccessPointBase, PersistedProtectedDocument {
    membershipResource: Pointer;
    hasMemberRelation: Pointer;
    isMemberOfRelation?: Pointer;
    insertedContentRelation?: Pointer;
}
