System.register(["./RDF/Literal", "./RDF/Document", "./RDF/List", "./RDF/RDFNode", "./RDF/URI", "./RDF/Value"], function(exports_1) {
    var Literal, Document, List, Node, URI, Value;
    return {
        setters:[
            function (Literal_1) {
                Literal = Literal_1;
            },
            function (Document_1) {
                Document = Document_1;
            },
            function (List_1) {
                List = List_1;
            },
            function (Node_1) {
                Node = Node_1;
            },
            function (URI_1) {
                URI = URI_1;
            },
            function (Value_1) {
                Value = Value_1;
            }],
        execute: function() {
            exports_1("Literal", Literal);
            exports_1("Document", Document);
            exports_1("List", List);
            exports_1("Node", Node);
            exports_1("URI", URI);
            exports_1("Value", Value);
        }
    }
});

//# sourceMappingURL=RDF.js.map
