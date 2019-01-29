import { ApiDoc } from "dgeni-packages/typescript/api-doc-types/ApiDoc";
import { IndexDoc } from "../local-models/IndexDoc";
import toURL from "../packages/handlebars/helpers/toURL";

export interface LinkInfo {
	url:string;
	title:string;
	valid:boolean;
}

export interface ValidLink extends LinkInfo {
	valid:true;
	type:string;
}

export interface InvalidLink extends LinkInfo {
	valid:false;
	errorType:string;
	error:string;
}

export default function getLinkInfo( encodeCodeBlock:Function ):Function {
	function getDocFromAlias( url:string, doc:IndexDoc ):ApiDoc | undefined {
		return doc.docs.find( _ => {
			const inAlias:boolean = _.aliases.some( __ =>
				__ === url ||
				(url.endsWith( "()" ) ? __ === `${url.slice( 0, - 2 )}_0()` : false)
			);

			if( inAlias ) return inAlias;

			return _.path === url;
		} );
	}

	return function( url:string, title:string, currentDoc:IndexDoc ):LinkInfo {
		if( ! url ) throw new Error( "Invalid url" );

		const doc:ApiDoc | undefined = getDocFromAlias( url, currentDoc );

		if( ! doc ) return <InvalidLink> {
			url: "#",
			title: title || url,
			valid: false,
			errorType: "missing",
			error: `Invalid link (does not match any doc): "${ url }"`,
		};

		return <ValidLink> {
			url: `#${ toURL( doc.path ) }`,
			type: "doc",
			valid: true,
			title: title || encodeCodeBlock( doc.path, true ),
		};
	};
}
