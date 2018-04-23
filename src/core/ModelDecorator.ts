import { Documents } from "../Documents";

export interface ModelDecorator<T extends object, U extends object = object> {
	isDecorated( object:object ):object is T;

	decorate<W extends U>( object:W, documents?:Documents ):W & T;
}
