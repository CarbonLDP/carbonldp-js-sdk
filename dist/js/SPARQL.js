"use strict";

System.register(["./SPARQL/Results", "./SPARQL/ResultsParser", "./SPARQL/Service"], function (_export, _context) {
  var Results, ResultsParser, Service;
  return {
    setters: [function (_SPARQLResults) {
      Results = _SPARQLResults;
    }, function (_SPARQLResultsParser) {
      ResultsParser = _SPARQLResultsParser;
    }, function (_SPARQLService) {
      Service = _SPARQLService.default;
    }],
    execute: function () {
      _export("Results", Results);

      _export("ResultsParser", ResultsParser);

      _export("Service", Service);
    }
  };
});
//# sourceMappingURL=SPARQL.js.map
