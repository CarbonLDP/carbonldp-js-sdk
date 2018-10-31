import toURL from "./toURL";

const classRegex:RegExp = /CarbonLDP([./][./#a-zA-Z0-9]*)?/gmi;

export default ( str, isHTML, noParagraph, options ) => {
	if( typeof str !== "string" )
		throw new Error( "urlify: An string was expected, but received: " + str );

	if( ! options ) {
		options = noParagraph;
		noParagraph = void 0;
	}
	noParagraph = ! ! noParagraph;

	if( ! options ) {
		options = isHTML;
		isHTML = void 0;
	}
	isHTML = ! ! isHTML;

	if( noParagraph )
		str = str
			.replace( /<p>/gm, "" )
			.replace( /<\/p>/gm, "" );

	return str.replace( classRegex, ( matched ) => {
		const uri:string = toURL( matched );

		if( isHTML )
			return `<a href="#${ uri }">${ matched }</a>`;

		return `[${ matched }](#${ uri })`;
	} );
};
