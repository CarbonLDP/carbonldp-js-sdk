import { Component, ElementRef } from "angular2/core";
import { CORE_DIRECTIVES } from "angular2/common";

import { ROUTER_DIRECTIVES, Location, RouteConfig, RouterLink, Router } from "angular2/router";

import { AppContext } from "carbon/App";
import Carbon from "carbon/Carbon";

import DocumentExplorerComponent from "./document-explorer/DocumentExplorerComponent";

import template from "./template.html!";
import "./style.css!";

@Component( {
	selector: "app",
	template: template,
	directives: [ CORE_DIRECTIVES, ROUTER_DIRECTIVES, DocumentExplorerComponent ],
} )
export default class AppComponent {
	public static parameters:any = [ [ ElementRef ], [ Carbon ] ];

	public element:ElementRef;

	public carbon:Carbon;

	public username:string = "";
	public password:string = "";

	public appContext:AppContext = null;

	constructor( element:ElementRef, carbon:Carbon ) {
		this.element = element;

		this.carbon = carbon;
	}

	login( username:string, password:string ):void {
		this.carbon.Auth.authenticate( username, password ).then( () => {
			console.log( "login >> Logged in" );
		});
	}

	logout():void {
		this.carbon.Auth.clearAuthentication();

		console.log( "logout << Logged out" );
	}

	getAppContext( appSlug:string ):void {
		this.carbon.apps.get( appSlug ).then( ( appContext:AppContext ):void => {
			this.appContext = appContext;
		});
	}
}
