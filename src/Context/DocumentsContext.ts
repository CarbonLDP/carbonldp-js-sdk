import { Document } from "../Document";
import { MessagingService } from "../Messaging";
import { DocumentsRegistry } from "../DocumentsRegistry/DocumentsRegistry";
import { DocumentsRepository } from "../DocumentsRepository/DocumentsRepository";
import {
	ContextSettings,
	DocumentPaths
} from "../Settings";
import * as Utils from "../Utils";
import { AbstractContext } from "./AbstractContext";
import { GlobalContext } from "./GlobalContext";


export class DocumentsContext extends AbstractContext<Document, Document, GlobalContext> {

	protected _baseURI:string;

	readonly registry:DocumentsRegistry;
	readonly repository:DocumentsRepository;
	readonly messaging:MessagingService;


	private static _mergePaths( this:void, target:ContextSettings[ "paths" ], source:ContextSettings[ "paths" ] ):ContextSettings[ "paths" ] {
		if( ! source ) return target;
		if( ! target ) return Utils.ObjectUtils.clone( source, { objects: true } );

		for( const key of Object.keys( source ) ) {
			const sourcePath:string | DocumentPaths = source[ key ];

			if( sourcePath === null ) {
				delete target[ key ];
				continue;
			}

			const targetPath:string | DocumentPaths = target[ key ];
			if( ! targetPath ) {
				target[ key ] = Utils.isObject( sourcePath ) ?
					Utils.ObjectUtils.clone( sourcePath, { objects: true } ) :
					sourcePath;
				continue;
			}

			if( Utils.isString( sourcePath ) ) {
				if( Utils.isObject( targetPath ) ) {
					targetPath.slug = sourcePath;
				} else {
					target[ key ] = sourcePath;
				}
				continue;
			}

			if( sourcePath.slug === void 0 && sourcePath.paths === void 0 ) continue;

			const targetDocPaths:DocumentPaths = Utils.isString( targetPath ) ?
				target[ key ] = { slug: targetPath } : targetPath;

			if( sourcePath.slug !== void 0 ) targetDocPaths.slug = sourcePath.slug;
			if( sourcePath.paths !== void 0 ) targetDocPaths.paths = DocumentsContext._mergePaths( targetDocPaths.paths, sourcePath.paths );
		}

		return target;
	}


	constructor( url:string ) {
		super( GlobalContext.instance );
		this._baseURI = url;


		this.registry = DocumentsRegistry.createFrom( { $context: this } );
		this.messaging = new MessagingService( this );
	}


	protected _extendPaths( paths:ContextSettings[ "paths" ] ):void {
		this._settings.paths = DocumentsContext._mergePaths( this._settings.paths, paths );
	}

	protected _extendsSettings( settings:ContextSettings ):void {
		this._extendPaths( settings.paths );

		delete settings.paths;
		Utils.ObjectUtils.extend( this._settings, settings );
	}

}


