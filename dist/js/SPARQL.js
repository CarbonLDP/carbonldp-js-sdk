System.register(["./SPARQL/RawResults", "./SPARQL/RawResultsParser", "./SPARQL/Service"], function(exports_1) {
    var RawResults, RawResultsParser, Service_1;
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
            }],
        execute: function() {
            exports_1("RawResults", RawResults);
            exports_1("RawResultsParser", RawResultsParser);
            exports_1("Service", Service_1.default);
        }
    }
});

//# sourceMappingURL=SPARQL.js.map
