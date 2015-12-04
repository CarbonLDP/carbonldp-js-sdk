/// <reference path="../typings/tsd.d.ts" />
import * as HTTP from "./HTTP";
import Context from "./Context";
import * as PersistedDocument from "./PersistedDocument";
declare class Documents {
    private context;
    constructor(context: Context);
    get(uri: string, requestOptions?: HTTP.Request.Options): Promise<HTTP.ProcessedResponse<PersistedDocument.Class>>;
    save(persistedDocument: PersistedDocument.Class, requestOptions?: HTTP.Request.Options): Promise<HTTP.Response.Class>;
    delete(persistedDocument: PersistedDocument.Class, requestOptions?: HTTP.Request.Options): Promise<HTTP.Response.Class>;
    private getRDFDocument(rdfDocuments, response);
    private injectDefinitions(resources);
}
export default Documents;
