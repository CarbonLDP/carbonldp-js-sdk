import oldResolverUrlGenerator from "dgeni-packages/base/services/resolveUrl";


const ELEMENT_PATH:RegExp = /^#([^\s]*)/i;

export default function resolveUrl():Function {
	const oldResolverUrl:Function = oldResolverUrlGenerator();

	return function( currentPath:string, newPath:string, base:string ):string {
		if( ! newPath.match( ELEMENT_PATH ) )
			return oldResolverUrl( currentPath, newPath, base );

		return newPath.replace( ELEMENT_PATH, "#SDKDocs-$1" );
	};
}
