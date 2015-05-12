define(["require", "exports"], function (require, exports) {
    /// <reference path="../typings/es6-promise/es6-promise.d.ts" />
    var Agent = (function () {
        function Agent() {
        }
        return Agent;
    })();
    var Auth = (function () {
        function Auth() {
        }
        Auth.prototype.login = function (username, password) {
            return new Promise(function (resolve, reject) {
                // TODO: Implement
                reject("Not implemented");
            });
        };
        return Auth;
    })();
    exports.default = Auth;
});
//# sourceMappingURL=Auth.js.map