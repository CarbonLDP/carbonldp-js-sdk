import { ModelDecorator } from "../Model";
import { ResolvablePointer } from "../Repository";
import { HTTPRepositoryTrait } from "./HTTPRepositoryTrait";
import { RequestOptions } from "./Request";


export interface BaseHTTPResolvableTrait {
	$repository:HTTPRepositoryTrait;
}

export interface HTTPResolvableTrait<M extends ResolvablePointer = ResolvablePointer> extends ResolvablePointer {
	$repository:HTTPRepositoryTrait;

	get<T extends object>( requestOptions?:RequestOptions ):Promise<T & M>;
	get<T extends object>( uri:string, requestOptions?:RequestOptions ):Promise<T & M>;

	resolve<T extends object>( requestOptions?:RequestOptions ):Promise<T & this & M>;
	resolve<T extends object>( resource:M, requestOptions?:RequestOptions ):Promise<T & M>;

	exists( requestOptions?:RequestOptions ):Promise<boolean>;
	exists( uri:string, requestOptions?:RequestOptions ):Promise<boolean>;


	refresh<T extends object>( requestOptions?:RequestOptions ):Promise<T & this & M>;
	refresh<T extends object>( resource:M, requestOptions?:RequestOptions ):Promise<T & M>;

	save<T extends object>( requestOptions?:RequestOptions ):Promise<T & this & M>;
	save<T extends object>( resource:M, requestOptions?:RequestOptions ):Promise<T & M>;

	saveAndRefresh<T extends object>( requestOptions?:RequestOptions ):Promise<T & this & M>;
	saveAndRefresh<T extends object>( resource:M, requestOptions?:RequestOptions ):Promise<T & M>;


	delete( requestOptions?:RequestOptions ):Promise<void>;
	delete( uri:string, requestOptions?:RequestOptions ):Promise<void>;
}


export type HTTPResolvableTraitFactory =
	| ModelDecorator<HTTPResolvableTrait<any>, BaseHTTPResolvableTrait>
	;

export const HTTPResolvableTrait:HTTPResolvableTraitFactory = {
	isDecorated( object:object ):object is HTTPResolvableTrait {
		return ResolvablePointer.isDecorated( object );
	},

	decorate<T extends BaseHTTPResolvableTrait>( object:T ):T & HTTPResolvableTrait {
		return ResolvablePointer.decorate( object );
	},
};
