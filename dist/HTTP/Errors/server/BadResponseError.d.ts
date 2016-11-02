import HTTPError from "./../HTTPError";
declare class Class extends HTTPError {
    static readonly statusCode: number;
    readonly name: string;
}
export default Class;
