import { HTTPError } from "../HTTPError";
export declare class GatewayTimeoutError extends HTTPError {
    static readonly statusCode: number;
    readonly name: string;
}
export default GatewayTimeoutError;
