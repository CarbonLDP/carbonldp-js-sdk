export interface Parser<T> {
	parse( body:string ):Promise<T>;
}
