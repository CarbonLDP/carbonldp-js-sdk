import { AbstractContext } from "../AbstractContext";
import { ModelDecorator } from "../core";
import { TransientDocument } from "../Document";
import { FreeResources } from "../FreeResources";
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
	TransientResource
} from "../Resource";
import { MapUtils } from "../Utils";
import { Registry } from "./Registry";


export class RegistryService<M extends Pointer, C extends AbstractContext<M, any> = undefined> implements Registry<M>, ObjectSchemaResolver {
	readonly _context:C | undefined;

	get _registry():Registry<any> {
		return this._context
			&& this._context.parentContext
			&& this._context.parentContext.registry
			;
	}

	readonly _model:ModelDecorator<M>;
	readonly _resourcesMap:Map<string, M>;

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
		this._context = context;
		this._model = model;

		this._resourcesMap = new Map();

		this._documentDecorators = MapUtils.extend( new Map(), context && context.parentContext && context.parentContext.registry.documentDecorators );
		this._jsonldConverter = new JSONLDConverter( context && context.parentContext && context.parentContext.registry.jsonldConverter.literalSerializers );
	}


	_getLocalID( id:string ):string | null {
		if( ! this._context ) return id;

		const iri:string = ObjectSchemaUtils.resolveURI( id, this._context.getObjectSchema() );
		if( ! URI.isBaseOf( this._context.baseURI, iri ) ) return null;

		return URI.getRelativeURI( iri, this._context.baseURI );
	}

	_register<T extends object>( base:T & { id:string } ):T & M {
		const pointer:T & Pointer = Registry.PROTOTYPE._register.call( this, base );
		return this._model.decorate( pointer );
	}


	getGeneralSchema():DigestedObjectSchema {
		if( ! this._context ) return new DigestedObjectSchema();
		return this._context.getObjectSchema();
	}

	hasSchemaFor( object:object, path?:string ):boolean {
		return ! path;
	}

	getSchemaFor( object:object ):DigestedObjectSchema {
		const schema:DigestedObjectSchema = "types" in object ?
			this._getSchemaForResource( object ) :
			this._getSchemaForNode( object );

		if( ! PersistedResource.isDecorated( object ) || ! object.isPartial() )
			return schema;

		return ObjectSchemaDigester
			._combineSchemas( [
				schema,
				object._partialMetadata.schema,
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
		if( ! this._context ) return new DigestedObjectSchema();

		if( objectID !== void 0 && ! URI.hasFragment( objectID ) && ! URI.isBNodeID( objectID ) && objectTypes.indexOf( TransientDocument.TYPE ) === - 1 )
			objectTypes = objectTypes.concat( TransientDocument.TYPE );

		const objectSchemas:DigestedObjectSchema[] = objectTypes
			.filter( type => this._context.hasObjectSchema( type ) )
			.map( type => this._context.getObjectSchema( type ) )
		;

		return ObjectSchemaDigester
			._combineSchemas( [
				this._context.getObjectSchema(),
				...objectSchemas,
			] );
	}


	_parseFreeNodes( freeNodes:RDFNode[] ):FreeResources {
		const freeResourcesDocument:FreeResources = FreeResources
			.createFrom( { _registry: this, _context: this._context } );

		const resources:TransientResource[] = freeNodes
			.map( node => freeResourcesDocument._register( { id: node[ "@id" ] } ) );

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
}
