"use strict";

System.register(["./Errors/IllegalStateError", "./Errors/IllegalArgumentError", "./Errors/IDAlreadyInUseError", "./Errors/NotImplementedError"], function (_export, _context) {
  var IllegalStateError, IllegalArgumentError, IDAlreadyInUseError, NotImplementedError;
  return {
    setters: [function (_ErrorsIllegalStateError) {
      IllegalStateError = _ErrorsIllegalStateError.default;
    }, function (_ErrorsIllegalArgumentError) {
      IllegalArgumentError = _ErrorsIllegalArgumentError.default;
    }, function (_ErrorsIDAlreadyInUseError) {
      IDAlreadyInUseError = _ErrorsIDAlreadyInUseError.default;
    }, function (_ErrorsNotImplementedError) {
      NotImplementedError = _ErrorsNotImplementedError.default;
    }],
    execute: function () {
      _export("IllegalStateError", IllegalStateError);

      _export("IllegalArgumentError", IllegalArgumentError);

      _export("IDAlreadyInUseError", IDAlreadyInUseError);

      _export("NotImplementedError", NotImplementedError);
    }
  };
});
//# sourceMappingURL=Errors.js.map
