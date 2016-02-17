/// <reference path="./../../typings/browser.d.ts" />

import { Component, ElementRef, Input } from "angular2/core";
import { CORE_DIRECTIVES } from "angular2/common";
import { ROUTER_DIRECTIVES, Location, RouteConfig, RouterLink, Router } from "angular2/router";

import { AppContext } from "carbon/App";

import * as HTTP from "carbon/HTTP";
import * as Fragment from "carbon/Fragment";
import * as Pointer from "carbon/Pointer";
import * as PersistedDocument from "carbon/PersistedDocument";
import * as PersistedResource from "carbon/PersistedResource";
import * as Utils from "carbon/Utils";
import { URI } from "carbon/RDF";
import Carbon from "carbon/Carbon";

import "vis/dist/vis.css!";
import vis from "vis/dist/vis";

import template from "./template.html!";
import "./style.css!";

interface ExpandedNetworkNode extends NetworkNode {
	data:any;
}

@Component( {
	selector: "document-explorer",
	template: template,
	directives: [ CORE_DIRECTIVES, ROUTER_DIRECTIVES ],
} )
export default class DocumentExplorerComponent {
	static parameters:any = [ [ ElementRef ] ];

	@Input() appContext:AppContext;

	element:ElementRef;

	carbon:Carbon;

	graph:Network;
	nodes:DataSet<ExpandedNetworkNode>;
	edges:DataSet<NetworkEdge>;

	constructor( element:ElementRef ) {
		this.element = element;
	}

	ngAfterViewInit():void {
		this.appContext.extendObjectSchema( {
			"resourceProperty": {
				"@id": "http://example.org/ns#resourceProperty",
				"@type": "@id",
				"@container": "@set",
			},
		} );


		this.nodes = new vis.DataSet<ExpandedNetworkNode>();
		this.edges = new vis.DataSet<NetworkEdge>();

		let graphDiv:any = this.element.nativeElement.querySelector( ".graph" );
		this.graph = new vis.Network( graphDiv, {
			nodes: this.nodes,
			edges: this.edges,
		}, {
			width: "100%",
			height: `${ graphDiv.clientHeight }px`,
		});

		this.graph.on( "doubleClick", this.handleDoubleClick.bind( this ));
	}

	getDocument( documentURI:string ):void {
		documentURI = !! documentURI ? documentURI : "";
		this.appContext.Documents.get( documentURI ).then( ( [ document, response ]:[ PersistedDocument.Class, HTTP.Response.Class ] ):void => {
			this.nodes.clear();
			this.edges.clear();
			this.renderDocument( document );
		});
	}

	renderDocument( document:PersistedDocument.Class ):void {
		let nodesMap:Map<string, ExpandedNetworkNode> = new Map<string, ExpandedNetworkNode>();
		let edges:NetworkEdge[] = [];

		let documentNode:ExpandedNetworkNode = this.createDocumentNode( document );
		nodesMap.set( documentNode.id, documentNode );

		this.addPropertyNodesAndEdges( document, nodesMap, edges );

		for( let fragment of document.getFragments() ) {
			this.addFragmentNode( fragment, document, nodesMap );
			this.addPropertyNodesAndEdges( fragment, nodesMap, edges );
		}

		let nodes:ExpandedNetworkNode[] = Utils.A.from( nodesMap.values() );
		this.nodes.update( nodes );
		this.edges.update( edges );
	}

	handleDoubleClick( event:any ):void {
		if( event.nodes.length === 1 ) this.handleNodeDoubleClick( event.nodes[ 0 ] );
	}

	handleNodeDoubleClick( nodeID:any ):void {
		let node:any = this.nodes.get( nodeID );
		if( ! Pointer.Factory.is( node.data ) ) return;

		let pointer:Pointer.Class = node.data;

		if( pointer.isResolved() ) return;

		pointer.resolve().then( ( [ document ]:[ PersistedDocument.Class ] ) => {
			this.renderDocument( document );
		});
		// TODO: Handle errors
	}

	private createDocumentNode( document:PersistedDocument.Class ):ExpandedNetworkNode {
		return {
			id: document.id,
			group: document.id,
			label: this.getRelativeURI( document.id ),
			shape: "dot",
			data: document,
		};
	}

	private addFragmentNode( fragment:Fragment.Class, document:PersistedDocument.Class, nodesMap:Map<string, ExpandedNetworkNode> ):void {
		let fragmentNode:ExpandedNetworkNode;
		if( URI.Util.isBNodeID( fragment.id ) ) {
			fragmentNode = {
				id: fragment.id,
				group: document.id,
				label: "_:",
				shape: "dot",
				data: fragment,
			};
		} else {
			fragmentNode = {
				id: fragment.id,
				group: document.id,
				label: this.getURILabel( fragment.id ),
				shape: "dot",
				data: fragment,
			};
		}
		nodesMap.set( fragment.id, fragmentNode );
	}

	private addPropertyNodesAndEdges( resource:PersistedResource.Class, nodesMap:Map<string, ExpandedNetworkNode>, edges:NetworkEdge[] ):void {
		for( let propertyName in resource ) {
			if( ! resource.hasOwnProperty( propertyName ) ) continue;

			let propertyValue:any = resource[ propertyName ];
			let propertyNodes:ExpandedNetworkNode[] = this.getGraphNodes( propertyValue, nodesMap );
			let propertyEdges:NetworkEdge[] = this.connectNodes( resource, propertyNodes, propertyName );

			propertyEdges.forEach( ( edge:NetworkEdge ) => edges.push( edge ) );
		}
	}

	private getGraphNodes( propertyValue:any, nodesMap:Map<string, ExpandedNetworkNode> ):ExpandedNetworkNode[] {
		if( Utils.isArray( propertyValue ) ) {
			return propertyValue.map( ( value:any ):ExpandedNetworkNode => {
				return this.getGraphNode( value, nodesMap );
			} );
		} else return [ this.getGraphNode( propertyValue, nodesMap ) ];
	}

	private getGraphNode( propertyValue:any, nodesMap:Map<string, ExpandedNetworkNode> ):ExpandedNetworkNode {
		if( Pointer.Factory.is( propertyValue ) ) {
			if( ! nodesMap.has( propertyValue.id ) ) {
				nodesMap.set( propertyValue.id, {
					id: propertyValue.id,
					label: this.getURILabel( propertyValue.id ),
					title: propertyValue.id,
					shape: "dot",
					data: propertyValue,
				});
			}
			return nodesMap.get( propertyValue.id );
		} else {
			let literalID:string = Utils.UUID.generate();
			let literalNode:ExpandedNetworkNode = {
				id: literalID,
				label: propertyValue,
				shape: "square",
				data: propertyValue,
			};
			nodesMap.set( literalID, literalNode );
			return literalNode;
		}
	}

	private connectNodes( from:any, to:any, propertyName:string = null ):NetworkEdge[] {
		let fromNodes:any = Utils.isArray( from ) ? from : [ from ];
		let toNodes:any = Utils.isArray( to ) ? to : [ to ];
		let connections:Array<any> = [];

		fromNodes.forEach( ( fromNode:any ):void => {
			connections = connections.concat( toNodes.map( ( toNode:any ) => {
				let connection:any = {
					id: this.generateEdgeID( fromNode, toNode ),
					from: fromNode.id,
					to: toNode.id,
					arrows: {
						to: {
							enabled: true
						},
					},
				};
				if( propertyName !== null ) {
					connection.label = this.getURILabel( propertyName );
					connection.title = propertyName;
					connection.font = { align: "top" };
				}
				return connection;
			}) );
		} );

		return connections;
	}

	private generateEdgeID( from:any, to:any ):string {
		return `${ from.id }__to__${ to.id }`;
	}

	private getURILabel( uri:string ):string {
		let label:string = this.getRelativeURI( uri );
		label = this.prefixURI( label );

		return label;
	}

	private getRelativeURI( uri:string ):string {
		let uriBase:string = this.appContext.resolve( "" );
		if( ! URI.Util.isBaseOf( uriBase, uri ) ) return uri;

		return URI.Util.getRelativeURI( uri, uriBase );
	}

	private prefixURI( uri:string ):string {
		return URI.Util.isAbsolute( uri ) ? URI.Util.prefix( uri, this.appContext.getObjectSchema() ) : uri;
	}
}
