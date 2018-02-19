import * as AccessPoint from "./AccessPoint";
import * as PersistedProtectedDocument from "./PersistedProtectedDocument";
import * as Pointer from "./Pointer";
export interface Class extends AccessPoint.Class, PersistedProtectedDocument.Class {
    membershipResource: Pointer.Class;
    hasMemberRelation: Pointer.Class;
    isMemberOfRelation?: Pointer.Class;
    insertedContentRelation?: Pointer.Class;
}
export default Class;
