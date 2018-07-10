import { AbstractContext } from "../Context/AbstractContext";
import { ModelDecorator } from "../Model";
import { TransientDocument } from "../Document";
import { FreeResources } from "../FreeResources";
import { Response } from "../HTTP";
import {
	HTTPError,
	statusCodeMap,
	UnknownError
} from "../HTTP/Errors";
import { JSONLDConverter, } from "../JSONLD";
import {
	DigestedObjectSchema,
	ObjectSchemaDigester,
	ObjectSchemaResolver,
	ObjectSchemaUtils,
} from "../ObjectSchema";
import {
	Pointer,
	PointerLibrary
} from "../Pointer";
import {
	RDFNode,
	URI,
} from "../RDF";
import {
	PersistedResource,
	Resource
} from "../Resource";
import { MapUtils } from "../Utils";
import { Registry } from "./Registry";


export class RegistryService<M extends Pointer, C extends AbstractContext<M, any> = undefined> implements Registry<M>, ObjectSchemaResolver {
	readonly context:C | undefined;

	get $registry():Registry<any> | undefined {
		return this.context
			&& this.context.parentContext
			&& this.context.parentContext.$registry
			;
	}

	protected readonly _model:ModelDecorator<M>;
	readonly __resourcesMap:Map<string, M>;

	protected readonly _documentDecorators:Map<string, ( object:object ) => object>;
	get documentDecorators():Map<string, ( object:object ) => object> { return this._documentDecorators; }

	protected readonly _jsonldConverter:JSONLDConverter;
	get jsonldConverter():JSONLDConverter { return this._jsonldConverter; }


	inScope:Registry<M>[ "inScope" ] = Registry.PROTOTYPE.inScope;

	hasPointer:Registry<M>[ "hasPointer" ] = Registry.PROTOTYPE.hasPointer;
	getPointer:Registry<M>[ "getPointer" ] = Registry.PROTOTYPE.getPointer as Registry<M>[ "getPointer" ];
	getPointers:Registry<M>[ "getPointers" ] = Registry.PROTOTYPE.getPointers as Registry<M>[ "getPointers" ];
	removePointer:Registry<M>[ "removePointer" ] = Registry.PROTOTYPE.removePointer;


	constructor( model:ModelDecorator<M>, context?:C ) {
		this.context = context;
		this._model = model;

		this.__resourcesMap = new Map();

		this._documentDecorators = MapUtils.extend( new Map(), context && context.parentContext && context.parentContext.$registry.documentDecorators );
		this._jsonldConverter = new JSONLDConverter( context && context.parentContext && context.parentContext.$registry.jsonldConverter.literalSerializers );
	}


	_getLocalID( id:string ):string {
		if( ! this.context ) return id;

		const schema:DigestedObjectSchema = this.context.getObjectSchema();
		const iri:string = ObjectSchemaUtils.resolveURI( id, schema );

		if( ! URI.isBaseOf( this.context.baseURI, iri ) )
			return Registry.PROTOTYPE._getLocalID.call( this, id );

		return URI.getRelativeURI( iri, this.context.baseURI );
	}

	_addPointer<T extends object>( base:T & { id:string } ):T & M {
		const pointer:T & Pointer = Registry.PROTOTYPE._addPointer.call( this, base );
		const resource:T & M = this._model.decorate( pointer );

		if( ! this.context ) return resource;

		const schema:DigestedObjectSchema = this.context.getObjectSchema();
		resource.$id = ObjectSchemaUtils
			.resolveURI( resource.$id, schema, { base: true } );

		return resource;
	}


	getGeneralSchema():DigestedObjectSchema {
		if( ! this.context ) return new DigestedObjectSchema();
		return this.context.getObjectSchema();
	}

	hasSchemaFor( object:object, path?:string ):boolean {
		return ! path;
	}

	getSchemaFor( object:object ):DigestedObjectSchema {
		const schema:DigestedObjectSchema = "types" in object || "id" in object ?
			this._getSchemaForResource( object ) :
			this._getSchemaForNode( object );

		if( ! PersistedResource.isDecorated( object ) || ! object.isQueried() )
			return schema;

		return ObjectSchemaDigester
			._combineSchemas( [
				schema,
				object.__partialMetadata.schema,
			] );
	}

	protected _getSchemaForNode( node:{ "@id"?:string, "@type"?:string[] } ):DigestedObjectSchema {
		const types:string[] = RDFNode.getTypes( node as any );
		return this._getSchema( types, node[ "@id" ] );
	}

	protected _getSchemaForResource( resource:{ id?:string, types?:string[] } ):DigestedObjectSchema {
		const types:string[] = resource.types || [];
		return this._getSchema( types, resource.id );
	}

	protected _getSchema( objectTypes:string[], objectID?:string ):DigestedObjectSchema {
		if( ! this.context ) return new DigestedObjectSchema();

		if( objectID !== void 0 && ! URI.hasFragment( objectID ) && ! URI.isBNodeID( objectID ) && objectTypes.indexOf( TransientDocument.TYPE ) === - 1 )
			objectTypes = objectTypes.concat( TransientDocument.TYPE );

		const objectSchemas:DigestedObjectSchema[] = objectTypes
			.filter( type => this.context.hasObjectSchema( type ) )
			.map( type => this.context.getObjectSchema( type ) )
		;

		return ObjectSchemaDigester
			._combineSchemas( [
				this.context.getObjectSchema(),
				...objectSchemas,
			] );
	}


	_parseFreeNodes( freeNodes:RDFNode[] ):FreeResources {
		const freeResourcesDocument:FreeResources = FreeResources
			.createFrom( { _registry: this } );

		const resources:Resource[] = freeNodes
			.map( node => freeResourcesDocument._addPointer( { id: node[ "@id" ] } ) );

		this._compactRDFNodes( freeNodes, resources, freeResourcesDocument );

		return freeResourcesDocument;
	}

	protected _compactRDFNodes( nodes:RDFNode[], targets:object[], library:PointerLibrary ):void {
		for( let i:number = 0; i < nodes.length; i ++ ) {
			const node:RDFNode = nodes[ i ];
			const target:object = targets[ i ] || {};
			this._compactRDFNode( node, target, library );
		}
	}

	protected _compactRDFNode( node:RDFNode, target:object, library:PointerLibrary ):void {
		const digestedSchema:DigestedObjectSchema = this.getSchemaFor( node );
		this.jsonldConverter.compact( node, target, digestedSchema, library );
	}


	_parseFailedResponse<T extends object>( response:Response | Error | null ):Promise<never> {
		if( ! response || response instanceof Error ) return Promise.reject( response );

		if( ! statusCodeMap.has( response.status ) )
			return Promise.reject( new UnknownError( response.data, response ) );

		const error:HTTPError = new (statusCodeMap.get( response.status ))( response.data, response );
		return Promise.reject( error );
	}
}
