import * as marked from "marked";
import { highlight } from "./utils/highlight";

marked.setOptions( {
	langPrefix: "language-",
	highlight,
} );

// Extends code rendering
marked.Renderer.prototype.code = function( code, lang ):string {
	const codeHTML:string = this.options.highlight( code, lang );
	const className:string = `${ this.options.langPrefix }${ lang || "*" }`;
	return `<div class="highlight-darcula"><pre class="${ className }"><code>${ codeHTML }</code></pre></div>`;
};