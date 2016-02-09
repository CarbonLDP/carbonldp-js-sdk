"use strict";

System.register(["./LDP/AccessPoint", "./LDP/BasicContainer", "./LDP/Container", "./LDP/PersistedContainer", "./LDP/RDFSource"], function (_export, _context) {
  var AccessPoint, BasicContainer, Container, PersistedContainer, RDFSource;
  return {
    setters: [function (_LDPAccessPoint) {
      AccessPoint = _LDPAccessPoint;
    }, function (_LDPBasicContainer) {
      BasicContainer = _LDPBasicContainer;
    }, function (_LDPContainer) {
      Container = _LDPContainer;
    }, function (_LDPPersistedContainer) {
      PersistedContainer = _LDPPersistedContainer;
    }, function (_LDPRDFSource) {
      RDFSource = _LDPRDFSource;
    }],
    execute: function () {
      _export("AccessPoint", AccessPoint);

      _export("BasicContainer", BasicContainer);

      _export("Container", Container);

      _export("PersistedContainer", PersistedContainer);

      _export("RDFSource", RDFSource);
    }
  };
});
//# sourceMappingURL=LDP.js.map
