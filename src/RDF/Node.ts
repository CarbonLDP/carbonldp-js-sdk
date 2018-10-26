import * as Utils from "../Utils";
import { XSD } from "../Vocabularies/XSD";

import { RDFList } from "./List";
import { RDFLiteral } from "./Literal";
import { URI } from "./URI";
import { RDFValue } from "./Value";


/**
 * Type for any possible value an {@link RDFNode} can have.
 */
export type RDFNodePropertyValue = string | RDFNode | RDFList | RDFValue | RDFLiteral;

/**
 * Interface that represents an RDF Node.
 */
export type RDFNode = {
	/**
	 * The ID URI of the current node.
	 */
	"@id":string;
	"@type"?:string[];

	[ propertyURI:string ]:string | RDFNodePropertyValue[];
};


/**
 * Factory and utils for {@link RDFNode}.
 */
export interface RDFNodeFactory {
	/**
	 * Returns true if the object provided is considered a {@link RDFNode} object.
	 * @param value
	 */
	is( value:any ):value is RDFNode;

	/**
	 * Creates a {@link RDFNode} object with the URI provided.
	 * @param uri
	 */
	create( uri:string ):RDFNode;


	/**
	 * Returns the `@id` of the node.
	 * @param node
	 */
	getID( node:RDFNode ):string;

	/**
	 * Returns the relative `@id` of the node when it is a fragment node.
	 * @param node
	 */
	getRelativeID( node:RDFNode ):string;

	/**
	 * Returns true if the objects represent the same resource.
	 * @param node1
	 * @param node2
	 */
	areEqual( node1:RDFNode, node2:RDFNode ):boolean;

	/**
	 * Returns true if the node has a fragment `@id`, i.e. a named fragment or a blank node label.
	 * @param node
	 */
	isFragment( node:RDFNode ):boolean;

	/**
	 * Returns true if the {@link RDFNode} provided has the specified type.
	 * @param node The node to evaluate.
	 * @param type The type to look for it existence.
	 */
	hasType( node:RDFNode, type:string ):boolean;

	/**
	 * Returns an array with the types of the {@link RDFNode} provided.
	 * @param node The node to evaluate.
	 */
	getTypes( node:RDFNode ):string[];

	/**
	 * Returns the {@link RDFList} object from the provided property of an expanded JSON-LD object.
	 * Returns `undefined` if no {@link RDFList} object is found.
	 * @param propertyValues
	 */
	getList( propertyValues:RDFNodePropertyValue[] ):RDFList | undefined;

	/**
	 * Returns the property array with the parsed {@link RDFLiteral}s.
	 * Returns `undefined` if it cannot be parsed.
	 * @param propertyValues
	 * @param literalType
	 */
	getPropertyLiterals( propertyValues:RDFNodePropertyValue[], literalType:string ):any[] | undefined;

	/**
	 * Returns an object associating the language with the parsed string literal.
	 * Returns an empty object if it is not a property with language.
	 * @param propertyValues
	 */
	getPropertyLanguageMap( propertyValues:RDFNodePropertyValue[] ):object | undefined;
}

/**
 * Constant that implements {@link RDFNodeFactory}.
 */
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
		if( ! ("@type" in node) ) return [];
		return node[ "@type" ];
	},

	getList( propertyValues:RDFNodePropertyValue[] ):RDFList | undefined {
		if( ! Array.isArray( propertyValues ) ) return;

		return propertyValues
			.find( RDFList.is )
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
