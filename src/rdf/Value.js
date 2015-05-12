define(["require", "exports", './Literal', './RDFNode'], function (require, exports, Literal, RDFNode) {
    var Util = (function () {
        function Util() {
        }
        Util.areEqual = function (value1, value2) {
            if (Literal.Factory.is(value1) && Literal.Factory.is(value2)) {
                return Literal.Util.areEqual(value1, value2);
            }
            else if (RDFNode.Factory.is(value1) && RDFNode.Factory.is(value2)) {
                return RDFNode.Util.areEqual(value1, value2);
            }
            else
                return false;
        };
        return Util;
    })();
    exports.Util = Util;
});
//# sourceMappingURL=Value.js.map