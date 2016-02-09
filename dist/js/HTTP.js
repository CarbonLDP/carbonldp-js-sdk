"use strict";

System.register(["./HTTP/Errors", "./HTTP/Header", "./HTTP/JSONParser", "./HTTP/JSONLDParser", "./HTTP/Method", "./HTTP/Request", "./HTTP/Response", "./HTTP/StatusCode"], function (_export, _context) {
  var Errors, Header, JSONParser, JSONLDParser, Method, Request, Response, StatusCode;
  return {
    setters: [function (_HTTPErrors) {
      Errors = _HTTPErrors;
    }, function (_HTTPHeader) {
      Header = _HTTPHeader;
    }, function (_HTTPJSONParser) {
      JSONParser = _HTTPJSONParser;
    }, function (_HTTPJSONLDParser) {
      JSONLDParser = _HTTPJSONLDParser;
    }, function (_HTTPMethod) {
      Method = _HTTPMethod.default;
    }, function (_HTTPRequest) {
      Request = _HTTPRequest;
    }, function (_HTTPResponse) {
      Response = _HTTPResponse;
    }, function (_HTTPStatusCode) {
      StatusCode = _HTTPStatusCode.default;
    }],
    execute: function () {
      _export("Errors", Errors);

      _export("Header", Header);

      _export("JSONParser", JSONParser);

      _export("JSONLDParser", JSONLDParser);

      _export("Method", Method);

      _export("Request", Request);

      _export("Response", Response);

      _export("StatusCode", StatusCode);
    }
  };
});
//# sourceMappingURL=HTTP.js.map
