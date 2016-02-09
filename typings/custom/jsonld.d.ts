declare module "jsonld" {
	interface ExpandOptions {
		base?:string;
		expandContext?:Object;
		keepFreeFloatingNodes?:boolean;
		documentLoader?:( url:string, callback:( error:any, document:any ) => void ) => void;
	}

	function expand( input:Object, callback:( error:any, expanded:Object ) => void ):void;
	function expand( input:Object, options:ExpandOptions, callback:( error:any, expanded:Object ) => void ):void;
}
