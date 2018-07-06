import {
	ModelDecorator,
	ModelPrototype
} from "../Model";
import { PartialMetadata } from "./PartialMetadata";


export interface QueryableDocumentTrait {
	__partialMetadata:PartialMetadata | undefined;

	isQueried():boolean;
}


export type QueryableDocumentTraitFactory =
	& ModelPrototype<QueryableDocumentTrait>
	& ModelDecorator<QueryableDocumentTrait>
	;

export const QueryableDocumentTrait:QueryableDocumentTraitFactory = {
	PROTOTYPE: {
		__partialMetadata: void 0,

		isQueried( this:QueryableDocumentTrait ):boolean {
			return ! ! this.__partialMetadata;
		},
	},


	isDecorated( object:object ):object is QueryableDocumentTrait {
		return ModelDecorator
			.hasPropertiesFrom( QueryableDocumentTrait.PROTOTYPE, object );
	},

	decorate<T extends object>( object:T ):T & QueryableDocumentTrait {
		return ModelDecorator
			.definePropertiesFrom( QueryableDocumentTrait.PROTOTYPE, object );
	},
};
