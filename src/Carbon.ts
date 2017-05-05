import * as AbstractContext from "./AbstractContext";
import * as AccessPoint from "./AccessPoint";
import * as APIDescription from "./APIDescription";
import * as Auth from "./Auth";
import * as Document from "./Document";
import * as Documents from "./Documents";
import * as Errors from "./Errors";
import * as Fragment from "./Fragment";
import * as HTTP from "./HTTP";
import * as JSONLD from "./JSONLD";
import * as LDP from "./LDP";
import * as NamedFragment from "./NamedFragment";
import * as NS from "./NS";
import * as ObjectSchema from "./ObjectSchema";
import * as PersistedDocument from "./PersistedDocument";
import * as PersistedFragment from "./PersistedFragment";
import * as PersistedNamedFragment from "./PersistedNamedFragment";
import * as PersistedResource from "./PersistedResource";
import * as Pointer from "./Pointer";
import * as RDF from "./RDF";
import * as Resource from "./Resource";
import * as SDKContext from "./SDKContext";
import * as Settings from "./Settings";
import * as SPARQL from "./SPARQL";
import * as Utils from "./Utils";

export class Class extends AbstractContext.Class {

	/* tslint:disable: variable-name */
	static AccessPoint:typeof AccessPoint = AccessPoint;
	static Auth:typeof Auth = Auth;
	static Document:typeof Document = Document;
	static Documents:typeof Documents = Documents;
	static Errors:typeof Errors = Errors;
	static Fragment:typeof Fragment = Fragment;
	static HTTP:typeof HTTP = HTTP;
	static JSONLD:typeof JSONLD = JSONLD;
	static LDP:typeof LDP = LDP;
	static NamedFragment:typeof NamedFragment = NamedFragment;
	static NS:typeof NS = NS;
	static ObjectSchema:typeof ObjectSchema = ObjectSchema;
	static PersistedDocument:typeof PersistedDocument = PersistedDocument;
	static PersistedFragment:typeof PersistedFragment = PersistedFragment;
	static PersistedNamedFragment:typeof PersistedNamedFragment = PersistedNamedFragment;
	static PersistedResource:typeof PersistedResource = PersistedResource;
	static Pointer:typeof Pointer = Pointer;
	static RDF:typeof RDF = RDF;
	static Resource:typeof Resource = Resource;
	static SDKContext:typeof SDKContext = SDKContext;
	static Settings:typeof Settings = Settings;
	static SPARQL:typeof SPARQL = SPARQL;
	static Utils:typeof Utils = Utils;
	/* tslint:enable: variable-name */

	static get version():string { return "0.42.0"; }

	get version():string { return Class.version; }

	private domain:string;
	private ssl:boolean;

	constructor( domain:string, ssl?:boolean );
	constructor( domain:string, ssl?:boolean, settings?:Settings.Class );
	constructor( domain:string, ssl?:boolean, settings?:Settings.Class ) {
		super();

		this.domain = domain;
		this.ssl = ssl;

		settings = settings ? Utils.extend( {}, Settings.defaultSettings, settings ) : Settings.defaultSettings;
		Utils.M.extend( this.settings, Utils.M.from( settings ) );
	}

	resolve( uri:string ):string {
		if( RDF.URI.Util.isAbsolute( uri ) ) return uri;

		let baseURI:string = ( this.ssl ? "https://" : "http://" ) + this.domain;
		return RDF.URI.Util.resolve( baseURI, uri );
	}

	getAPIDescription():Promise<APIDescription.Class> {
		return this.documents.get( "api/" ).then(
			( [ description, response ]:[ Document.Class, HTTP.Response.Class ] ) => {
				return <any> description;
			}
		);
	}
}

export default Class;
