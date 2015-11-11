/// <reference path="../typings/es6-promise/es6-promise.d.ts" />

interface Committer<E> {
	commit( object:E ):Promise<any>;
}

export default Committer;
