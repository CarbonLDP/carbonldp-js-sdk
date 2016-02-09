/// <reference path="./../../typings/browser.d.ts" />
System.register(["angular2/core", "angular2/common", "angular2/router", "carbon/Pointer", "carbon/Utils", "carbon/RDF", "vis/dist/vis.css!", "vis/dist/vis", "./template.html!", "./style.css!"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
        switch (arguments.length) {
            case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
            case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
            case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
        }
    };
    var core_1, common_1, router_1, Pointer, Utils, RDF_1, vis_1, template_html_1;
    var DocumentExplorerComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (Pointer_1) {
                Pointer = Pointer_1;
            },
            function (Utils_1) {
                Utils = Utils_1;
            },
            function (RDF_1_1) {
                RDF_1 = RDF_1_1;
            },
            function (_1) {},
            function (vis_1_1) {
                vis_1 = vis_1_1;
            },
            function (template_html_1_1) {
                template_html_1 = template_html_1_1;
            },
            function (_2) {}],
        execute: function() {
            DocumentExplorerComponent = (function () {
                function DocumentExplorerComponent(element) {
                    this.element = element;
                }
                DocumentExplorerComponent.prototype.ngAfterViewInit = function () {
                    this.appContext.extendObjectSchema({
                        "resourceProperty": {
                            "@id": "http://example.org/ns#resourceProperty",
                            "@type": "@id",
                            "@container": "@set",
                        },
                    });
                    this.nodes = new vis_1.default.DataSet();
                    this.edges = new vis_1.default.DataSet();
                    var graphDiv = this.element.nativeElement.querySelector(".graph");
                    this.graph = new vis_1.default.Network(graphDiv, {
                        nodes: this.nodes,
                        edges: this.edges,
                    }, {
                        width: "100%",
                        height: graphDiv.clientHeight + "px",
                    });
                    this.graph.on("doubleClick", this.handleDoubleClick.bind(this));
                };
                DocumentExplorerComponent.prototype.getDocument = function (documentURI) {
                    var _this = this;
                    documentURI = !!documentURI ? documentURI : "";
                    this.appContext.Documents.get(documentURI).then(function (_a) {
                        var document = _a[0], response = _a[1];
                        _this.nodes.clear();
                        _this.edges.clear();
                        _this.renderDocument(document);
                    });
                };
                DocumentExplorerComponent.prototype.renderDocument = function (document) {
                    var nodesMap = new Map();
                    var edges = [];
                    var documentNode = this.createDocumentNode(document);
                    nodesMap.set(documentNode.id, documentNode);
                    this.addPropertyNodesAndEdges(document, nodesMap, edges);
                    for (var _i = 0, _a = document.getFragments(); _i < _a.length; _i++) {
                        var fragment = _a[_i];
                        this.addFragmentNode(fragment, document, nodesMap);
                        this.addPropertyNodesAndEdges(fragment, nodesMap, edges);
                    }
                    var nodes = Utils.A.from(nodesMap.values());
                    this.nodes.update(nodes);
                    this.edges.update(edges);
                };
                DocumentExplorerComponent.prototype.handleDoubleClick = function (event) {
                    if (event.nodes.length === 1)
                        this.handleNodeDoubleClick(event.nodes[0]);
                };
                DocumentExplorerComponent.prototype.handleNodeDoubleClick = function (nodeID) {
                    var _this = this;
                    var node = this.nodes.get(nodeID);
                    if (!Pointer.Factory.is(node.data))
                        return;
                    var pointer = node.data;
                    if (pointer.isResolved())
                        return;
                    pointer.resolve().then(function (_a) {
                        var document = _a[0];
                        _this.renderDocument(document);
                    });
                    // TODO: Handle errors
                };
                DocumentExplorerComponent.prototype.createDocumentNode = function (document) {
                    return {
                        id: document.id,
                        group: document.id,
                        label: this.getRelativeURI(document.id),
                        shape: "dot",
                        data: document,
                    };
                };
                DocumentExplorerComponent.prototype.addFragmentNode = function (fragment, document, nodesMap) {
                    var fragmentNode;
                    if (RDF_1.URI.Util.isBNodeID(fragment.id)) {
                        fragmentNode = {
                            id: fragment.id,
                            group: document.id,
                            label: "_:",
                            shape: "dot",
                            data: fragment,
                        };
                    }
                    else {
                        fragmentNode = {
                            id: fragment.id,
                            group: document.id,
                            label: this.getURILabel(fragment.id),
                            shape: "dot",
                            data: fragment,
                        };
                    }
                    nodesMap.set(fragment.id, fragmentNode);
                };
                DocumentExplorerComponent.prototype.addPropertyNodesAndEdges = function (resource, nodesMap, edges) {
                    for (var propertyName in resource) {
                        if (!resource.hasOwnProperty(propertyName))
                            continue;
                        var propertyValue = resource[propertyName];
                        var propertyNodes = this.getGraphNodes(propertyValue, nodesMap);
                        var propertyEdges = this.connectNodes(resource, propertyNodes, propertyName);
                        propertyEdges.forEach(function (edge) { return edges.push(edge); });
                    }
                };
                DocumentExplorerComponent.prototype.getGraphNodes = function (propertyValue, nodesMap) {
                    var _this = this;
                    if (Utils.isArray(propertyValue)) {
                        return propertyValue.map(function (value) {
                            return _this.getGraphNode(value, nodesMap);
                        });
                    }
                    else
                        return [this.getGraphNode(propertyValue, nodesMap)];
                };
                DocumentExplorerComponent.prototype.getGraphNode = function (propertyValue, nodesMap) {
                    if (Pointer.Factory.is(propertyValue)) {
                        if (!nodesMap.has(propertyValue.id)) {
                            nodesMap.set(propertyValue.id, {
                                id: propertyValue.id,
                                label: this.getURILabel(propertyValue.id),
                                title: propertyValue.id,
                                shape: "dot",
                                data: propertyValue,
                            });
                        }
                        return nodesMap.get(propertyValue.id);
                    }
                    else {
                        var literalID = Utils.UUID.generate();
                        var literalNode = {
                            id: literalID,
                            label: propertyValue,
                            shape: "square",
                            data: propertyValue,
                        };
                        nodesMap.set(literalID, literalNode);
                        return literalNode;
                    }
                };
                DocumentExplorerComponent.prototype.connectNodes = function (from, to, propertyName) {
                    var _this = this;
                    if (propertyName === void 0) { propertyName = null; }
                    var fromNodes = Utils.isArray(from) ? from : [from];
                    var toNodes = Utils.isArray(to) ? to : [to];
                    var connections = [];
                    fromNodes.forEach(function (fromNode) {
                        connections = connections.concat(toNodes.map(function (toNode) {
                            var connection = {
                                id: _this.generateEdgeID(fromNode, toNode),
                                from: fromNode.id,
                                to: toNode.id,
                                arrows: {
                                    to: {
                                        enabled: true
                                    },
                                },
                            };
                            if (propertyName !== null) {
                                connection.label = _this.getURILabel(propertyName);
                                connection.title = propertyName;
                                connection.font = { align: "top" };
                            }
                            return connection;
                        }));
                    });
                    return connections;
                };
                DocumentExplorerComponent.prototype.generateEdgeID = function (from, to) {
                    return from.id + "__to__" + to.id;
                };
                DocumentExplorerComponent.prototype.getURILabel = function (uri) {
                    var label = this.getRelativeURI(uri);
                    label = this.prefixURI(label);
                    return label;
                };
                DocumentExplorerComponent.prototype.getRelativeURI = function (uri) {
                    var uriBase = this.appContext.resolve("");
                    if (!RDF_1.URI.Util.isBaseOf(uriBase, uri))
                        return uri;
                    return RDF_1.URI.Util.getRelativeURI(uri, uriBase);
                };
                DocumentExplorerComponent.prototype.prefixURI = function (uri) {
                    return RDF_1.URI.Util.isAbsolute(uri) ? RDF_1.URI.Util.prefix(uri, this.appContext.getObjectSchema()) : uri;
                };
                DocumentExplorerComponent.parameters = [[core_1.ElementRef]];
                __decorate([
                    core_1.Input()
                ], DocumentExplorerComponent.prototype, "appContext");
                DocumentExplorerComponent = __decorate([
                    core_1.Component({
                        selector: "document-explorer",
                        template: template_html_1.default,
                        directives: [common_1.CORE_DIRECTIVES, router_1.ROUTER_DIRECTIVES],
                    })
                ], DocumentExplorerComponent);
                return DocumentExplorerComponent;
            })();
            exports_1("default", DocumentExplorerComponent);
        }
    }
});
//# sourceMappingURL=DocumentExplorerComponent.js.map