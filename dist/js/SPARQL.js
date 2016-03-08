System.register(["./SPARQL/RawResults", "./SPARQL/RawResultsParser", "./SPARQL/Service", "./SPARQL/SELECTResults"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var RawResults, RawResultsParser, Service_1, SELECTResults;
    return {
        setters:[
            function (RawResults_1) {
                RawResults = RawResults_1;
            },
            function (RawResultsParser_1) {
                RawResultsParser = RawResultsParser_1;
            },
            function (Service_1_1) {
                Service_1 = Service_1_1;
            },
            function (SELECTResults_1) {
                SELECTResults = SELECTResults_1;
            }],
        execute: function() {
            exports_1("RawResults", RawResults);
            exports_1("RawResultsParser", RawResultsParser);
            exports_1("Service", Service_1.default);
            exports_1("SELECTResults", SELECTResults);
        }
    }
});

//# sourceMappingURL=SPARQL.js.map
