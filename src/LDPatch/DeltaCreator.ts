import { isBNodeLabel, isRelative } from "sparqler/iri";

import { BlankNodeToken, CollectionToken, IRIToken, LiteralToken, ObjectToken, PredicateToken, PrefixedNameToken, SubjectToken } from "sparqler/tokens";
import { Converter } from "../JSONLD";
import { XSD } from "../NS";
import { ContainerType, DigestedObjectSchema, DigestedPropertyDefinition, PointerType } from "../ObjectSchema";
import * as Pointer from "../Pointer";
import { URI } from "../RDF";
import * as Resource from "../Resource";
import { isBoolean, isDate, isFunction, isNumber, isString } from "../Utils";

import { AddToken, DeleteToken, LDPatchToken, PrefixToken, SliceToken, UpdateListToken } from "./Tokens";

interface ArrayDelta {
	toAdd:ObjectToken[];
	toDelete:ObjectToken[];
}

interface UpdateDelta {
	slice:[ number, number ];
	objects:ObjectToken[];
}

const typesDefinition:DigestedPropertyDefinition = new DigestedPropertyDefinition();
typesDefinition.literal = false;
typesDefinition.pointerType = PointerType.ID;
typesDefinition.containerType = ContainerType.SET;

export class Class {

	private prefixesMap:Map<string, PrefixToken>;
	private jsonldConverter:Converter.Class;

	private addToken:AddToken;
	private deleteToken:DeleteToken;
	private updateLists:UpdateListToken[];

	constructor( jsonldConverter:Converter.Class ) {
		this.prefixesMap = new Map();
		this.jsonldConverter = jsonldConverter;

		this.addToken = new AddToken();
		this.deleteToken = new DeleteToken();
		this.updateLists = [];
	}

	getPatch():string {
		const patch:LDPatchToken = new LDPatchToken();

		this.prefixesMap.forEach( prefix => patch.prologues.push( prefix ) );

		patch.statements.push( ...this.updateLists );
		if( this.addToken.triples.length ) patch.statements.push( this.addToken );
		if( this.deleteToken.triples.length ) patch.statements.push( this.deleteToken );

		return `${ patch }`;
	}

	addResource( schema:DigestedObjectSchema, oldResource:Resource.Class, newResource:Resource.Class ):void {
		const id:string = newResource.id;
		const resource:IRIToken | PrefixedNameToken | BlankNodeToken = isBNodeLabel( id ) ?
			new BlankNodeToken( id ) : this.compactIRI( schema, id );

		const addTriples:SubjectToken = new SubjectToken( resource );
		const deleteTriples:SubjectToken = new SubjectToken( resource );

		new Set( [
			"types",
			...Object.keys( oldResource ),
			...Object.keys( newResource ),
		] ).forEach( propertyName => {
			if( propertyName === "id" ) return;

			const predicateURI:IRIToken | PrefixedNameToken | "a" = propertyName === "types" ?
				"a" : this.getPropertyIRI( schema, propertyName );

			const definition:DigestedPropertyDefinition = predicateURI === "a" ?
				typesDefinition : schema.properties.get( propertyName );

			const oldValue:any = oldResource[ propertyName ];
			const newValue:any = newResource[ propertyName ];

			if( definition && definition.containerType === ContainerType.LIST && isValidValue( oldValue ) ) {
				if( ! isValidValue( newValue ) ) {
					this.updateLists.push( new UpdateListToken(
						resource,
						predicateURI as IRIToken | PrefixedNameToken,
						new SliceToken( 0 ),
						new CollectionToken()
					) );

					deleteTriples.addPredicate( new PredicateToken( predicateURI )
						.addObject( new CollectionToken() )
					);
					return;
				}

				const tempDefinition:DigestedPropertyDefinition = {
					...definition,
					containerType: ContainerType.SET,
				};

				const oldObjects:ObjectToken[] = this.getObjects( oldValue, schema, tempDefinition );
				const newObjects:ObjectToken[] = this.getObjects( newValue, schema, tempDefinition );

				getListDelta( oldObjects, newObjects ).forEach( updateDelta => {
					const collection:CollectionToken = new CollectionToken();
					updateDelta.objects.forEach( collection.addObject, collection );

					this.updateLists.push( new UpdateListToken(
						resource,
						predicateURI as IRIToken | PrefixedNameToken,
						updateDelta.objects.length ?
							new SliceToken( updateDelta.slice[ 0 ], updateDelta.slice[ 0 ] ) :
							new SliceToken( ...updateDelta.slice ),
						collection
					) );
				} );

			} else {
				const oldObjects:ObjectToken[] = this.getObjects( oldValue, schema, definition );
				const newObjects:ObjectToken[] = this.getObjects( newValue, schema, definition );

				const setDelta:ArrayDelta = getArrayDelta( oldObjects, newObjects );

				const addValues:( objects:ObjectToken[], triple:SubjectToken ) => void = ( objects, triple ) => {
					if( ! objects.length ) return;

					const predicate:PredicateToken = new PredicateToken( predicateURI );
					objects.forEach( predicate.addObject, predicate );

					triple.addPredicate( predicate );
				};

				addValues( setDelta.toAdd, addTriples );
				addValues( setDelta.toDelete, deleteTriples );
			}
		} );

		if( addTriples.predicates.length ) this.addToken.triples.push( addTriples );
		if( deleteTriples.predicates.length ) this.deleteToken.triples.push( deleteTriples );
	}

	private getPropertyIRI( schema:DigestedObjectSchema, propertyName:string ):IRIToken | PrefixedNameToken {
		const propertyDefinition:DigestedPropertyDefinition = schema.properties.get( propertyName );
		const uri:string = propertyDefinition && propertyDefinition.uri ?
			propertyDefinition.uri.stringValue :
			propertyName;

		return this.compactIRI( schema, uri );
	}

	private getObjects( value:any, schema:DigestedObjectSchema, definition?:DigestedPropertyDefinition ):ObjectToken[] {
		const values:any[] = ( Array.isArray( value ) ?
				! definition || definition.containerType !== null ? value : value.slice( 0, 1 ) :
				[ value ]
		).filter( isValidValue );

		if( definition && definition.containerType === ContainerType.LIST ) {
			if( ! isValidValue( value ) ) return [];

			const collection:CollectionToken = new CollectionToken();
			collection.objects.push( ...this.expandValues( values, schema, definition ) );

			return [ collection ];
		}

		if( definition && definition.containerType === ContainerType.LANGUAGE ) {
			return this.expandLanguageMap( values, schema );
		}

		return this.expandValues( values, schema, definition );
	}

	private expandValues( values:any[], schema:DigestedObjectSchema, definition?:DigestedPropertyDefinition ):ObjectToken[] {
		const areDefinedLiteral:boolean = definition && definition.literal !== null ? definition.literal : null;
		return values.map( value => {
			const isLiteral:boolean = areDefinedLiteral !== null ? areDefinedLiteral : ! Pointer.Factory.is( value );

			if( isLiteral ) return this.expandLiteral( value, schema, definition );
			return this.expandPointer( value, schema );
		} ).filter( isValidValue );
	}

	private expandLanguageMap( values:any[], schema:DigestedObjectSchema ):ObjectToken[] {
		if( ! values.length ) return [];
		const languageMap:object = values[ 0 ];

		return Object.keys( languageMap ).map( key => {
			const value:any = languageMap[ key ];

			const tempDefinition:DigestedPropertyDefinition = new DigestedPropertyDefinition();
			tempDefinition.language = key;
			tempDefinition.literalType = new URI.Class( XSD.DataType.string );

			return this.expandLiteral( value, schema, tempDefinition );
		} ).filter( isValidValue );
	}

	private expandPointer( value:any, schema:DigestedObjectSchema ):IRIToken | PrefixedNameToken | BlankNodeToken {
		let id:string = Pointer.Factory.is( value ) ? value.id : value;
		if( ! isString( id ) ) return null;

		return isBNodeLabel( id ) ?
			new BlankNodeToken( id ) :
			this.compactIRI( schema, id );
	}

	private expandLiteral( value:any, schema:DigestedObjectSchema, definition?:DigestedPropertyDefinition ):LiteralToken {
		const type:string = definition && definition.literalType ?
			definition.literalType.stringValue :
			guessType( value );

		if( ! this.jsonldConverter.literalSerializers.has( type ) ) return null;

		value = this.jsonldConverter.literalSerializers.get( type ).serialize( value );
		const literal:LiteralToken = new LiteralToken( value );

		if( type !== XSD.DataType.string ) literal.setType( this.compactIRI( schema, type ) );
		if( definition && definition.language !== void 0 ) literal.setLanguage( definition.language );

		return literal;
	}

	private compactIRI( schema:DigestedObjectSchema, iri:string ):IRIToken | PrefixedNameToken {
		if( isRelative( iri ) && schema.vocab ) iri = schema.vocab + iri;

		// noinspection JSMismatchedCollectionQueryUpdate
		const matchPrefix:[ string, URI.Class ] = Array.from( schema.prefixes.entries() )
			.find( ( [ , prefixURI ] ) => iri.startsWith( prefixURI.stringValue ) );

		if( matchPrefix === void 0 ) return new IRIToken( iri );

		const [ namespace, { stringValue: prefixIRI } ] = matchPrefix;
		if( ! this.prefixesMap.has( namespace ) )
			this.prefixesMap.set( namespace, new PrefixToken( namespace, new IRIToken( prefixIRI ) ) );

		return new PrefixedNameToken( namespace, iri.substr( prefixIRI.length ) );
	}

}

function guessType( value:any ):string {
	if( isFunction( value ) )
		return null;

	if( isString( value ) )
		return XSD.DataType.string;
	if( isDate( value ) )
		return XSD.DataType.dateTime;
	if( isNumber( value ) )
		return XSD.DataType.float;
	if( isBoolean( value ) )
		return XSD.DataType.boolean;

	return null;
}

function getArrayDelta( oldValues:ObjectToken[], newValues:ObjectToken[] ):ArrayDelta {
	const objectMapper:( object:ObjectToken ) => [ string, ObjectToken ] = object => [ `${ object }`, object ];
	const toAdd:Map<string, ObjectToken> = new Map( newValues.map( objectMapper ) );
	const toDelete:Map<string, ObjectToken> = new Map( oldValues.map( objectMapper ) );

	toAdd.forEach( ( value, identifier ) => {
		if( ! toDelete.has( identifier ) ) return;

		toDelete.delete( identifier );
		toAdd.delete( identifier );
	} );

	return {
		toAdd: Array.from( toAdd.values() ),
		toDelete: Array.from( toDelete.values() ),
	};
}

function getListDelta( oldValues:ObjectToken[], newValues:ObjectToken[] ):UpdateDelta[] {
	interface Node {
		identifier:string;
		object:ObjectToken;
		index:number;
	}

	const nodeMapper:( object:ObjectToken, index:number ) => Node = ( object, index ) => ( {
		identifier: `${ object }`,
		object,
		index,
	} );
	const oldPositions:Node[] = oldValues.map( nodeMapper );
	const newPositions:Node[] = newValues.map( nodeMapper );

	const addsSet:Set<Node> = new Set( newPositions );
	const deletes:Node[] = [];

	let offset:number = 0;
	let remnants:Node[] = newPositions;

	oldPositions.forEach( oldNode => {
		const currentIndex:number = remnants.findIndex( newNode => newNode.identifier === oldNode.identifier );

		if( currentIndex === - 1 ) {
			oldNode.index -= offset ++;
			deletes.push( oldNode );
		} else {
			addsSet.delete( remnants[ currentIndex ] );
			remnants = remnants.slice( currentIndex + 1 );
		}
	} );

	const updates:UpdateDelta[] = [];

	let last:UpdateDelta;
	deletes.forEach( node => {
		if( last && last.slice[ 0 ] === node.index ) {
			last.slice = [ last.slice[ 0 ], last.slice[ 1 ] + 1 ];
			return;
		}

		updates.push( last = {
			slice: [ node.index, node.index + 1 ],
			objects: [],
		} );
	} );

	last = void 0;
	addsSet.forEach( node => {
		if( last && last.slice[ 1 ] === node.index ) {
			last.slice = [ last.slice[ 0 ], node.index + 1 ];
			last.objects.push( node.object );
			return;
		}

		updates.push( last = {
			slice: [ node.index, node.index + 1 ],
			objects: [ node.object ],
		} );
	} );

	return updates;
}

function isValidValue( value:any ):boolean {
	return value !== null && value !== void 0;
}


export default Class;
