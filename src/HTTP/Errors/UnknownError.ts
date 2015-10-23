import RESTError from './HTTPError';

const name:string = 'UnknownError';

class UnknownError extends RESTError {
	get name():string { return name; }
}

export default UnknownError;