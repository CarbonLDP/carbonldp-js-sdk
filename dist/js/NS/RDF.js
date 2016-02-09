System.register([], function(exports_1) {
    var namespace, Predicate;
    return {
        setters:[],
        execute: function() {
            namespace = "http://www.w3.org/1999/02/22-rdf-syntax-ns#";
            Predicate = (function () {
                function Predicate() {
                }
                Predicate.type = namespace + "type";
                return Predicate;
            })();
            exports_1("namespace", namespace);
            exports_1("Predicate", Predicate);
        }
    }
});

//# sourceMappingURL=RDF.js.map
