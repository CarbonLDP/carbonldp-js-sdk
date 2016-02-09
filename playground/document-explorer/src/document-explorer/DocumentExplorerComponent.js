/// <reference path="./../../typings/browser.d.ts" />
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
import { Component, ElementRef, Input } from "angular2/core";
import { CORE_DIRECTIVES } from "angular2/common";
import { ROUTER_DIRECTIVES } from "angular2/router";
import * as Pointer from "carbon/Pointer";
import * as Utils from "carbon/Utils";
import { URI } from "carbon/RDF";
import "vis/dist/vis.css!";
import vis from "vis/dist/vis";
import template from "./template.html!";
import "./style.css!";
let DocumentExplorerComponent = class {
    constructor(element) {
        this.element = element;
    }
    ngAfterViewInit() {
        this.appContext.extendObjectSchema({
            "resourceProperty": {
                "@id": "http://example.org/ns#resourceProperty",
                "@type": "@id",
                "@container": "@set",
            },
        });
        this.nodes = new vis.DataSet();
        this.edges = new vis.DataSet();
        let graphDiv = this.element.nativeElement.querySelector(".graph");
        this.graph = new vis.Network(graphDiv, {
            nodes: this.nodes,
            edges: this.edges,
        }, {
            width: "100%",
            height: `${graphDiv.clientHeight}px`,
        });
        this.graph.on("doubleClick", this.handleDoubleClick.bind(this));
    }
    getDocument(documentURI) {
        documentURI = !!documentURI ? documentURI : "";
        this.appContext.Documents.get(documentURI).then(([document, response]) => {
            this.nodes.clear();
            this.edges.clear();
            this.renderDocument(document);
        });
    }
    renderDocument(document) {
        let nodesMap = new Map();
        let edges = [];
        let documentNode = this.createDocumentNode(document);
        nodesMap.set(documentNode.id, documentNode);
        this.addPropertyNodesAndEdges(document, nodesMap, edges);
        for (let fragment of document.getFragments()) {
            this.addFragmentNode(fragment, document, nodesMap);
            this.addPropertyNodesAndEdges(fragment, nodesMap, edges);
        }
        let nodes = Utils.A.from(nodesMap.values());
        this.nodes.update(nodes);
        this.edges.update(edges);
    }
    handleDoubleClick(event) {
        if (event.nodes.length === 1)
            this.handleNodeDoubleClick(event.nodes[0]);
    }
    handleNodeDoubleClick(nodeID) {
        let node = this.nodes.get(nodeID);
        if (!Pointer.Factory.is(node.data))
            return;
        let pointer = node.data;
        if (pointer.isResolved())
            return;
        pointer.resolve().then(([document]) => {
            this.renderDocument(document);
        });
        // TODO: Handle errors
    }
    createDocumentNode(document) {
        return {
            id: document.id,
            group: document.id,
            label: this.getRelativeURI(document.id),
            shape: "dot",
            data: document,
        };
    }
    addFragmentNode(fragment, document, nodesMap) {
        let fragmentNode;
        if (URI.Util.isBNodeID(fragment.id)) {
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
    }
    addPropertyNodesAndEdges(resource, nodesMap, edges) {
        for (let propertyName in resource) {
            if (!resource.hasOwnProperty(propertyName))
                continue;
            let propertyValue = resource[propertyName];
            let propertyNodes = this.getGraphNodes(propertyValue, nodesMap);
            let propertyEdges = this.connectNodes(resource, propertyNodes, propertyName);
            propertyEdges.forEach((edge) => edges.push(edge));
        }
    }
    getGraphNodes(propertyValue, nodesMap) {
        if (Utils.isArray(propertyValue)) {
            return propertyValue.map((value) => {
                return this.getGraphNode(value, nodesMap);
            });
        }
        else
            return [this.getGraphNode(propertyValue, nodesMap)];
    }
    getGraphNode(propertyValue, nodesMap) {
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
            let literalID = Utils.UUID.generate();
            let literalNode = {
                id: literalID,
                label: propertyValue,
                shape: "square",
                data: propertyValue,
            };
            nodesMap.set(literalID, literalNode);
            return literalNode;
        }
    }
    connectNodes(from, to, propertyName = null) {
        let fromNodes = Utils.isArray(from) ? from : [from];
        let toNodes = Utils.isArray(to) ? to : [to];
        let connections = [];
        fromNodes.forEach((fromNode) => {
            connections = connections.concat(toNodes.map((toNode) => {
                let connection = {
                    id: this.generateEdgeID(fromNode, toNode),
                    from: fromNode.id,
                    to: toNode.id,
                    arrows: {
                        to: {
                            enabled: true
                        },
                    },
                };
                if (propertyName !== null) {
                    connection.label = this.getURILabel(propertyName);
                    connection.title = propertyName;
                    connection.font = { align: "top" };
                }
                return connection;
            }));
        });
        return connections;
    }
    generateEdgeID(from, to) {
        return `${from.id}__to__${to.id}`;
    }
    getURILabel(uri) {
        let label = this.getRelativeURI(uri);
        label = this.prefixURI(label);
        return label;
    }
    getRelativeURI(uri) {
        let uriBase = this.appContext.resolve("");
        if (!URI.Util.isBaseOf(uriBase, uri))
            return uri;
        return URI.Util.getRelativeURI(uri, uriBase);
    }
    prefixURI(uri) {
        return URI.Util.isAbsolute(uri) ? URI.Util.prefix(uri, this.appContext.getObjectSchema()) : uri;
    }
};
DocumentExplorerComponent.parameters = [[ElementRef]];
__decorate([
    Input()
], DocumentExplorerComponent.prototype, "appContext");
DocumentExplorerComponent = __decorate([
    Component({
        selector: "document-explorer",
        template: template,
        directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES],
    })
], DocumentExplorerComponent);
export default DocumentExplorerComponent;
//# sourceMappingURL=DocumentExplorerComponent.js.map