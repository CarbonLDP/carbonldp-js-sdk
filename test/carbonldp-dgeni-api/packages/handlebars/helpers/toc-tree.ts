export default ( modules, options ) => {
	let elements:any[] = [];

	for( let i:number = 0; i < modules.length; ++ i ) {
		const interfaces:any[] = modules[ i ][ "interfaces" ] || [];
		const classes:any[] = modules[ i ][ "classes" ] || [];
		const namespaces:any[] = modules[ i ][ "namespaces" ] || [];

		Array.prototype.push.apply( elements, interfaces.map( element => {
			return { path: element.path, description: element.description, type: "I" };
		} ) );
		Array.prototype.push.apply( elements, classes.map( element => {
			return { path: element.path, description: element.description, type: "C" };
		} ) );
		Array.prototype.push.apply( elements, namespaces.map( element => {
			return { path: element.path, description: element.description, type: "N" };
		} ) );
	}

	elements = elements.sort( ( a, b ) => {
		return a.path.localeCompare( b.path );
	} );

	let ret:string = "";
	for( const element of elements ) {
		ret = ret + options.fn( element );
	}

	return ret;
};
