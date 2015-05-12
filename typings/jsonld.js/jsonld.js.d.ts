declare module jsonld {
	interface ExpandOptions {
		base?:string;
		expandContext?:Object;
		keepFreeFloatingNodes?:boolean;
		documentLoader?:( url:string, callback:( error, document ) => void ) => void;
	}

	function expand( input:Object, callback:( error, expanded:Object ) => void ):void;
	function expand( input:Object, options:ExpandOptions, callback:( error, expanded:Object ) => void ):void;
}