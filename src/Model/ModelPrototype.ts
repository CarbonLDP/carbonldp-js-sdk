export interface ModelPrototype<M extends object, B extends object = {}, K extends keyof M = never> {
	PROTOTYPE:Pick<M, Exclude<keyof M, keyof B> | K>;
}
