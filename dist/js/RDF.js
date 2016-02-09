"use strict";

System.register(["./RDF/Literal", "./RDF/PropertyDescription", "./RDF/Document", "./RDF/List", "./RDF/RDFNode", "./RDF/URI", "./RDF/Value"], function (_export, _context) {
  var Literal, PropertyDescription, Document, List, Node, URI, Value;
  return {
    setters: [function (_RDFLiteral) {
      Literal = _RDFLiteral;
    }, function (_RDFPropertyDescription) {
      PropertyDescription = _RDFPropertyDescription.default;
    }, function (_RDFDocument) {
      Document = _RDFDocument;
    }, function (_RDFList) {
      List = _RDFList;
    }, function (_RDFRDFNode) {
      Node = _RDFRDFNode;
    }, function (_RDFURI) {
      URI = _RDFURI;
    }, function (_RDFValue) {
      Value = _RDFValue;
    }],
    execute: function () {
      _export("Literal", Literal);

      _export("PropertyDescription", PropertyDescription);

      _export("Document", Document);

      _export("List", List);

      _export("Node", Node);

      _export("URI", URI);

      _export("Value", Value);
    }
  };
});
//# sourceMappingURL=RDF.js.map
