import { Context } from "../Context";
import { ModelFactory } from "../core";
import { RegisteredPointer } from "./RegisteredPointer";
import { Registry } from "./Registry";

export interface BaseRegistry<M extends RegisteredPointer = RegisteredPointer> {
	$context:Context<M>;
	$registry?:Registry;

	__modelFactory:ModelFactory<M>;
}
