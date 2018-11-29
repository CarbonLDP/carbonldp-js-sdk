import marked from "marked";

export default ( str:string ) => marked( str, {
	sanitize: true,
	highlight( code:string ):string {
		return code.replace( /\n/gm, "<br>" );
	},
} );
