declare module jasmine {
	interface Header {
		name:string;
		value:string;
	}

	interface ReturnOptions {
		status?:number;
		contentType?:string;
		response?:any;
		responseText?:string;
		responseHeaders?:Header[];
	}

	interface AjaxRequestStub {
		url:string;
		query:string;
		data:any;
		method:string;
		andReturn( options:ReturnOptions ): void;
		matches( fullUrl:string, data:any, method:string ): boolean;
	}

	interface Ajax {
		install(): void;
		uninstall(): void;
		stubRequest( url:string, data?:any, method?:string ): AjaxRequestStub;
	}
	export var Ajax:Ajax;
}