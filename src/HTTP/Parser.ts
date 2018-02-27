export interface Parser<T> {
	parse( body:string ):Promise<T>;
}

export default Parser;
