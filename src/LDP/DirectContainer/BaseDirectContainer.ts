import { BaseDocument } from "../../Document";
import { Pointer } from "../../Pointer";


export interface BaseDirectContainer extends BaseDocument {
	membershipResource?:Pointer;
	hasMemberRelation:string | Pointer;
	isMemberOfRelation?:string | Pointer;
}
