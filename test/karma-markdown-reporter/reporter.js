"use strict";

let MarkdownReporter = (() => {
	function specSuccess() {

	}

	function specSkipped() {

	}

	function specFailure() {

	}

	/**
	 *
	 * @param browser
	 * @param {Object} result
	 * @param {string} result.description
	 * @param {string} result.id
	 * @param {boolean} result.skipped
	 * @param {boolean} result.success
	 * @param {string[]} result.suite - Suites the spec belongs to, from top to bottom
	 */
	function onSpecComplete( browser, result ) {

	}

	function onRunStart( browsers, server ) {

	}

	/**
	 *
	 * @param browser
	 * @param {Object} results
	 * @param {Object} results.specs - A map-object like containing a property per suite, each property points to another map-object like constructing the spec tree
	 * @param {string[]} results.specs._ - A list of all the specs of the suite
	 * @param server
	 */
	function onBrowserStart( browser, results, server ) {

	}

	/**
	 *
	 * @param browsers
	 * @param {Object} overallResults - Results of the complete testsuite
	 * @param {boolean} overallResults.disconnected
	 * @param {boolean} overallResults.error
	 * @param {int} overallResults.exitCode
	 * @param {int} overallResults.failed - Number of tests failed
	 * @param {int} overallResults.success - Number of successful tests
	 * @param server
	 */
	function onRunComplete( browsers, overallResults, server ) {

	}

	let MarkdownReporter = function( config ) {
		this.specSuccess = specSuccess;
		this.specSkipped = specSkipped;
		this.specFailure = specFailure;
		this.onSpecComplete = onSpecComplete;
		this.onRunStart = onRunStart;
		this.onBrowserStart = onBrowserStart;
		this.onRunComplete = onRunComplete;
	};
	MarkdownReporter.$inject = [ "config" ];

	return MarkdownReporter;
})();

module.exports = {
	"reporter:markdown": [ "type", MarkdownReporter ]
};
