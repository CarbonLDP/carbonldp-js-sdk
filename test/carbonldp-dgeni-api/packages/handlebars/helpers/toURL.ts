export default ( str ) => {
	if( typeof str !== "string" ) throw new Error( "toURL: An string was expected but received: " + str );

	if( str.startsWith( "carbonldp/" ) ) str = "Module/" + str;

	return str
		.replace( /\./g, "-" )
		.replace( /\//g, "-" )
		.replace( /#/g, "+" )
		.replace( /\(\)/, "" );
};
