/// <reference path="../typings/tsd.d.ts" />
import Committer from "./Committer";
import * as HTTP from "./HTTP";
import Context from "./Context";
import * as Document from "./Document";
declare class Documents implements Committer<Document.Class> {
    private context;
    constructor(context?: Context);
    get(uri: string, requestOptions?: HTTP.Request.Options): Promise<HTTP.ProcessedResponse<Document.Class>>;
    commit(document: Document.Class, requestOptions?: HTTP.Request.Options): Promise<HTTP.Response>;
    private getRDFDocument(rdfDocuments);
    private injectDefinitions(resources);
}
export default Documents;
