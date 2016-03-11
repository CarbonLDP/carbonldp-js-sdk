System.register(["./Errors/IDAlreadyInUseError", "./Errors/IllegalActionError", "./Errors/IllegalArgumentError", "./Errors/IllegalStateError", "./Errors/NotImplementedError"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var IDAlreadyInUseError_1, IllegalActionError_1, IllegalArgumentError_1, IllegalStateError_1, NotImplementedError_1;
    return {
        setters:[
            function (IDAlreadyInUseError_1_1) {
                IDAlreadyInUseError_1 = IDAlreadyInUseError_1_1;
            },
            function (IllegalActionError_1_1) {
                IllegalActionError_1 = IllegalActionError_1_1;
            },
            function (IllegalArgumentError_1_1) {
                IllegalArgumentError_1 = IllegalArgumentError_1_1;
            },
            function (IllegalStateError_1_1) {
                IllegalStateError_1 = IllegalStateError_1_1;
            },
            function (NotImplementedError_1_1) {
                NotImplementedError_1 = NotImplementedError_1_1;
            }],
        execute: function() {
            exports_1("IDAlreadyInUseError", IDAlreadyInUseError_1.default);
            exports_1("IllegalActionError", IllegalActionError_1.default);
            exports_1("IllegalArgumentError", IllegalArgumentError_1.default);
            exports_1("IllegalStateError", IllegalStateError_1.default);
            exports_1("NotImplementedError", NotImplementedError_1.default);
        }
    }
});

//# sourceMappingURL=Errors.js.map
