import { ModelDecorator } from "../Model/ModelDecorator";

import { Pointer } from "../Pointer/Pointer";

import { RegisteredPointer } from "./RegisteredPointer";
import { $Registry, Registry } from "./Registry";


export interface BaseRegistry<MODEL extends RegisteredPointer = RegisteredPointer> {
	registry?:Registry | $Registry;

	__modelDecorator:ModelDecorator<MODEL>;
}

export interface $BaseRegistry<MODEL extends RegisteredPointer = RegisteredPointer> extends Pointer {
	$registry?:Registry | $Registry;

	$__modelDecorator:ModelDecorator<MODEL>;
}
