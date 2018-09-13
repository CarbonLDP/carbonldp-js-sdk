import { LimitToken, OffsetToken, OrderToken, PatternToken, SubSelectToken } from "sparqler/tokens";

import { IllegalArgumentError } from "../Errors/IllegalArgumentError";
import { IllegalStateError } from "../Errors/IllegalStateError";

import { QueryBuilderProperty } from "./QueryBuilderProperty";
import { QueryContainerType } from "./QueryContainerType";
import { QueryDocumentsOrder } from "./QueryDocumentsOrder";
import { QueryProperty } from "./QueryProperty";
import { QueryPropertyType } from "./QueryPropertyType";
import { QueryRootPropertyData } from "./QueryRootPropertyData";


export class QueryRootProperty extends QueryBuilderProperty {
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
			.addVariable( this.variable )
			.addPattern( super.__createSelfPattern() );

		if( this.order ) {
			const targetProperty:QueryProperty | undefined = this.getProperty( this.order.path, { create: true } );
			if( ! targetProperty ) throw new IllegalArgumentError( `Property "${ this.order.path }" hasn't been defined.` );

			// Add modifier
			subSelect.addModifier( new OrderToken( targetProperty.variable, this.order.flow ) );

			// Add patterns to the sub-select
			subSelect.addPattern( ...this.__createSubPatternsFrom( targetProperty ) );
		}

		if( this._limit ) {
			subSelect.addModifier( new LimitToken( this._limit ) );
		}

		if( this._offset ) {
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
