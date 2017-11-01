export function getLevelRegExp( property:string ):RegExp {
	if( property ) property += ".";
	const parsedName:string = property.replace( /\./g, "\\." );

	return new RegExp( `^${ parsedName }[^.]+$` );
}
