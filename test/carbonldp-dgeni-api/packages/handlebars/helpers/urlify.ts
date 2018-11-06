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
		str = str
			.replace( /<p>/gm, "" )
			.replace( /<\/p>/gm, "" );

		str = getFirstLine( str );
	}

	// FIXME: Re-implement links creation

	return str;
};

const revert:( str:string ) => string = str => str
	.split( "" )
	.reverse()
	.join( "" );

function getFirstLine( str:string ):string {
	const reverseStr:string = revert( str );

	const lines:string[] = reverseStr.split( /$|\s(?=\.)/ );
	const line:string = lines.pop()!;

	return revert( line );
}
