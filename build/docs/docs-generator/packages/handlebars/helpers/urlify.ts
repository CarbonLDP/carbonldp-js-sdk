type Options = {};

const LINK_TAG_REGEX:RegExp = /({@link ?[^]*?})/;
const PATH_REGEX:RegExp = /(^|[^\/])(CarbonLDP(?:[.\/][^\s]+?)?)([()}<>|&\s,;\]\[]|$)/gm;
const PATH_PROP_TYPE_REGEX:RegExp = /(CarbonLDP(?:[.\/][^\s]+?)?)\[&quot;([^\s]+?)&quot;]/gm;

export default ( str:string, isHTML?:boolean | Options, noParagraph?:boolean | Options ) => {
	if( typeof str !== "string" )
		throw new Error( "urlify: An string was expected, but received: " + str );

	if( getBoolean( noParagraph ) ) {
		str = str
			.replace( /<p>/gm, "" )
			.replace( /<\/p>/gm, "" );

		str = getFirstLine( str );
	}

	str = str
		.split( LINK_TAG_REGEX )
		.map( subStr => {
			if( subStr.match( LINK_TAG_REGEX ) ) return subStr;

			if( subStr.match( PATH_PROP_TYPE_REGEX ) )
				return subStr.replace( PATH_PROP_TYPE_REGEX, `{@link $1.$2 $&}` );

			return subStr.replace( PATH_REGEX, `$1{@link $2 $2}$3` );
		} )
		.join( "" );

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

function getBoolean( param?:boolean | Options ):boolean {
	if( typeof param === "object" ) return false;
	return ! ! param;
}
