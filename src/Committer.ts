/// <reference path="../typings/es6-promise/es6-promise.d.ts" />

interface Committer {
	commit( object:any ):Promise<any>;
}

export default Committer;