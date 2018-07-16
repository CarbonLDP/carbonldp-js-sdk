import { BaseDocument } from "../../Document/BaseDocument";
import { Pointer } from "../../Pointer/Pointer";
export interface BaseDirectContainer extends BaseDocument {
    membershipResource?: Pointer;
    hasMemberRelation: string | Pointer;
    isMemberOfRelation?: string | Pointer;
}
