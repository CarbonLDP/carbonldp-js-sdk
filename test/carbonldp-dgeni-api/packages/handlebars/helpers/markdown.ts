import marked from "marked";

export default ( str:string ) => marked( str, {
	sanitize: true,
} );
