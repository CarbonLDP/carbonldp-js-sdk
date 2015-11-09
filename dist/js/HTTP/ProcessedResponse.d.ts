import Response from "./Response";
interface ProcessedResponse<T> {
    result: T;
    response: Response;
}
export default ProcessedResponse;
