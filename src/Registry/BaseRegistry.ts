import { Context } from "../Context";
import { ModelDecorator } from "../core";
import { RegisteredPointer } from "./RegisteredPointer";
import { Registry } from "./Registry";


export interface BaseRegistry<M extends RegisteredPointer = RegisteredPointer> {
	$context:Context;
	$registry?:Registry;

	__modelDecorator:ModelDecorator<M>;
}