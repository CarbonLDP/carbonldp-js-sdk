import { PointerLibrary } from "../Pointer";
import { XSD } from "../Vocabularies/XSD";
import * as Utils from "./../Utils";
import { RDFDocument } from "./Document";
import { RDFList } from "./List";
import { RDFLiteral } from "./Literal";
import { URI } from "./URI";
import { RDFValue } from "./Value";

export type RDFNodePropertyValue = string | RDFNode | RDFList | RDFValue | RDFLiteral;

export interface RDFNode {
	"@id":string;
	"@type"?:string[];

	[propertyURI:string]:string | RDFNodePropertyValue[];
}


export interface RDFNodeFactory {
	is( value:any ):value is RDFNode;

	create( uri:string ):RDFNode;


	getID( node:RDFNode ):string;

	getRelativeID( node:RDFNode ):string;

	areEqual( node1:RDFNode, node2:RDFNode ):boolean;

	isFragment( node:RDFNode ):boolean;

	hasType( node:RDFNode, type:string ):boolean;

	getTypes( node:RDFNode ):string[];

	getFreeNodes( objects:object | object[] ):RDFNode[];

	getList( propertyValues:RDFNodePropertyValue[] ):RDFList | undefined;

	getProperties( propertyValues:RDFNodePropertyValue[], pointerLibrary:PointerLibrary ):any[] | undefined;

	getPropertyPointers( propertyValues:RDFNodePropertyValue[], pointerLibrary:PointerLibrary ):any[] | undefined;

	getPropertyLiterals( propertyValues:RDFNodePropertyValue[], literalType:string ):any[] | undefined;

	getPropertyLanguageMap( propertyValues:RDFNodePropertyValue[] ):object | undefined;
}

export const RDFNode:RDFNodeFactory = {
	is( value:any ):value is RDFNode {
		return Utils.hasProperty( value, "@id" )
			&& Utils.isString( value[ "@id" ] );
	},

	create( uri:string ):RDFNode {
		return {
			"@id": uri,
		};
	},


	getID( node:RDFNode ):string {
		return node[ "@id" ];
	},

	getRelativeID( node:RDFNode ):string {
		const id:string = RDFNode.getID( node );
		return URI.hasFragment( id ) ? URI.getFragment( id ) : id;
	},

	areEqual( node1:RDFNode, node2:RDFNode ):boolean {
		return RDFNode.getID( node1 ) === RDFNode.getID( node2 );
	},

	isFragment( node:RDFNode ):boolean {
		const id:string = RDFNode.getID( node );
		return URI.hasFragment( id ) || URI.isBNodeID( id );
	},

	hasType( node:RDFNode, type:string ):boolean {
		return RDFNode.getTypes( node ).indexOf( type ) !== - 1;
	},

	getTypes( node:RDFNode ):string[] {
		if( ! ( "@type" in node ) ) return [];
		return node[ "@type" ];
	},

	getFreeNodes( objects:object | object[] ):RDFNode[] {
		if( ! Array.isArray( objects ) ) return [];

		return objects
			.filter( element => ! RDFDocument.is( element ) )
			.filter( RDFNode.is );
	},

	getList( propertyValues:RDFNodePropertyValue[] ):RDFList | undefined {
		if( ! Array.isArray( propertyValues ) ) return;

		return propertyValues
			.find( RDFList.is )
			;
	},

	getProperties( propertyValues:RDFNodePropertyValue[], pointerLibrary:PointerLibrary ):any[] | undefined {
		if( ! Array.isArray( propertyValues ) ) return;

		return propertyValues
			.map( RDFValue.parse.bind( null, pointerLibrary ) )
			.filter( value => ! Utils.isNull( value ) )
			;
	},

	getPropertyPointers( propertyValues:RDFNodePropertyValue[], pointerLibrary:PointerLibrary ):any[] | undefined {
		if( ! Array.isArray( propertyValues ) ) return;

		return propertyValues
			.filter( RDFNode.is )
			.map( RDFNode.getID )
			.map( pointerLibrary.getPointer, pointerLibrary )
			.filter( pointer => ! Utils.isNull( pointer ) )
			;
	},

	getPropertyLiterals( propertyValues:RDFNodePropertyValue[], literalType:string ):any[] | undefined {
		if( ! Array.isArray( propertyValues ) ) return;

		return propertyValues
			.filter( RDFLiteral.is )
			.filter( literal => RDFLiteral.hasType( literal, literalType ) )
			.map( RDFLiteral.parse )
			;
	},

	getPropertyLanguageMap( propertyValues:RDFNodePropertyValue[] ):object | undefined {
		if( ! Array.isArray( propertyValues ) ) return;

		const propertyLanguageMap:object = {};
		for( const propertyValue of propertyValues ) {
			if( ! RDFLiteral.is( propertyValue ) ) continue;
			if( ! RDFLiteral.hasType( propertyValue, XSD.string ) ) continue;

			const languageTag:string = propertyValue[ "@language" ];
			if( ! languageTag ) continue;

			propertyLanguageMap[ languageTag ] = RDFLiteral.parse( propertyValue );
		}

		return propertyLanguageMap;
	},

};

export default RDFNode;
