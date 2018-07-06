import { PickSelfProps } from "../Utils";

export interface ModelPrototype<M extends object, B extends object = {}, K extends keyof M = never> {
	PROTOTYPE:PickSelfProps<M, B, K>;
}
