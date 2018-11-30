import { MemberLike } from "./MemberLike";

export interface PropertyDoc extends MemberLike {
	name:string;
	type:string;
	description:string;
}
