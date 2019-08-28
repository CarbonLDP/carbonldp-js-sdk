import { Document } from "dgeni";
import { Filter } from "./Filter";
import { linkify } from "../utils/linkify";

export function linkifyFilter( getLinkInfo ):Filter {
	return {
		name: "linkify",
		process( str:string, doc:Document = this.ctx.doc ):string {
			return linkify( str, getLinkInfo, doc );
		},
	};
}
