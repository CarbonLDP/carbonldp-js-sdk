import AbstractContext from "./../AbstractContext";
import Context from "./../Context";
import * as RDF from "./../RDF";
import PersistedApp from "./PersistedApp";

class AppContext extends AbstractContext {
	private app:PersistedApp;
	private base:string;

	constructor( parentContext:Context, app:PersistedApp ) {
		super( parentContext );
		this.app = app;

		this.base = this.getBase( this.app );
	}

	resolve( uri:string ):string {
		if ( RDF.URI.Util.isAbsolute( uri ) ) return uri;

		let finalURI:string = this.parentContext.resolve( this.base );
		return RDF.URI.Util.resolve( finalURI, uri );
	}

	private getBase( resource:PersistedApp ):string {
		return resource.rootContainer.id;
	}
}

export default AppContext;
