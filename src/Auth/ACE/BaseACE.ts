import { Pointer } from "../../Pointer";
import { BaseResource } from "../../Resource";

export interface BaseACE extends BaseResource {
	granting:boolean;
	permissions:Pointer[];
	subjects:Pointer[];
	subjectsClass:Pointer;
}
