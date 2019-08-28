import { Document } from "dgeni";
import { highlight } from "../utils/highlight";
import { linkify } from "../utils/linkify";
import { Filter } from "./Filter";

export function highlightFilter( getLinkInfo ):Filter {
	return {
		name: "highlight",
		process( str:string, lang:string, doc:Document = this.ctx.doc ):string {
			const highlighted = highlight( str.trim(), lang );
			return linkify( highlighted, getLinkInfo, doc, false );
		},
	};
}
