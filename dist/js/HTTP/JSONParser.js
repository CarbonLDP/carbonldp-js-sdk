var Class = (function () {
    function Class() {
    }
    Class.prototype.parse = function (body) {
        return new Promise(function (resolve, reject) {
            try {
                resolve(JSON.parse(body));
            }
            catch (error) {
                // TODO: Handle SyntaxError
                reject(error);
            }
        });
    };
    return Class;
})();
exports.Class = Class;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Class;

//# sourceMappingURL=JSONParser.js.map
