export default ( value1, value2, response1, response2 ) => {
	response1 = response1 !== void 0 ? response1 : true;
	response2 = response1 !== void 0 ? response2 : false;

	if( value1 === value2 )
		return response1;
	return response2;
};
