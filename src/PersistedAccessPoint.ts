import * as AccessPoint from "./AccessPoint";
import * as PersistedProtectedDocument from "./PersistedProtectedDocument";
import { Pointer } from "./Pointer";

export interface Class extends AccessPoint.Class, PersistedProtectedDocument.Class {
	membershipResource:Pointer;
	hasMemberRelation:Pointer;
	isMemberOfRelation?:Pointer;
	insertedContentRelation?: Pointer;
}

export default Class;
