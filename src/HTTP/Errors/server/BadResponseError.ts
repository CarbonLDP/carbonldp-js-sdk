import HTTPError from "./../HTTPError";

const name:string = "BadResponseError";
const statusCode:number = 0;

class Class extends HTTPError {
	static get statusCode():number { return statusCode; }

	get name():string { return name; }
}

export default Class;
