import { TransientDocument } from "../../Document";
import { Pointer } from "../../Pointer";
import { CS } from "../../Vocabularies";
import { TransientACE } from "../ACE";


export interface TransientACL extends TransientDocument {
	protectedDocument?:Pointer;
	inherits?:boolean;
	directACEntries?:TransientACE[];
	immediateDescendantsACEntries?:TransientACE[];
	allDescendantsACEntries?:TransientACE[];
}


export interface TransientACLFactory {
	TYPE:CS[ "AccessControlList" ];
}


export const TransientACL:TransientACLFactory = {
	TYPE: CS.AccessControlList,
};
