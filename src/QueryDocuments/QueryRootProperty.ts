import {
	LimitToken,
	ObjectToken,
	OffsetToken,
	OrderToken,
	PatternToken,
	PropertyToken,
	SubjectToken,
	SubSelectToken
} from "sparqler/tokens";

import { IllegalArgumentError } from "../Errors/IllegalArgumentError";
import { IllegalStateError } from "../Errors/IllegalStateError";

import { QueryContainerType } from "./QueryContainerType";
import { QueryDocumentsOrder } from "./QueryDocumentsOrder";
import { QueryProperty } from "./QueryProperty";
import { QueryPropertyType } from "./QueryPropertyType";
import { QueryRootPropertyData } from "./QueryRootPropertyData";


export class QueryRootProperty extends QueryProperty {
	readonly parent:undefined;

	order?:QueryDocumentsOrder;
	protected _limit?:number;
	protected _offset?:number;


	constructor( data:QueryRootPropertyData ) {
		super( {
			...data,
			optional: false,
			propertyType: QueryPropertyType.PARTIAL,
		} );
	}


	isMultipleContainer():boolean {
		return this.containerType !== void 0
			&& this.containerType !== QueryContainerType.DOCUMENT;
	}


	protected __createSelfPattern():PatternToken {
		switch( this.containerType ) {
			case QueryContainerType.CHILDREN:
			case QueryContainerType.MEMBERS:
				return this.__createSubSelectPattern();

			case QueryContainerType.DOCUMENT:
				return super.__createSelfPattern();

			default:
				throw new IllegalStateError( `Invalid container root type "${ QueryContainerType[ this.containerType ] }".` );
		}
	}

	protected __createSubSelectPattern():SubSelectToken {
		const subSelect:SubSelectToken = new SubSelectToken( "DISTINCT" )
			.addVariable( this.variable );

		if( this.containerType === QueryContainerType.CHILDREN ) {
			subSelect.addPattern( this.__createChildSelfPattern() );
		} else if( this.containerType === QueryContainerType.MEMBERS ) {
			subSelect.addPattern( ...this.__createMemberSelfPattern() );
		}

		// Add non-optional properties that may affect pagination
		const valuedPatterns:PatternToken[] | undefined = this
			.__getValuedPatterns();
		if( valuedPatterns )
			subSelect.addPattern( ...valuedPatterns );


		if( this.order ) {
			const targetProperty:QueryProperty | undefined = this.getProperty( this.order.path, { create: true } );
			if( ! targetProperty ) throw new IllegalArgumentError( `Property "${ this.order.path }" hasn't been defined.` );

			// Add modifier
			subSelect.addModifier( new OrderToken( targetProperty.variable, this.order.flow ) );

			const orderPatterns:PatternToken[] = this.__createSubPatternsFrom( targetProperty );
			// Add patterns to the sub-select that do not exists
			orderPatterns
				.filter( pattern => {
					if( pattern.token !== "subject" ) return true;

					const targetSubject:SubjectToken | undefined = subSelect
						.where.groupPattern.patterns
						.find( ( selectPattern ):selectPattern is SubjectToken => {
							if( selectPattern.token !== "subject" ) return;
							return selectPattern.subject === pattern.subject;
						} );

					if( ! targetSubject ) return true;

					pattern.properties.forEach( property => {
						const targetPredicate:PropertyToken | undefined = targetSubject
							.properties
							.find( ( selectProperty ) => {
								return property.toString() === selectProperty.toString();
							} );

						if( ! targetPredicate )
							targetSubject.addProperty( property );

						property.objects.forEach( object => {
							const targetObject:ObjectToken | undefined = targetPredicate
								.objects
								.find( ( selectObject ) => {
									return selectObject.toString() === object.toString();
								} );

							if( ! targetObject )
								targetPredicate.addObject( object );
						} );
					} );
				} )
				.forEach( pattern => {
					subSelect.addPattern( pattern );
				} )
			;
		}

		if( this._limit !== void 0 ) {
			subSelect.addModifier( new LimitToken( this._limit ) );
		}

		if( this._offset !== void 0 ) {
			subSelect.addModifier( new OffsetToken( this._offset ) );
		}

		return subSelect;
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

			targetProperty = targetProperty.parent;
		}

		return matchPatterns;
	}


	// Override to only add when DOCUMENT, other case will be added in the sub-select
	protected __addTypesTo( pattern:SubjectToken ):void {
		if( this.containerType !== QueryContainerType.DOCUMENT )
			return;

		super.__addTypesTo( pattern );
	}


	setOrder( order:QueryDocumentsOrder ):void {
		this.order = order;
	}

	setLimit( limit:number ):void {
		this._limit = limit;
	}

	setOffset( offset:number ):void {
		this._offset = offset;
	}

}
