import { Fragment } from "../Fragment";
import { TransientACE } from "./TransientACE";
import { ACL } from "./ACL";

export interface ACE extends TransientACE, Fragment {
	_document:ACL;
}
