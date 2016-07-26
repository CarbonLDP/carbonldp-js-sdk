import * as AccessPoint from "./AccessPoint";
import * as PersistedDocument from "./PersistedDocument";
import * as Pointer from "./Pointer";

export interface Class extends AccessPoint.Class, PersistedDocument.Class {
	membershipResource:Pointer.Class;
	hasMemberRelation:Pointer.Class;
	memberOfRelation?:Pointer.Class;
	insertedContentRelation?: Pointer.Class;
}

export default Class;
