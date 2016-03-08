System.register(["./Errors/IllegalStateError", "./Errors/IllegalArgumentError", "./Errors/IDAlreadyInUseError", "./Errors/NotImplementedError"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var IllegalStateError_1, IllegalArgumentError_1, IDAlreadyInUseError_1, NotImplementedError_1;
    return {
        setters:[
            function (IllegalStateError_1_1) {
                IllegalStateError_1 = IllegalStateError_1_1;
            },
            function (IllegalArgumentError_1_1) {
                IllegalArgumentError_1 = IllegalArgumentError_1_1;
            },
            function (IDAlreadyInUseError_1_1) {
                IDAlreadyInUseError_1 = IDAlreadyInUseError_1_1;
            },
            function (NotImplementedError_1_1) {
                NotImplementedError_1 = NotImplementedError_1_1;
            }],
        execute: function() {
            exports_1("IllegalStateError", IllegalStateError_1.default);
            exports_1("IllegalArgumentError", IllegalArgumentError_1.default);
            exports_1("IDAlreadyInUseError", IDAlreadyInUseError_1.default);
            exports_1("NotImplementedError", NotImplementedError_1.default);
        }
    }
});

//# sourceMappingURL=Errors.js.map
