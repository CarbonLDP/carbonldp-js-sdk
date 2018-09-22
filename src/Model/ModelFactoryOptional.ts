import { ModelFactory } from "./ModelFactory";

export interface ModelFactoryOptional<MODEL extends object, BASE extends object = object> extends ModelFactory<MODEL, BASE> {
	create<T extends object>( data?:T & BASE ):T & MODEL;
}
