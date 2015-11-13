export interface Class<T> {
	parse( body:string ):Promise<T>;
}

export default Class;