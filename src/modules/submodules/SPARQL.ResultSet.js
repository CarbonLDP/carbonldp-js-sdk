(function ( SPARQL ) {
	var _resultSet = {};

	_resultSet.isResultSet = function ( resultSet ) {
		if ( ! resultSet ) return false;
		return hasProperty( resultSet, "head" ) && hasProperty( resultSet, "results" );
	};

	_resultSet.injectMethods = function ( resultSets ) {
		resultSets = isArray( resultSets ) ? resultSets : [resultSets];
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
				resultSet.getRows = function () {
					return resultSet.results.bindings;
				};
				resultSet.isEmpty = function () {
					return resultSet.results.bindings.length == 0;
				};

			}( resultSet ));
		}
	};

	SPARQL.ResultSet = _resultSet;
}( Carbon.SPARQL ));