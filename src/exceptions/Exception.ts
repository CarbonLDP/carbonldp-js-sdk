module DummyModule {
	export declare class Error {
		public name:string;
		public message:string;
		public stack:string;

		constructor( message?:string );
	}

	const name:string = 'Exception';

	export class Class extends Error {
		get name():string { return name; }

		constructor( message:string ) {
			super( message );
			this.message = message;
			this.stack = (<any>new Error()).stack;
		}

		toString() {
			return this.name + ':' + this.message;
		}
	}
}

export default DummyModule;