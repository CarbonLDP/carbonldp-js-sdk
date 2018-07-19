import { Pointer } from "../Pointer/Pointer";

import { BaseResource } from "../Resource/BaseResource";


export interface BaseDocument extends BaseResource {
	hasMemberRelation?:string | Pointer;
	isMemberOfRelation?:string | Pointer;
	insertedContentRelation?:string | Pointer;
	defaultInteractionModel?:string | Pointer;
}
