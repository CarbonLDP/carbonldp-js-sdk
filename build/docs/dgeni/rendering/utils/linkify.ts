import { Document } from "dgeni";

const RAW_MATCH:RegExp = /((?:&#x3D;&gt;|&#x3D;|&lt;|&amp;|extends|=>|[|=<&,:](?!gt;)|^) ?)([_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*)/g;
const HTML_MATCH:RegExp = /((?:<span class="token (?:punctuation|operator|keyword)">(?:&lt;|<|&amp;|&|extends|=>|[|=<&,:])<\/span>) *(?:<span class="token class-name">)?)([_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*)/g;
const ESCAPE_CHARS = {
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	"\"": "&quot;",
	"'": "&#39;",
	"/": "&#x2F;",
	"`": "&#x60;",
	"=": "&#x3D;",
};

const KEYWORD_REGEX:RegExp = /<span class="token keyword">(.*?)<\/span>/g;
const MDN_URL:string = "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/";
// noinspection SpellCheckingInspection
const MDN_IDENTIFIERS:string[] = [
	"Array",
	"ArrayBuffer",
	"AsyncFunction",
	"Atomics",
	"Boolean",
	"DataView",
	"Date",
	"Error",
	"EvalError",
	"Float32Array",
	"Float64Array",
	"Function",
	"Generator",
	"GeneratorFunction",
	"Infinity",
	"Int16Array",
	"Int32Array",
	"Int8Array",
	"InternalError",
	"Intl",
	"Collator",
	"DateTimeFormat",
	"NumberFormat",
	"Iterator",
	"JSON",
	"Map",
	"Math",
	"NaN",
	"Number",
	"Object",
	"ParallelArray",
	"Promise",
	"Proxy",
	"RangeError",
	"ReferenceError",
	"Reflect",
	"RegExp",
	"SIMD",
	"Bool16x8",
	"Bool32x4",
	"Bool64x2",
	"Bool8x16",
	"Float32x4",
	"Float64x2",
	"Int16x8",
	"Int32x4",
	"Int8x16",
	"Uint16x8",
	"Uint32x4",
	"Uint8x16",
	"Set",
	"SharedArrayBuffer",
	"StopIteration",
	"String",
	"Symbol",
	"SyntaxError",
	"TypeError",
	"TypedArray",
	"URIError",
	"Uint16Array",
	"Uint32Array",
	"Uint8Array",
	"Uint8ClampedArray",
	"WeakMap",
	"WeakSet",
	"WebAssembly",
	"null",
	"undefined",
];

export function linkify( str:string, getLinkInfo, doc:Document, escape:boolean = true ):string {
	if( ! str ) return;

	const IDENTIFIERS_REGEX:RegExp = str.match( /<span class="token/ ) ?
		HTML_MATCH : RAW_MATCH;

	if( escape ) str = str.replace( /[&<>"'`=\/]/g, match => ESCAPE_CHARS[ match ] );
	return str
		.replace( IDENTIFIERS_REGEX, ( match:string, before:string, identifier:string ) => {
			const linkInfo = getLinkInfo( identifier, identifier, doc );

			// In case the link starts with '#' or '.', the link is not valid unless it's part of the MDN Documentation.
			if( ! linkInfo.valid || linkInfo.url.startsWith("#") || linkInfo.url.startsWith(".")) {
				if( ! MDN_IDENTIFIERS.includes( identifier ) ) return match;

				linkInfo.url = MDN_URL + identifier;
				linkInfo.external = true;
			}

			return `${ before }<a href="${ linkInfo.url }" ${ linkInfo.external ? ` target="_blank"` : "" }>${ identifier }</a>`;
		} )
		.replace( KEYWORD_REGEX, ( match:string, keyword:string ) => {
			if( MDN_IDENTIFIERS.includes( keyword ) ) return `<a href="${ MDN_URL + keyword }" target="_blank">${ keyword }</a>`;
			return match;
		} );
}
