"use strict";

System.register([], function (_export, _context) {
  var namespace, Predicate;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _export("namespace", namespace = "http://www.w3.org/1999/02/22-rdf-syntax-ns#");

      _export("Predicate", Predicate = function Predicate() {
        _classCallCheck(this, Predicate);
      });

      Predicate.type = namespace + "type";

      _export("namespace", namespace);

      _export("Predicate", Predicate);
    }
  };
});
//# sourceMappingURL=RDF.js.map
