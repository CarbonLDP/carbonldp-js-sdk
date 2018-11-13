export default ( module, options ) => {
	let elements:any[] = [];

	const interfaces:any[] = module[ "interfaces" ] || [];
	const classes:any[] = module[ "classes" ] || [];
	const typeAliases:any[] = module[ "typeAliases" ] || [];
	const namespaces:any[] = module[ "namespaces" ] || [];

	Array.prototype.push.apply( elements, interfaces.map( element => {
		return { element: element, isInterface: true };
	} ) );
	Array.prototype.push.apply( elements, classes.map( element => {
		return { element: element, isClass: true };
	} ) );
	Array.prototype.push.apply( elements, typeAliases.map( element => {
		return { element: element, isTypeAlias: true };
	} ) );
	Array.prototype.push.apply( elements, namespaces.map( element => {
		return { element: element, isNamespace: true };
	} ) );

	elements = elements.sort( ( a, b ) => {
		return a.element.path.localeCompare( b.element.path );
	} );

	let ret:string = "";
	for( let j:number = 0, length:number = elements.length; j < length; j ++ ) {
		ret = ret + options.fn( Object.assign( { "first": j === 0, "last": j === length - 1 }, elements[ j ] ) );
	}

	return ret;
};
