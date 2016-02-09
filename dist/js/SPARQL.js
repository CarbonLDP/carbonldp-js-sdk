System.register(["./SPARQL/Results", "./SPARQL/ResultsParser", "./SPARQL/Service"], function(exports_1) {
    var Results, ResultsParser, Service_1;
    return {
        setters:[
            function (Results_1) {
                Results = Results_1;
            },
            function (ResultsParser_1) {
                ResultsParser = ResultsParser_1;
            },
            function (Service_1_1) {
                Service_1 = Service_1_1;
            }],
        execute: function() {
            exports_1("Results", Results);
            exports_1("ResultsParser", ResultsParser);
            exports_1("Service", Service_1.default);
        }
    }
});

//# sourceMappingURL=SPARQL.js.map
