import { Tag } from "./Tag";
import { highlight } from "../utils/highlight";
import { linkify } from "../utils/linkify";

export function highlightTag( getLinkInfo ) {
	return new Highlight( getLinkInfo );
}

export class Highlight implements Tag {
	tags = [ "highlight" ];

	constructor( private  getLinkInfo ) {}

	parse( parser:any, nodes:any ):any {
		const tok = parser.nextToken();
		const args = parser.parseSignature( null, true );
		parser.advanceAfterBlockEnd( tok.value );

		const content = parser.parseUntilBlocks( "endhighlight" );
		const tag = new nodes.CallExtension( this, "process", args, [ content ] );
		parser.advanceAfterBlockEnd();

		return tag;
	}

	process( context:any, content:() => string ):string;
	process( context:any, lang:string, content:() => string ):string;
	process( context:any, langOrContent, content?:() => string ):string {
		const lang:string = content ? langOrContent : void 0;
		const contentString:string = content ? content() : langOrContent();
		const highlighted = highlight( contentString.trim(), lang );
		return linkify( highlighted, this.getLinkInfo, context.ctx.doc, false );
	}
}
