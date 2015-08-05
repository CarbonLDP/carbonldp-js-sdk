/*
Copyright (c) 2008-2014 Pivotal Labs

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
jasmineRequire.html = function( j$ ) {
	j$.ResultsNode = jasmineRequire.ResultsNode();
	j$.HtmlReporter = jasmineRequire.HtmlReporter( j$ );
	j$.QueryString = jasmineRequire.QueryString();
	j$.HtmlSpecFilter = jasmineRequire.HtmlSpecFilter();
};

jasmineRequire.HtmlReporter = function( j$ ) {
	/**/
	var noopTimer = {
		start  : function() {
		},
		elapsed: function() {
			return 0;
		}
	};

	function HtmlReporter( options ) {
		var env = options.env || {},
			getContainer = options.getContainer,
			createElement = options.createElement,
			createTextNode = options.createTextNode,
			onRaiseExceptionsClick = options.onRaiseExceptionsClick || function() {
				},
			timer = options.timer || noopTimer,
			results = [],
			failures = [],
			specsExecuted = 0,
			failureCount = 0,
			pendingSpecCount = 0,
			symbols,
			summary, banner, alert, checkbox, tree, suitesContainer;
		var templates = { arguments: "arguments.handlebars" };

		this.initialize = function() {
			symbols = find( '.symbol-summary' );
			summary = find( '.summary' );
			banner = find( '.banner' );
			alert = find( '.alert' );
			checkbox = find( '#raise-exceptions' );
			tree = find( '.summary .tree' );
			suitesContainer = find( '.navigation-panel .panel-body ul' );
		};

		var totalSpecsDefined;
		this.jasmineStarted = function( options ) {
			totalSpecsDefined = options.totalSpecsDefined || 0;
			timer.start();
		};


		var topResults = new j$.ResultsNode( {}, '', null ),
			currentParent = topResults;

		this.suiteStarted = function( result ) {
			currentParent.addChild( result, 'suite' );
			currentParent = currentParent.last();
		};

		this.suiteDone = function( result ) {
			if( currentParent == topResults ) {
				return;
			}
			currentParent = currentParent.parent;
		};

		this.specStarted = function( result ) {
			currentParent.addChild( result, 'spec' );
		};

		this.specDone = function( result ) {
			if( noExpectations( result ) && console && console.error ) {
				//console.error( 'Spec \'' + result.fullName + '\' has no expectations.' );
			}

			if( result.status != 'disabled' ) {
				specsExecuted ++;
			}

			/*symbols.appendChild( createDom( 'li', {
					className: noExpectations( result ) ? 'empty' : result.status,
					id       : 'spec_' + result.id,
					title    : result.fullName
				},
				createDom( 'a', { className: '', href: '#result_' + result.id, target: '' }, '__' )
			) );*/
			symbols.appendChild(
				createDom( 'li', {
						className: '',
						id       : 'spec_' + result.id
					},
					createDom( 'a', {
						className: 'label ' + getSymbolClass( result ),
						href     : '#result_' + result.id,
						target   : ''
					}, '' )
				)
			)
			;


			if( result.status == 'failed' ) {
				failureCount ++;
				var failure =
					createDom( 'div', { className: 'spec-detail failed' },
						createDom( 'div', { className: 'description' },
							createDom( 'a', { title: result.fullName, href: specHref( result ) }, result.fullName )
						),
						createDom( 'div', { className: 'messages' } )
					);
				var messages = failure.childNodes[ 1 ];

				for( var i = 0; i < result.failedExpectations.length; i ++ ) {
					var expectation = result.failedExpectations[ i ];
					messages.appendChild( createDom( 'div', { className: 'result-message' }, expectation.message ) );
					messages.appendChild( createDom( 'div', { className: 'stack-trace' }, expectation.stack ) );
				}

				failures.push( failure );
			}

			if( result.status == 'pending' ) {
				pendingSpecCount ++;
			}
		};

		this.jasmineDone = function() {


			find( '.banner .duration' ).innerHTML = ( 'finished in ' + timer.elapsed() / 1000 + 's' );


			checkbox.checked = ! env.catchingExceptions();
			checkbox.onclick = onRaiseExceptionsClick;

			if( specsExecuted < totalSpecsDefined ) {
				var skippedMessage = 'Ran ' + specsExecuted + ' of ' + totalSpecsDefined + ' specs - run all';
				alert.appendChild(
					createDom( 'span', { className: 'bar skipped' },
						createDom( 'a', { href: '?', title: 'Run all specs' }, skippedMessage )
					)
				);
			}
			var statusBarMessage = '';
			var statusBarClassName = 'bar ';

			if( totalSpecsDefined > 0 ) {
				statusBarMessage += pluralize( 'spec', specsExecuted ) + ', ' + pluralize( 'failure', failureCount );
				if( pendingSpecCount ) {
					statusBarMessage += ', ' + pluralize( 'pending spec', pendingSpecCount );
				}
				statusBarClassName += (failureCount > 0) ? 'failed' : 'passed';
			} else {
				statusBarClassName += 'skipped';
				statusBarMessage += 'No specs found';
			}

			alert.appendChild( createDom( 'span', { className: statusBarClassName }, statusBarMessage ) );

			/*var tree = createDom( 'ul', { className: 'tree' } );*/
			summary.innerHTML = ( tree );


			var suites = [];
			/*var printResultsTree = function( obj ) {
				var list = createDom( 'ul', { className: '' } );
				for( var i = 0; i < obj.children.length; i ++ ) {

					if( obj.children[ i ].children.length > 0 ) {
						// If it's a suite
						obj.status = getSuiteStatus( obj.children[ i ] );
						suites.push( obj.children[ i ] );
						//console.log( obj.children[ i ].result.id );
						list.appendChild( createDom( 'li', {}, obj.children[ i ].result.id + ' - ' + obj.status + ' ' + obj.children[ i ].children.length ) );
						list.appendChild( createDom( 'li', {}, printResultsTree( obj.children[ i ] ) ) );
					} else {
						// If it's a spec
						//console.log( obj.children[ i ].result.id + ' - ' + noExpectations( obj.children[ i ].result ) ? 'empty' : obj.children[ i ].result.status )
						list.appendChild( createDom( 'li', {}, obj.children[ i ].result.id + ' - ' + (noExpectations( obj.children[ i ].result ) ? 'empty' : obj.children[ i ].result.status ) ) );
					}
				}
				return list;
			};*/
			function renderSuites( obj, suitesContainer ) {
				for( var i = 0; i < obj.children.length; i ++ ) {
					if( obj.children[ i ].children.length > 0 ) {
						// If it's a suite

						obj.status = getSuiteStatus( obj.children[ i ] );
						suites.push( obj.children[ i ] );

						obj.children[ i ].result.description = obj.children[ i ].result.description.replace( 'JSON{', '{' );
						if( isJsonString( obj.children[ i ].result.description ) ) {
							obj.children[ i ].result.description = jsonToObject( obj.children[ i ].result.description );
						} else {
							obj.children[ i ].result.description.name = obj.children[ i ].result.description;
							//obj.children[ i ].result.description.name = { description: obj.children[ i ].result.description };
						}

						console.log( obj.children[ i ].result.description );
						//list.appendChild( createDom( 'li', { className: 'suite_element' }, obj.children[ i ].result.id + ' - ' + obj.status + ' ' + obj.children[ i ].children.length ) );

						suitesContainer.appendChild(
							createDom( 'li', { className: 'suite_element' },
								createDom( 'a', {
										href  : '#result_',
										target: ''
									},
									createDom( 'span', {
											className: ''
										}, obj.children[ i ].result.description.name.toString()
									),
									createDom( 'span', {
											className: 'label label-success pull-right'
										}, obj.children[ i ].children.length.toString()
									)
								)
							)
						)
						;
						renderSuites( obj.children[ i ], suitesContainer );
					}
				}
				return suitesContainer;
			};
			console.log( topResults );
			combineResultNodes( topResults )
			var suitesMenu = renderSuites( topResults, suitesContainer );
			console.log( suitesMenu );

			//console.log( suites );

			function combineResultNodes( resultsTree ) {

				resultsTree.children.sort( function( a, b ) {
					if( a.type === 'spec' && b.type !== 'spec' ) return - 1;
					if( a.type !== 'spec' && b.type === 'spec' ) return 1;
					if( a.type === 'spec' && b.type === 'spec' ) return 0;

					if( a.result.description < b.result.description )return - 1;
					if( a.result.description > b.result.description )return 1;
					return 0;
				} );

				for( var i = 0; i < resultsTree.children.length; i ++ ) {
					var resultNode = resultsTree.children[ i ];
					if( resultNode.type !== 'suite' ) continue;
					var j;
					for( j = i + 1; j < resultsTree.children.length; j ++ ) {
						var toCompare = resultsTree.children[ j ];
						if( ! resultNode.equals( toCompare ) ) break;
						resultNode.children = resultNode.children.concat( toCompare.children );
					}
					if( (j - 1) !== i ) resultsTree.children.splice( i + 1, j - i );
				}
			}

			// Calculates the Status of the Module by checking the result of its specs
			function getSuiteStatus( suite ) {
				var suiteStatus = '',
					empty = false,
					disabled = false,
					passed = false,
					pending = false,
					failed = false;
				var status = { empty: false, disabled: false, passed: false, pending: false, failed: false }
				for( var i = 0; i < suite.children.length; i ++ ) {
					if( suite.children[ i ].type == 'spec' ) {
						specStatus = noExpectations( suite.children[ i ].result ) ? 'empty' : suite.children[ i ].result.status;
						if( specStatus == "failed" ) {
							suiteStatus = specStatus
							failed = true,
								empty = false,
								disabled = false,
								passed = false,
								pending = false;
						} else if( specStatus == "pending" && ! failed ) {
							suiteStatus = specStatus
							pending = true,
								empty = false,
								disabled = false,
								passed = false;
						} else if( specStatus == "passed" && ! pending && ! failed ) {
							suiteStatus = specStatus
							passed = true,
								empty = false,
								disabled = false;
						} else if( specStatus == "disabled" && ! passed && ! pending && ! failed ) {
							suiteStatus = specStatus
							disabled = true,
								empty = false;
						} else if( specStatus == "empty" && ! disabled && ! passed && ! pending && ! failed ) {
							suiteStatus = specStatus
							empty = true;
						}
					}
				}
				//console.log( empty, failed, pending, passed, disabled )
				return suiteStatus;
			}

			/*function summaryList( resultsTree, domParent ) {

				combineResultNodes( resultsTree );

				console.log( "Tree: %o", resultsTree );

				for( var i = 0; i < resultsTree.children.length; i ++ ) {
					var resultNode = resultsTree.children[ i ];


					var $node = createDom( 'li', { className: '' } );
					if( resultNode.type === 'suite' ) renderSuite( resultNode, $node );
					else if( resultNode.type === 'spec' ) {
						//$node = createDom( 'li', { className: '' } );
						renderSpec( resultNode, $node );
					}
					domParent.appendChild( $node );
				}
			}

			function renderSuite( suiteNode, $node ) {
				if( suiteNode.result.description.a ) {
					console.log( suiteNode.result.description.a );
				}
				if( suiteNode.children && suiteNode.children.length > 0 ) {
					var divBranch = createDom( 'div', { className: 'panel panel-primary tree_label', id: 'checkbox-' + suiteNode.result.id } );
					var bodyContent = createDom( 'div', { className: 'panel-heading' } );
					bodyContent.appendChild( createDom( 'label', { className: 'tree_label', for: 'checkbox-' + suiteNode.result.id }, suiteNode.result.description ) );
					divBranch.appendChild( bodyContent );
					$node.appendChild(
						divBranch
						//createDom( 'label', { className: 'tree_label', for: 'checkbox-' + suiteNode.result.id }, suiteNode.result.description )
					);

					var $branch = createDom( 'ul' );
					summaryList( suiteNode, $branch );
					$node.appendChild( $branch );
				} else {
					$node.appendChild(
						createDom( 'span', { className: 'tree_label' }, suiteNode.result.description )
					);
				}
			}

			function renderSpec( specNode, $node ) {
				//console.log( specNode );
				var panel = createDom( 'div', { className: 'panel tree_label', id: 'result_' + specNode.result.id } );
				var phead = createDom( 'div', { className: 'panel-heading' } );
				var pbody = createDom( 'div', { className: 'panel-body' } );

				var row = createDom( 'div', { className: 'row' } );
				var left = createDom( 'div', { className: 'col-sm-5 col-md-5' } );
				var middle = createDom( 'div', { className: 'col-sm-2 col-md-2' } );
				var right = createDom( 'div', { className: 'col-sm-5 col-md-5' } );


				var description = specNode.result.description.replace( 'JSON{', '{' );
				if( isJsonString( description ) ) {
					description = jsonToObject( description );
				}

				var tableArgs = renderArguments( description.arguments );


				//console.log( specNode );
				//console.log( description );


				left.appendChild( createDom( 'h5', { className: '' }, 'Arguments:' ) );
				left.appendChild( createDom( 'br', { className: '' } ) );
				left.appendChild( tableArgs );


				right.appendChild( createDom( 'h5', { className: '' }, 'Returns:' ) );
				right.appendChild( createDom( 'br', { className: '' } ) );
				right.appendChild( createDom( 'span', { className: '' }, 'Type: ' ) );

				if( specNode.result.status == 'passed' ) {
					panel.className = panel.className + ' panel-success';
					phead.appendChild( createDom( 'span', { className: '' }, specNode.result.id ) );
					phead.innerHTML = phead.innerHTML + ' - ' + description.name;
					phead.appendChild( createDom( 'span', { className: 'glyphicon glyphicon-ok pull-right' } ) );
				}
				if( specNode.result.status == 'failed' ) {
					console.log( specNode );
					panel.className = panel.className + ' panel-warning';
					phead.appendChild( createDom( 'span', { className: '' }, specNode.result.id ) );
					phead.innerHTML = phead.innerHTML + ' - ' + description.name;
					phead.appendChild( createDom( 'span', { className: 'glyphicon glyphicon-warning-sign' } ) );
				}
				if( description.returns != undefined && description.returns != null ) {
					console.log();
					right.appendChild( createDom( 'code', { className: '' }, description.returns.type ) );
				}

				row.appendChild( left );
				row.appendChild( middle );
				row.appendChild( right );


				pbody.appendChild( createDom( 'span', { className: '' }, description.description ) );
				pbody.appendChild( createDom( 'hr', { className: '' } ) );
				pbody.appendChild( row );

				panel.appendChild( phead );
				panel.appendChild( pbody );
				$node.appendChild( panel );
			}
			*/
			function renderArguments( args ) {
				var c, r, table, thead, tbody;
				table = createDom( 'table', { className: 'table table-condensed table-bordered table-striped' } );
				thead = createDom( 'thead', { className: '' } );
				tbody = createDom( 'tbody', { className: '' } );
				r = thead.insertRow( 0 );
				c = r.insertCell( 0 );
				c.innerHTML = 'name';
				c = r.insertCell( 1 );
				c.innerHTML = 'type';
				if( args != null ) {
					for( var i = 0; i < args.length; i ++ ) {
						r = tbody.insertRow( 0 );
						c = r.insertCell( 0 );
						c.innerHTML = args[ i ].name;
						c = r.insertCell( 1 );
						c.innerHTML = args[ i ].type;
					}
				}
				table.appendChild( thead );
				table.appendChild( tbody );
				return table
			}

			if( failures.length ) {
				alert.appendChild(
					createDom( 'span', { className: 'menu bar spec-list' },
						createDom( 'span', {}, 'Spec List | ' ),
						createDom( 'a', { className: 'failures-menu', href: '#' }, 'Failures' ) ) );
				alert.appendChild(
					createDom( 'span', { className: 'menu bar failure-list' },
						createDom( 'a', { className: 'spec-list-menu', href: '#' }, 'Spec List' ),
						createDom( 'span', {}, ' | Failures ' ) ) );

				find( '.failures-menu' ).onclick = function() {
					setMenuModeTo( 'failure-list' );
				};
				find( '.spec-list-menu' ).onclick = function() {
					setMenuModeTo( 'spec-list' );
				};

				setMenuModeTo( 'failure-list' );

				var failureNode = find( '.failures' );
				for( var i = 0; i < failures.length; i ++ ) {
					failureNode.appendChild( failures[ i ] );
				}
			}

			/*
			var results = find( '.results' );
			results.appendChild( summary );

			var tree = createDom( 'ul', { className: 'tree' } );
			summary.appendChild( tree );

			summaryList( topResults, tree );

			function combineResultNodes( resultsTree ) {
				resultsTree.children.sort( function( a, b ) {
					if( a.type === 'spec' && b.type !== 'spec' ) return - 1;
					if( a.type !== 'spec' && b.type === 'spec' ) return 1;
					if( a.type === 'spec' && b.type === 'spec' ) return 0;

					if( a.result.description < b.result.description )return - 1;
					if( a.result.description > b.result.description )return 1;
					return 0;
				} );

				for( var i = 0; i < resultsTree.children.length; i ++ ) {
					var resultNode = resultsTree.children[ i ];
					if( resultNode.type !== 'suite' ) continue;
					var j;
					for( j = i + 1; j < resultsTree.children.length; j ++ ) {
						var toCompare = resultsTree.children[ j ];
						if( ! resultNode.equals( toCompare ) ) break;
						resultNode.children = resultNode.children.concat( toCompare.children );
					}
					if( (j - 1) !== i ) resultsTree.children.splice( i + 1, j - i );
				}
			}

			function summaryList( resultsTree, domParent ) {
				combineResultNodes( resultsTree );

				for( var i = 0; i < resultsTree.children.length; i ++ ) {
					var resultNode = resultsTree.children[ i ];

					var $node = createDom( 'li' );
					if( resultNode.type === 'suite' ) renderSuite( resultNode, $node );
					else if( resultNode.type === 'spec' ) renderSpec( resultNode, $node );

					domParent.appendChild( $node );
				}
			}

			function renderSuite( suiteNode, $node ) {
				if( suiteNode.result.description.a ) {
					console.log( suiteNode.result.description.a );
				}
				if( suiteNode.children && suiteNode.children.length > 0 ) {
					$node.appendChild(
						createDom( 'input', { type: 'checkbox', id: 'checkbox-' + suiteNode.result.id } )
					);

					$node.appendChild(
						createDom( 'label', { className: 'tree_label', for: 'checkbox-' + suiteNode.result.id }, suiteNode.result.description )
					);

					var $branch = createDom( 'ul' );
					summaryList( suiteNode, $branch );
					$node.appendChild( $branch );
				} else {
					$node.appendChild(
						createDom( 'span', { className: 'tree_label' }, suiteNode.result.description )
					);
				}
			}

			function renderSpec( specNode, $node ) {
				$node.appendChild(
					createDom( 'span', { className: 'tree_label' }, specNode.result.description )
				);
			}

			if( failures.length ) {
				alert.appendChild(
					createDom( 'span', { className: 'menu bar spec-list' },
						createDom( 'span', {}, 'Spec List | ' ),
						createDom( 'a', { className: 'failures-menu', href: '#' }, 'Failures' ) ) );
				alert.appendChild(
					createDom( 'span', { className: 'menu bar failure-list' },
						createDom( 'a', { className: 'spec-list-menu', href: '#' }, 'Spec List' ),
						createDom( 'span', {}, ' | Failures ' ) ) );

				find( '.failures-menu' ).onclick = function() {
					setMenuModeTo( 'failure-list' );
				};
				find( '.spec-list-menu' ).onclick = function() {
					setMenuModeTo( 'spec-list' );
				};

				setMenuModeTo( 'failure-list' );

				var failureNode = find( '.failures' );
				for( var i = 0; i < failures.length; i ++ ) {
					failureNode.appendChild( failures[ i ] );
				}
			}*/
		};
		$.ajax( {
			url    : "templates/test_passed.html",
			cache  : true,
			success: function( data ) {
				var passed_card_template = Handlebars.compile( data );
				var context = { title: "My New Post", body: "This is my first post!" };
				var html = passed_card_template( context );
				$( '#passed-card-template' ).html( html );
			}
		} );
		//var source = find( '#passed-card-template' );


		return this;

		function find( selector ) {
			return getContainer().querySelector( '.jasmine_html-reporter ' + selector );
		}

		/*function clearPrior() {
			// return the reporter
			var oldReporter = find( '' );

			if( oldReporter ) {
				getContainer().removeChild( oldReporter );
			}
		}*/

		function createDom( type, attrs, childrenVarArgs ) {
			var el = createElement( type );

			for( var i = 2; i < arguments.length; i ++ ) {
				var child = arguments[ i ];

				if( typeof child === 'string' ) {
					el.appendChild( createTextNode( child ) );
				} else {
					if( child ) {
						el.appendChild( child );
					}
				}
			}

			for( var attr in attrs ) {
				if( attr == 'className' ) {
					el[ attr ] = attrs[ attr ];
				} else {
					el.setAttribute( attr, attrs[ attr ] );
				}
			}

			return el;
		}

		function pluralize( singular, count ) {
			var word = (count == 1 ? singular : singular + 's');

			return '' + count + ' ' + word;
		}

		function specHref( result ) {
			return '?spec=' + encodeURIComponent( result.fullName );
		}

		//function setMenuModeTo( mode ) {
		//	htmlReporterMain.setAttribute( 'class', 'jasmine_html-reporter ' + mode );
		//}

		function noExpectations( result ) {
			return (result.failedExpectations.length + result.passedExpectations.length) === 0 &&
				result.status === 'passed';
		}

		function getSymbolClass( result ) {
			switch( noExpectations( result ) ? 'empty' : result.status ) {
				case 'empty':
					return 'label-warning';
				case 'passed':
					return 'label-success';
				case 'failed':
					return 'label-danger';
				case 'disabled':
					return 'label-default';
				case 'pending':
					return 'label-info'

			}

		}

		function jsonToObject( json ) {
			return JSON.parse( json );
		}

		function isJsonString( str ) {
			try {
				JSON.parse( str );
			} catch( e ) {
				return false;
			}
			return true;
		}
	}

	return HtmlReporter;
}
;

jasmineRequire.HtmlSpecFilter = function() {
	function HtmlSpecFilter( options ) {
		var filterString = options && options.filterString() && options.filterString().replace( /[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&' );
		var filterPattern = new RegExp( filterString );

		this.matches = function( specName ) {
			return filterPattern.test( specName );
		};
	}

	return HtmlSpecFilter;
};

jasmineRequire.ResultsNode = function() {
	function ResultsNode( result, type, parent ) {
		this.result = result;
		this.type = type;
		this.parent = parent;

		this.children = [];

		this.addChild = function( result, type ) {
			this.children.push( new ResultsNode( result, type, this ) );
		};

		this.last = function() {
			return this.children[ this.children.length - 1 ];
		};

		this.equals = function( node ) {
			return (
				this.result.description === node.result.description &&
				this.type.fullName === node.type.fullName
			);
		}
	}

	return ResultsNode;
};

jasmineRequire.QueryString = function() {
	function QueryString( options ) {

		this.setParam = function( key, value ) {
			var paramMap = queryStringToParamMap();
			paramMap[ key ] = value;
			options.getWindowLocation().search = toQueryString( paramMap );
		};

		this.getParam = function( key ) {
			return queryStringToParamMap()[ key ];
		};

		return this;

		function toQueryString( paramMap ) {
			var qStrPairs = [];
			for( var prop in paramMap ) {
				qStrPairs.push( encodeURIComponent( prop ) + '=' + encodeURIComponent( paramMap[ prop ] ) );
			}
			return '?' + qStrPairs.join( '&' );
		}

		function queryStringToParamMap() {
			var paramStr = options.getWindowLocation().search.substring( 1 ),
				params = [],
				paramMap = {};

			if( paramStr.length > 0 ) {
				params = paramStr.split( '&' );
				for( var i = 0; i < params.length; i ++ ) {
					var p = params[ i ].split( '=' );
					var value = decodeURIComponent( p[ 1 ] );
					if( value === 'true' || value === 'false' ) {
						value = JSON.parse( value );
					}
					paramMap[ decodeURIComponent( p[ 0 ] ) ] = value;
				}
			}

			return paramMap;
		}

	}

	return QueryString;
};
