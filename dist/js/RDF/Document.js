System.register(["./../HTTP", "./RDFNode", "../Utils", "./URI"], function(exports_1) {
    var HTTP, RDFNode, Utils, URI;
    var Factory, Util, Parser;
    return {
        setters:[
            function (HTTP_1) {
                HTTP = HTTP_1;
            },
            function (RDFNode_1) {
                RDFNode = RDFNode_1;
            },
            function (Utils_1) {
                Utils = Utils_1;
            },
            function (URI_1) {
                URI = URI_1;
            }],
        execute: function() {
            Factory = (function () {
                function Factory() {
                }
                Factory.is = function (object) {
                    return (Utils.hasProperty(object, "@graph"));
                };
                Factory.create = function (resources, uri) {
                    var document = uri ? RDFNode.Factory.create(uri) : {};
                    document["@graph"] = resources;
                    return document;
                };
                return Factory;
            })();
            exports_1("Factory", Factory);
            Util = (function () {
                function Util() {
                }
                Util.getDocuments = function (value) {
                    if (Utils.isArray(value)) {
                        if (value.length === 0)
                            return value;
                        if (Factory.is(value[0]))
                            return value;
                        if (RDFNode.Factory.is(value[0]))
                            return [Factory.create(value)];
                    }
                    else if (Utils.isObject(value)) {
                        if (Factory.is(value))
                            return [value];
                        if (RDFNode.Factory.is(value))
                            return [Factory.create([value])];
                    }
                    else
                        throw new Error("IllegalArgument: The value structure isn't valid.");
                };
                Util.getResources = function (value) {
                    var documents = Util.getDocuments(value);
                    var resources = [];
                    for (var _i = 0; _i < documents.length; _i++) {
                        var document_1 = documents[_i];
                        resources = resources.concat(document_1["@graph"]);
                    }
                    return resources;
                };
                Util.getDocumentResources = function (document) {
                    var resources = Util.getResources(document);
                    var documentResources = [];
                    for (var i = 0, length_1 = resources.length; i < length_1; i++) {
                        var resource = resources[i];
                        var uri = resource["@id"];
                        if (!uri)
                            continue;
                        if (!URI.Util.hasFragment(uri) && !URI.Util.isBNodeID(uri))
                            documentResources.push(resource);
                    }
                    return documentResources;
                };
                Util.getFragmentResources = function (document, documentResource) {
                    var resources = Util.getResources(document);
                    var documentURIToMatch = null;
                    if (documentResource) {
                        if (Utils.isString(documentResource)) {
                            documentURIToMatch = documentResource;
                        }
                        else
                            documentURIToMatch = documentResource["@id"];
                    }
                    var fragmentResources = [];
                    for (var i = 0, length_2 = resources.length; i < length_2; i++) {
                        var resource = resources[i];
                        var uri = resource["@id"];
                        if (!uri)
                            continue;
                        if (!URI.Util.hasFragment(uri))
                            continue;
                        if (!documentURIToMatch) {
                            fragmentResources.push(resource);
                        }
                        else {
                            var documentURI = URI.Util.getDocumentURI(uri);
                            if (documentURI === documentURIToMatch)
                                fragmentResources.push(resource);
                        }
                    }
                    return fragmentResources;
                };
                Util.getBNodeResources = function (document) {
                    var resources = Util.getResources(document);
                    var bnodes = [];
                    for (var i = 0, length_3 = resources.length; i < length_3; i++) {
                        var resource = resources[i];
                        if (!("@id" in resource) || URI.Util.isBNodeID(resource["@id"]))
                            bnodes.push(resource);
                    }
                    return bnodes;
                };
                return Util;
            })();
            exports_1("Util", Util);
            Parser = (function () {
                function Parser() {
                }
                Parser.prototype.parse = function (input) {
                    var jsonLDParser = new HTTP.JSONLDParser.Class();
                    return jsonLDParser.parse(input).then(function (expandedResult) {
                        return Util.getDocuments(expandedResult);
                    });
                };
                return Parser;
            })();
            exports_1("Parser", Parser);
        }
    }
});

//# sourceMappingURL=Document.js.map
