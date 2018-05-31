import { BaseDirectContainer } from "../LDP/DirectContainer";
import { Pointer } from "../Pointer";


export interface BaseAccessPoint extends BaseDirectContainer {
	hasMemberRelation:string | Pointer;
	isMemberOfRelation?:string | Pointer;
	insertedContentRelation?:string | Pointer;
	membershipResource?:Pointer;
}
