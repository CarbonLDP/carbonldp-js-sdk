export function getLevelRegExp( property:string ):RegExp {
	const parsedName:string = property.replace( ".", "\\." );
	return new RegExp( `^${ parsedName }\\.[^.]+$` );
}
