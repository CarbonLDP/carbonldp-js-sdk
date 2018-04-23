import { AbstractContext } from "./AbstractContext";
import * as Auth from "./Auth";
import { Document } from "./Document";
import { Documents } from "./Documents";
import * as Errors from "./Errors";
import { Fragment } from "./Fragment";
import { FreeResources } from "./FreeResources";
import * as HTTP from "./HTTP";
import * as JSONLD from "./JSONLD";
import * as LDP from "./LDP";
import * as LDPatch from "./LDPatch";
import * as Messaging from "./Messaging";
import { NamedFragment } from "./NamedFragment";
import { ContainerType, DigestedObjectSchema, DigestedObjectSchemaProperty, ObjectSchemaDigester, ObjectSchemaUtils, PointerType } from "./ObjectSchema";
import { Pointer } from "./Pointer";
import { ProtectedDocument } from "./ProtectedDocument";
import * as RDF from "./RDF";
import { Resource, TransientResource } from "./Resource";
import { globalContext, SDKContext } from "./SDKContext";
import { ServiceAwareDocument } from "./ServiceAwareDocument";
import { CarbonLDPSettings, ContextSettings } from "./Settings";
import * as SHACL from "./SHACL";
import * as SPARQL from "./SPARQL";
import * as System from "./System";
import { TransientAccessPoint } from "./TransientAccessPoint";
import { TransientBlankNode } from "./BlankNode";
import { TransientDocument } from "./Document";
import { TransientFragment } from "./Fragment";
import { TransientNamedFragment } from "./NamedFragment";
import { TransientProtectedDocument } from "./TransientProtectedDocument";
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
    static NamedFragment: typeof NamedFragment;
    static ProtectedDocument: typeof ProtectedDocument;
    static Resource: typeof Resource;
    static Pointer: typeof Pointer;
    static TransientProtectedDocument: typeof TransientProtectedDocument;
    static RDF: typeof RDF;
    static TransientResource: typeof TransientResource;
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
