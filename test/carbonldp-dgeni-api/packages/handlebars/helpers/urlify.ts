import toURL from "./toURL";

export default ( str, isHTML, noParagraph, options:{ data:{ root:any } } ) => {
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

	if( noParagraph ) {
		const breakIndex:number = str.indexOf( "\n" );
		if( breakIndex !== - 1 )
			str = str.substring( 0, breakIndex );

		str = str
			.replace( /<p>/gm, "" )
			.replace( /<\/p>/gm, "" );
	}

	// FIXME: Re-implement links creation

	return str;
};
