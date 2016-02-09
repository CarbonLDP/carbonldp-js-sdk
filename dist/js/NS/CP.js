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
      _export("namespace", namespace = "https://carbonldp.com/ns/v1/patch#");

      _export("Predicate", Predicate = function Predicate() {
        _classCallCheck(this, Predicate);
      });

      Predicate.ADD_ACTION = namespace + "addAction";
      Predicate.SET_ACTION = namespace + "setAction";
      Predicate.DELETE_ACTION = namespace + "deleteAction";

      _export("namespace", namespace);

      _export("Predicate", Predicate);
    }
  };
});
//# sourceMappingURL=CP.js.map
