"use strict";
var Carbon_1 = require("./Carbon");
var carbon = new Carbon_1.default();
carbon.documents.get("/").then(function (_a) {
    var document = _a[0], resource = _a[1];
    console.log(document);
});

//# sourceMappingURL=Committer.js.map
