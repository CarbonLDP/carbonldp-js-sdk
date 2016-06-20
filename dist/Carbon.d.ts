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
import * as Settings from "./Settings";
import * as SPARQL from "./SPARQL";
import * as Utils from "./Utils";
declare class Carbon extends AbstractContext {
    static AccessPoint: typeof AccessPoint;
    static Agent: typeof Agent;
    static Agents: typeof Agents;
    static App: typeof App;
    static Apps: typeof Apps;
    static Auth: typeof Auth;
    static Document: typeof Document;
    static Documents: typeof Documents;
    static Errors: typeof Errors;
    static Fragment: typeof Fragment;
    static HTTP: typeof HTTP;
    static JSONLDConverter: typeof JSONLDConverter;
    static LDP: typeof LDP;
    static NamedFragment: typeof NamedFragment;
    static NS: typeof NS;
    static ObjectSchema: typeof ObjectSchema;
    static Persisted: typeof Persisted;
    static PersistedApp: typeof PersistedApp;
    static PersistedDocument: typeof PersistedDocument;
    static PersistedFragment: typeof PersistedFragment;
    static PersistedNamedFragment: typeof PersistedNamedFragment;
    static PersistedResource: typeof PersistedResource;
    static Pointer: typeof Pointer;
    static RDF: typeof RDF;
    static Resource: typeof Resource;
    static SDKContext: typeof SDKContext;
    static Settings: typeof Settings;
    static SPARQL: typeof SPARQL;
    static Utils: typeof Utils;
    static version: string;
    apps: Apps.Class;
    version: string;
    constructor(settings?: Settings.Class);
    resolve(uri: string): string;
    getAPIDescription(): Promise<APIDescription.Class>;
}
export default Carbon;
