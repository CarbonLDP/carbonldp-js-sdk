import { Pointer } from "../Pointer";
import { BaseResource } from "../Resource";


export interface BaseDocument extends BaseResource {
	hasMemberRelation?:Pointer;
	isMemberOfRelation?:Pointer;
	insertedContentRelation?:Pointer;
	defaultInteractionModel?:Pointer;
}
