import * as Documents from "./Documents";

export interface ModelDecorator<T extends object> {
	TYPE?:string;

	isDecorated( object:object ):object is T;

	decorate<W extends object>( object:W, documents?:Documents.Class ):W & T;
}
