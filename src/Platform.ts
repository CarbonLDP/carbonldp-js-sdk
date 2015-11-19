import Context from "./Context";
import * as RDF from "./RDF";

export class Class extends Context {
	parentContext:Context;

	constructor( parentContext:Context ) {
		super();

		this.parentContext = parentContext;
	}

	resolve( uri:string ):string {
		if ( RDF.URI.Util.isAbsolute( uri ) ) return uri;

		let finalURI:string = this.parentContext.resolve( this.parentContext.getSetting( "platform.container" ) );
		return RDF.URI.Util.resolve( finalURI, uri );
	}
}

export default Class;
