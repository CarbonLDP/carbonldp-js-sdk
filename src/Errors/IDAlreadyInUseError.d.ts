import IllegalArgumentError from './AbstractError';
declare class IDAlreadyInUseError extends IllegalArgumentError {
    name: string;
}
export default IDAlreadyInUseError;
