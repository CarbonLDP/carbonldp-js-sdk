import AbstractContext from "./AbstractContext";
import Context from "./Context";
import * as RDF from "./RDF";

export class Class extends AbstractContext {
	constructor( parentContext:Context ) {
		super( parentContext );
	}

	resolve( uri:string ):string {
		if ( RDF.URI.Util.isAbsolute( uri ) ) return uri;

		let finalURI:string = this.parentContext.resolve( this.parentContext.getSetting( "platform.container" ) );
		return RDF.URI.Util.resolve( finalURI, uri );
	}
}

export default Class;
