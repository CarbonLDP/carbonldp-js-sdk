System.register([], function(exports_1) {
    var namespace, Predicate;
    return {
        setters:[],
        execute: function() {
            namespace = "https://carbonldp.com/ns/v1/patch#";
            Predicate = (function () {
                function Predicate() {
                }
                Predicate.ADD_ACTION = namespace + "addAction";
                Predicate.SET_ACTION = namespace + "setAction";
                Predicate.DELETE_ACTION = namespace + "deleteAction";
                return Predicate;
            })();
            exports_1("namespace", namespace);
            exports_1("Predicate", Predicate);
        }
    }
});

//# sourceMappingURL=CP.js.map
