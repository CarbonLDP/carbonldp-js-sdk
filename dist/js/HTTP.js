/// <reference path="./../typings/typings.d.ts" />
System.register(["./HTTP/Errors", "./HTTP/Header", "./HTTP/JSONParser", "./HTTP/JSONLDParser", "./HTTP/Method", "./HTTP/Request", "./HTTP/Response", "./HTTP/StatusCode", "./HTTP/StringParser"], function(exports_1) {
    var Errors, Header, JSONParser, JSONLDParser, Method_1, Request, Response, StatusCode_1, StringParser;
    return {
        setters:[
            function (Errors_1) {
                Errors = Errors_1;
            },
            function (Header_1) {
                Header = Header_1;
            },
            function (JSONParser_1) {
                JSONParser = JSONParser_1;
            },
            function (JSONLDParser_1) {
                JSONLDParser = JSONLDParser_1;
            },
            function (Method_1_1) {
                Method_1 = Method_1_1;
            },
            function (Request_1) {
                Request = Request_1;
            },
            function (Response_1) {
                Response = Response_1;
            },
            function (StatusCode_1_1) {
                StatusCode_1 = StatusCode_1_1;
            },
            function (StringParser_1) {
                StringParser = StringParser_1;
            }],
        execute: function() {
            exports_1("Errors", Errors);
            exports_1("Header", Header);
            exports_1("JSONParser", JSONParser);
            exports_1("JSONLDParser", JSONLDParser);
            exports_1("Method", Method_1.default);
            exports_1("Request", Request);
            exports_1("Response", Response);
            exports_1("StatusCode", StatusCode_1.default);
            exports_1("StringParser", StringParser);
        }
    }
});

//# sourceMappingURL=HTTP.js.map
