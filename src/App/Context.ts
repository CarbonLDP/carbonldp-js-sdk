import AbstractContext from "./../AbstractContext";
import Auth from "./Auth";
import Context from "./../Context";
import * as RDF from "./../RDF";
import PersistedApp from "./../PersistedApp";

export class Class extends AbstractContext {
	public auth:Auth;

	public get app():PersistedApp { return this._app; };

	private _app:PersistedApp;
	private base:string;

	constructor( parentContext:Context, app:PersistedApp ) {
		super( parentContext );
		this.auth = new Auth( this );
		this._app = app;

		this.base = this.getBase( this.app );

		// Reassign the rootContainer pointer because the previous one was created in the SDKContext and this one must be resolved by this context.
		// TODO: Delete previous pointer from the SDKContext
		app.rootContainer = <any> this.documents.getPointer( app.rootContainer.id );
	}

	resolve( uri:string ):string {
		if( RDF.URI.Util.isAbsolute( uri ) ) return uri;

		let finalURI:string = this.parentContext.resolve( this.base );
		return RDF.URI.Util.resolve( finalURI, uri );
	}

	private getBase( resource:PersistedApp ):string {
		return resource.rootContainer.id;
	}
}

export default Class;
