"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function oldDocsTree() {
    return {
        $runAfter: ["processing-docs"],
        $runBefore: ["docs-processed"],
        $process: function (docs) {
            return [
                {
                    docType: "index",
                    modules: docs,
                }
            ].concat(docs);
        },
    };
}
exports.default = oldDocsTree;
//# sourceMappingURL=old-docs-tree.js.map