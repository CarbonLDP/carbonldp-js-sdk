import { BaseDocument } from "../../Document";
import { Pointer } from "../../Pointer";
import { TransientACE } from "../ACE";

export interface BaseACL extends BaseDocument {
	// TODO: Change to Document
	protectedDocument:Pointer;
	inherits?:boolean;
	directACEntries?:TransientACE[];
	immediateDescendantsACEntries?:TransientACE[];
	allDescendantsACEntries?:TransientACE[];
}
