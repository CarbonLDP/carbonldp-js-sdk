import AbstractError from './AbstractError';

class IllegalActionError extends AbstractError {
	get name():string { return 'IllegalActionError' }
}

export default IllegalActionError;