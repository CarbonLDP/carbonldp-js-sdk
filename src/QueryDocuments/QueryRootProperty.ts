import {
	IRIToken,
	LimitToken,
	LiteralToken,
	ObjectToken,
	OffsetToken,
	OrderToken,
	PatternToken,
	PropertyToken,
	SubjectToken,
	SubSelectToken,
	VariableToken
} from "sparqler/tokens";

import { IllegalArgumentError } from "../Errors/IllegalArgumentError";
import { IllegalStateError } from "../Errors/IllegalStateError";

import { DigestedObjectSchemaProperty } from "../ObjectSchema/DigestedObjectSchemaProperty";

import { LDP } from "../Vocabularies/LDP";

import { QueryDocumentsOrder } from "./QueryDocumentsOrder";
import { QueryProperty } from "./QueryProperty";
import { QueryPropertyType } from "./QueryPropertyType";
import { QueryRootPropertyData } from "./QueryRootPropertyData";
import { QueryRootPropertyType } from "./QueryRootPropertyType";


/**
 * Property that represents the target resource of single fetch query.
 */
export class QueryRootProperty extends QueryProperty {
	readonly parent:undefined;

	readonly containerIRI?:IRIToken;

	order?:QueryDocumentsOrder;
	protected _limit?:number;
	protected _offset?:number;

	constructor( data:QueryRootPropertyData ) {
		super( {
			queryContainer: data.queryContainer,
			name: data.queryRootPropertyType,

			definition: new DigestedObjectSchemaProperty(),

			optional: false,
			propertyType: QueryPropertyType.PARTIAL,

			values: data.values,
		} );

		this.containerIRI = data.containerIRI;
	}


	getSelfPattern():PatternToken {
		return super.__createSelfPattern();
	}

	protected __createSearchPatterns():PatternToken[] {
		const patterns:PatternToken[] = [];

		if( this.name !== QueryRootPropertyType.DOCUMENT ) {
			patterns.push( this.__createSearchSelfPattern() );
		} else {
			const values:PatternToken | undefined = this.__createValuesPattern();
			if( values ) patterns.push( values );

			patterns.push( ...this.__createRootPatterns() );
		}

		patterns.push(
			...this.__createPropertyPatterns(),
			...this.__createFilterPatterns()
		);

		return patterns;
	}

	protected __createSelfPattern():PatternToken {
		const subSelect:SubSelectToken = new SubSelectToken( "DISTINCT" )
			.addVariable( this.variable )
			.addPattern( ...this.__createRootPatterns() );

		// Add non-optional properties that may affect pagination
		const valuedPatterns:PatternToken[] | undefined = this.__getValuedPatterns();
		if( valuedPatterns ) subSelect.addPattern( ...valuedPatterns );

		this.__addOrderTo( subSelect );
		this.__addLimitTo( subSelect );
		this.__addOffsetTo( subSelect );

		return subSelect;
	}

	protected __createRootPatterns():PatternToken[] {
		switch( this.name ) {
			case QueryRootPropertyType.CHILD:
				return [ this.__createChildSelfPattern() ];

			case QueryRootPropertyType.MEMBER:
				return this.__createMemberSelfPattern();

			case QueryRootPropertyType.DOCUMENT:
				return [];

			default:
				throw new IllegalStateError( `Invalid container type.` );
		}
	}

	protected __createChildSelfPattern():PatternToken {
		return new SubjectToken( this.containerIRI! )
			.addProperty( new PropertyToken( this.queryContainer.compactIRI( LDP.contains ) )
				.addObject( this.identifier )
			);
	}

	protected __createMemberSelfPattern():PatternToken[] {
		const membershipResource:VariableToken = this.queryContainer.getVariable( "membershipResource" );
		const hasMemberRelation:VariableToken = this.queryContainer.getVariable( "hasMemberRelation" );

		const memberRelations:PatternToken = new SubSelectToken()
			.addVariable( membershipResource, hasMemberRelation )
			.addPattern( new SubjectToken( this.containerIRI! )
				.addProperty( new PropertyToken( this.queryContainer.compactIRI( LDP.membershipResource ) )
					.addObject( membershipResource )
				)
				.addProperty( new PropertyToken( this.queryContainer.compactIRI( LDP.hasMemberRelation ) )
					.addObject( hasMemberRelation )
				)
			);

		const memberSelection:PatternToken = new SubjectToken( membershipResource )
			.addProperty( new PropertyToken( hasMemberRelation )
				.addObject( this.identifier )
			);

		return [ memberRelations, memberSelection ];
	}

	protected __addLimitTo( subSelect:SubSelectToken ):void {
		if( this._limit === void 0 ) return;

		subSelect.addModifier( new LimitToken( this._limit ) );
	}

	protected __addOffsetTo( subSelect:SubSelectToken ):void {
		if( this._offset === void 0 ) return;
		subSelect.addModifier( new OffsetToken( this._offset ) );
	}

	protected __addOrderTo( subSelect:SubSelectToken ):void {
		if( !this.order ) return;

		const targetProperty:QueryProperty | undefined = this.getProperty( this.order.path, { create: true } );
		if( !targetProperty ) throw new IllegalArgumentError( `Property "${ this.order.path }" hasn't been defined.` );

		const identifier:VariableToken | IRIToken | LiteralToken = targetProperty.identifier;
		const constraint:VariableToken | string = identifier.token === "variable"
			? identifier
			: `( ${ identifier } )`;

		// Add modifier
		subSelect.addModifier( new OrderToken( constraint, this.order.flow ) );

		const orderPatterns:PatternToken[] = this.__createSubPatternsFrom( targetProperty );
		// Add patterns to the sub-select that do not exists
		orderPatterns
			.filter( pattern => {
				if( pattern.token !== "subject" ) return true;

				const targetSubject:SubjectToken | undefined = subSelect
					.where.groupPattern.patterns
					.find( ( selectPattern ):selectPattern is SubjectToken => {
						if( selectPattern.token !== "subject" ) return false;
						return selectPattern.subject === pattern.subject;
					} );

				if( !targetSubject ) return true;

				pattern.properties.forEach( property => {
					const targetPredicate:PropertyToken | undefined = targetSubject
						.properties
						.find( ( selectProperty ) => {
							return property.toString() === selectProperty.toString();
						} );

					if( !targetPredicate )
						targetSubject.addProperty( property );

					property.objects.forEach( object => {
						const targetObject:ObjectToken | undefined = targetPredicate!
							.objects
							.find( ( selectObject ) => {
								return selectObject.toString() === object.toString();
							} );

						if( !targetObject )
							targetPredicate!.addObject( object );
					} );
				} );
			} )
			.forEach( pattern => {
				subSelect.addPattern( pattern );
			} )
		;
	}

	protected __createSubPatternsFrom( targetProperty:QueryProperty ):PatternToken[] {
		let matchPatterns:PatternToken[] = [];

		// While not been the root property
		while( targetProperty !== this ) {
			const subTargetPattern:PatternToken = targetProperty.getSelfPattern();

			// Append non optional
			if( subTargetPattern.token !== "optional" ) {
				matchPatterns.unshift( subTargetPattern );

				// Added as sub-pattern of the optional
			} else {
				matchPatterns = [
					subTargetPattern
						.addPattern( ...matchPatterns ),
				];
			}

			if( !targetProperty.parent ) break;
			targetProperty = targetProperty.parent;
		}

		return matchPatterns;
	}


	// Override to be added in the sub-select
	protected __addTypesTo( pattern:SubjectToken ):void {
		if( this.name !== QueryRootPropertyType.DOCUMENT ) return;
		super.__addTypesTo( pattern );
	}


	/**
	 * Sets the order for the sub-select of the contained resources.
	 * @param order Object with the order specification.
	 */
	setOrder( order:QueryDocumentsOrder ):void {
		this.order = order;
	}

	/**
	 * Sets the limit for the sub-select of the contained resources.
	 * @param limit The limit to set.
	 */
	setLimit( limit:number ):void {
		this._limit = limit;
	}

	/**
	 * Sets the offset for the sub-select of the contained resources.
	 * @param offset The offset to set.
	 */
	setOffset( offset:number ):void {
		this._offset = offset;
	}

}
