import { AccessPointBase } from "./AccessPoint";
import { PersistedProtectedDocument } from "./PersistedProtectedDocument";
import { Pointer } from "./Pointer";
export interface PersistedAccessPoint extends AccessPointBase, PersistedProtectedDocument {
    membershipResource: Pointer;
    hasMemberRelation: Pointer;
    isMemberOfRelation?: Pointer;
    insertedContentRelation?: Pointer;
}
export default PersistedAccessPoint;
