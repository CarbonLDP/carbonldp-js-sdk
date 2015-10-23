import AbstractError from './AbstractError';

class IllegalArgumentError extends AbstractError {
	get name():string { return 'IllegalArgumentError' }
}

export default IllegalArgumentError;