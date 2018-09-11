import {
	LimitToken,
	OffsetToken,
	OrderToken,
	PatternToken,
	PropertyToken,
	SubjectToken,
	SubSelectToken,
	ValuesToken,
	VariableToken
} from "sparqler/tokens";
import { IllegalArgumentError } from "../Errors/IllegalArgumentError";
import { IllegalStateError } from "../Errors/IllegalStateError";

import { DigestedObjectSchemaProperty } from "../ObjectSchema/DigestedObjectSchemaProperty";
import { LDP } from "../Vocabularies/LDP";
import { QueryDocumentsOrder } from "./QueryDocumentsOrder";

import { QueryProperty2 } from "./QueryProperty2";
import { QueryPropertyData } from "./QueryPropertyData";
import { QueryPropertyType } from "./QueryPropertyType";
import { QueryRootContainerType } from "./QueryRootContainerType";
import { QueryRootPropertyData } from "./QueryRootPropertyData";


export class QueryRootProperty extends QueryProperty2 {
	readonly parent:undefined;

	protected _optional:false;

	protected _containerType?:QueryRootContainerType;

	_order?:QueryDocumentsOrder;
	protected _limit?:number;
	protected _offset?:number;


	constructor( data:QueryRootPropertyData ) {
		const definition:DigestedObjectSchemaProperty = new DigestedObjectSchemaProperty();
		definition.uri = data.uri;

		super( <QueryPropertyData> {
			...data,
			definition,
		} );

		this._type = QueryPropertyType.PARTIAL;

		this._containerType = data.containerType;

		this._optional = false;
	}


	isContainer():boolean {
		return this._containerType !== void 0;
	}


	__getSimpleSelfPattern():PatternToken {
		if( this._containerType === void 0 ) {
			return new ValuesToken()
				.addVariables( this.variable )
				.addValues( this.__createIRIToken() )
				;
		}

		return this.__createSubSelectPattern();
	}

	protected __createSubSelectPattern():SubSelectToken {
		const subSelect:SubSelectToken = new SubSelectToken( "DISTINCT" )
			.addVariable( this.variable )
			.addPattern( ...this.__createContainmentPatterns() );

		if( this._order ) {
			const targetProperty:QueryProperty2 | undefined = this.getProperty( this._order.path, { create: true } );
			if( ! targetProperty ) throw new IllegalArgumentError( `Property "${ this._order.path }" hasn't been defined.` );

			// Add modifier
			subSelect.addModifier( new OrderToken( targetProperty.variable, this._order.flow ) );

			// Add patterns to the sub-select
			subSelect.addPattern( ...this.__createPatternsFrom( targetProperty ) );
		}

		if( this._limit ) {
			subSelect.addModifier( new LimitToken( this._limit ) );
		}

		if( this._offset ) {
			subSelect.addModifier( new OffsetToken( this._offset ) );
		}

		return subSelect;
	}

	protected __createPatternsFrom( targetProperty:QueryProperty2 ):PatternToken[] {
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

	protected __createContainmentPatterns():PatternToken[] {
		switch( this._containerType ) {
			case QueryRootContainerType.CHILDREN:
				return this.__createChildPatterns();

			case QueryRootContainerType.MEMBERS:
				return this.__createMemberPatterns();

			default:
				throw new IllegalStateError( `Invalid container type "${ QueryRootContainerType[ this._containerType ] }".` );
		}
	}

	protected __createChildPatterns():PatternToken[] {
		const childSelection:PatternToken = new SubjectToken( this.__createIRIToken() )
			.addProperty( new PropertyToken( this.queryContainer.compactIRI( LDP.contains ) )
				.addObject( this.variable )
			);

		return [ childSelection ];
	}

	protected __createMemberPatterns():PatternToken [] {
		const membershipResource:VariableToken = this.queryContainer.getVariable( "membershipResource" );
		const hasMemberRelation:VariableToken = this.queryContainer.getVariable( "hasMemberRelation" );

		const memberRelations:PatternToken = new SubjectToken( this.__createIRIToken() )
			.addProperty( new PropertyToken( this.queryContainer.compactIRI( LDP.membershipResource ) )
				.addObject( membershipResource )
			)
			.addProperty( new PropertyToken( this.queryContainer.compactIRI( LDP.hasMemberRelation ) )
				.addObject( hasMemberRelation )
			);

		const memberSelection:PatternToken = new SubjectToken( membershipResource )
			.addProperty( new PropertyToken( hasMemberRelation )
				.addObject( this.variable )
			);

		return [
			memberRelations,
			memberSelection,
		];
	}


	setOrder( order:QueryDocumentsOrder ):void {
		this._order = order;
	}

	setLimit( limit:number ):void {
		this._limit = limit;
	}

	setOffset( offset:number ):void {
		this._offset = offset;
	}

}
