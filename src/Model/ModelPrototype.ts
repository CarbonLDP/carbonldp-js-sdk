export interface ModelPrototype<MODEL extends object, EXTENDED extends object = {}, OVERRIDDEN extends keyof MODEL = never> {
	PROTOTYPE:Pick<MODEL, Exclude<keyof MODEL, keyof EXTENDED> | OVERRIDDEN>;
}
