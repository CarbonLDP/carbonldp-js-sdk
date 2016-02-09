/// <reference path="../../typings/typings.d.ts" />
import * as HTTP from "./../HTTP";
import Results from "./Results";
export default class Class {
    private static defaultOptions;
    private static parser;
    static executeSELECTQuery(url: string, selectQuery: string, options?: HTTP.Request.Options): Promise<[Results, HTTP.Response.Class]>;
}
