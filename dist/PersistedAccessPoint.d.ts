import { AccessPointBase } from "./AccessPoint";
import * as PersistedProtectedDocument from "./PersistedProtectedDocument";
import { Pointer } from "./Pointer";
export interface Class extends AccessPointBase, PersistedProtectedDocument.Class {
    membershipResource: Pointer;
    hasMemberRelation: Pointer;
    isMemberOfRelation?: Pointer;
    insertedContentRelation?: Pointer;
}
export default Class;
