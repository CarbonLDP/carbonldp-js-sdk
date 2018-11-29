export default ( value, str ) => {
	value = "" + (value || "");
	str = "" + (str || "");

	return value + str;
};
