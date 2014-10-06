(function ( Carbon, $, jsonld, Map, _shared ) {
	'use strict';

	var _resultSet = {};

	_resultSet.isResultSet = function ( resultSet ) {
		if ( ! resultSet ) return false;
		return _shared.hasProperty( resultSet, "head" ) && _shared.hasProperty( resultSet, "results" );
	};

	_resultSet.injectMethods = function ( resultSets ) {
		resultSets = _shared.isArray( resultSets ) ? resultSets : [resultSets];
		var length = resultSets.length;
		for ( var i = 0; i < length; i ++ ) {
			var resultSet = resultSets[i];
			(function ( resultSet ) {

				resultSet.hasColumn = function ( column ) {
					var length = resultSet.head.vars.length;
					for ( var i = 0; i < length; i ++ ) {
						if ( resultSet.head.vars[i] == column ) return true;
					}
					return false;
				};
				resultSet.isEmpty = function () {
					return resultSet.results.bindings.length == 0;
				};
				resultSet.getColumnNames = function() {
					return resultSet.head.vars;
				};
				resultSet.getRows = function () {
					return resultSet.results.bindings;
				};

				function defaultSortFunction( a, b ) {
					if (a > b) return 1;
					if (a.name < b.name) return -1;
					return 0;
				}

				resultSet.sortByValue = function( column, sortFunction) {
					sortFunction = !!sortFunction ? sortFunction : defaultSortFunction;
					var completeSortingFunction = (function(){
						return function ( rowA, rowB ) {
							var a = a[column].value;
							var b = b[column].value;
							return sortFunction( a, b );
						}
					}());
					resultSet.results.bindings.sort(completeSortingFunction);
				};

			}( resultSet ));
		}
	};

	Carbon.SPARQL.ResultSet = _resultSet;
}( Carbon, $, jsonld, Map, _shared ));