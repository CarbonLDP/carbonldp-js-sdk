import AbstractContext from "./AbstractContext";
import * as AccessPoint from "./AccessPoint";
import * as Agent from "./Agent";
import * as Agents from "./Agents";
import * as APIDescription from "./APIDescription";
import * as App from "./App";
import * as Apps from "./Apps";
import * as Auth from "./Auth";
import * as Document from "./Document";
import Documents from "./Documents";
import * as Errors from "./Errors";
import * as Fragment from "./Fragment";
import * as HTTP from "./HTTP";
import * as JSONLDConverter from "./JSONLDConverter";
import * as LDP from "./LDP";
import * as NamedFragment from "./NamedFragment";
import * as NS from "./NS";
import * as ObjectSchema from "./ObjectSchema";
import * as Persisted from "./Persisted";
import * as PersistedApp from "./PersistedApp";
import * as PersistedDocument from "./PersistedDocument";
import * as PersistedFragment from "./PersistedFragment";
import * as PersistedNamedFragment from "./PersistedNamedFragment";
import * as PersistedResource from "./PersistedResource";
import * as Pointer from "./Pointer";
import * as RDF from "./RDF";
import * as Resource from "./Resource";
import * as SDKContext from "./SDKContext";
import defaultSettings from "./settings";
import * as SPARQL from "./SPARQL";
import * as Utils from "./Utils";

class Carbon extends AbstractContext {

	/* tslint:disable: variable-name */
	static AccessPoint:typeof AccessPoint = AccessPoint;
	static Agent:typeof Agent = Agent;
	static Agents:typeof Agents = Agents;
	static App:typeof App = App;
	static Apps:typeof Apps = Apps;
	static Auth:typeof Auth = Auth;
	static Document:typeof Document = Document;
	static Documents:typeof Documents = Documents;
	static Errors:typeof Errors = Errors;
	static Fragment:typeof Fragment = Fragment;
	static HTTP:typeof HTTP = HTTP;
	static JSONLDConverter:typeof JSONLDConverter = JSONLDConverter;
	static LDP:typeof LDP = LDP;
	static NamedFragment:typeof NamedFragment = NamedFragment;
	static NS:typeof NS = NS;
	static ObjectSchema:typeof ObjectSchema = ObjectSchema;
	static Persisted:typeof Persisted = Persisted;
	static PersistedApp:typeof PersistedApp = PersistedApp;
	static PersistedDocument:typeof PersistedDocument = PersistedDocument;
	static PersistedFragment:typeof PersistedFragment = PersistedFragment;
	static PersistedNamedFragment:typeof PersistedNamedFragment = PersistedNamedFragment;
	static PersistedResource:typeof PersistedResource = PersistedResource;
	static Pointer:typeof Pointer = Pointer;
	static RDF:typeof RDF = RDF;
	static Resource:typeof Resource = Resource;
	static SDKContext:typeof SDKContext = SDKContext;
	static SPARQL:typeof SPARQL = SPARQL;
	static Utils:typeof Utils = Utils;
	/* tslint:enable: variable-name */

	// TODO: Get package.json version directly
	static get version():string { return "0.28.0"; }

	apps:Apps.Class;
	get version():string { return Carbon.version; }

	// TODO: Define settings type
	constructor( settings?:any ) {
		super();

		settings = settings ? settings : defaultSettings;

		Utils.M.extend( this.settings, Utils.M.from( settings ) );

		this.apps = new Apps.Class( this );
	}

	resolve( uri:string ):string {
		if ( RDF.URI.Util.isAbsolute( uri ) ) return uri;

		let finalURI:string = this.settings.get( "http.ssl" ) ? "https://" : "http://";
		finalURI += this.settings.get( "domain" ) + "/" + this.getSetting( "platform.container" );
		return RDF.URI.Util.resolve( finalURI, uri );
	}

	getAPIDescription():Promise<APIDescription.Class> {
		return this.documents.get( "api/" ).then(
			( [ description, response ]:[ Document.Class, HTTP.Response.Class ] ) => {
				return <any> description;
			}
		);
	}
}

export default Carbon;
