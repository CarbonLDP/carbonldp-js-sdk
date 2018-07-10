import { Pointer } from "../Pointer";
import { BaseResource } from "../Resource";


export interface BaseDocument extends BaseResource {
	hasMemberRelation?:string | Pointer;
	isMemberOfRelation?:string | Pointer;
	insertedContentRelation?:string | Pointer;
	defaultInteractionModel?:string | Pointer;
}
