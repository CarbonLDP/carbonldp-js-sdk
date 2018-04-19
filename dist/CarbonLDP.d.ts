import { AbstractContext } from "./AbstractContext";
import { TransientAccessPoint } from "./TransientAccessPoint";
import * as Auth from "./Auth";
import { TransientBlankNode } from "./TransientBlankNode";
import { TransientDocument } from "./TransientDocument";
import { Documents } from "./Documents";
import * as Errors from "./Errors";
import { TransientFragment } from "./TransientFragment";
import { FreeResources } from "./FreeResources";
import { PersistedProtectedDocument } from "./PersistedProtectedDocument";
import { ProtectedDocument } from "./ProtectedDocument";
import { ServiceAwareDocument } from "./ServiceAwareDocument";
import * as HTTP from "./HTTP";
import * as JSONLD from "./JSONLD";
import * as LDP from "./LDP";
import * as LDPatch from "./LDPatch";
import * as Messaging from "./Messaging";
import { TransientNamedFragment } from "./TransientNamedFragment";
import { ContainerType, DigestedObjectSchema, DigestedObjectSchemaProperty, ObjectSchemaDigester, ObjectSchemaUtils, PointerType } from "./ObjectSchema";
import { Document } from "./Document";
import { Fragment } from "./Fragment";
import { PersistedNamedFragment } from "./PersistedNamedFragment";
import { PersistedResource } from "./PersistedResource";
import { Pointer } from "./Pointer";
import * as RDF from "./RDF";
import { Resource } from "./Resource";
import { globalContext, SDKContext } from "./SDKContext";
import { CarbonLDPSettings, ContextSettings } from "./Settings";
import * as SHACL from "./SHACL";
import * as SPARQL from "./SPARQL";
import * as System from "./System";
import * as Utils from "./Utils";
import * as Vocabularies from "./Vocabularies";
export declare class CarbonLDP extends AbstractContext {
    static AbstractContext: typeof AbstractContext;
    static TransientAccessPoint: typeof TransientAccessPoint;
    static Auth: typeof Auth;
    static TransientBlankNode: typeof TransientBlankNode;
    static TransientDocument: typeof TransientDocument;
    static Documents: typeof Documents;
    static Errors: typeof Errors;
    static TransientFragment: typeof TransientFragment;
    static FreeResources: typeof FreeResources;
    static HTTP: typeof HTTP;
    static JSONLD: typeof JSONLD;
    static LDP: typeof LDP;
    static LDPatch: typeof LDPatch;
    static Messaging: typeof Messaging;
    static TransientNamedFragment: typeof TransientNamedFragment;
    static Vocabularies: typeof Vocabularies;
    static ObjectSchemaUtils: typeof ObjectSchemaUtils;
    static ObjectSchemaDigester: typeof ObjectSchemaDigester;
    static DigestedObjectSchemaProperty: typeof DigestedObjectSchemaProperty;
    static PointerType: typeof PointerType;
    static ContainerType: typeof ContainerType;
    static DigestedObjectSchema: typeof DigestedObjectSchema;
    static Document: typeof Document;
    static Fragment: typeof Fragment;
    static PersistedNamedFragment: typeof PersistedNamedFragment;
    static PersistedProtectedDocument: typeof PersistedProtectedDocument;
    static PersistedResource: typeof PersistedResource;
    static Pointer: typeof Pointer;
    static ProtectedDocument: typeof ProtectedDocument;
    static RDF: typeof RDF;
    static Resource: typeof Resource;
    static SDKContext: typeof SDKContext;
    static globalContext: typeof globalContext;
    static ServiceAwareDocument: typeof ServiceAwareDocument;
    static SHACL: typeof SHACL;
    static SPARQL: typeof SPARQL;
    static System: typeof System;
    static Utils: typeof Utils;
    static readonly version: string;
    readonly version: string;
    protected _baseURI: string;
    protected settings: ContextSettings;
    messaging: Messaging.MessagingService;
    constructor(url: string);
    constructor(settings: CarbonLDPSettings);
    getPlatformMetadata(): Promise<System.PlatformMetadata>;
}
