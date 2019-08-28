import * as Prism from "prismjs";
import "prismjs/components/prism-typescript.js";


export function highlight( code:string, lang:string ) {
	code = code.replace( /(&#47;)/g, "/" );
	return Prism.highlight( code, Prism.languages[ lang ] );
}
