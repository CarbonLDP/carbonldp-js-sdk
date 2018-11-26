export default str => {
	str = str || "";
	return str.replace( /\t/g, "" );
};
