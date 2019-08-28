import { InlineTagDef } from "./InlineTagDef";

export function paramInLineTag(log):InlineTagDef {
    return {
        name: "param",
        description: "Process inline param tags (of the form {@param parameter}), replacing them with the parameter description",
        handler: function (doc, tagName, tagDescription){
                return `${tagDescription}`
        }
    }
}
