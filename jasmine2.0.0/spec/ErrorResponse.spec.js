describe('ErrorResponse object', function() {

	var promise = Carbon.parseErrorResponse("http://carbonldp.com/static/lib/example/errorResponse1.json");
	
  	it('has method, getObjectType(), which returns "ErrorResponse"', function(done){

  		//var promise = Carbon.parseErrorResponse("http://carbonldp.com/static/lib/example/errorResponse1.json");

  		promise.done(function(responseObj){
  			expect( responseObj.getObjectType() ).toBe('ErrorResponse');
  		})
  		.fail(function(errMsg){
  			console.log(expect());
  			expect("getObjectType() test received error: " + errMsg).toFail();
  		})
  		.always(done);

  	});


  	it('has property, uri, which equals the identifying URI of the Error Response', function(done){

  		//var promise = Carbon.parseErrorResponse("http://carbonldp.com/static/lib/example/errorResponse1.json");

  		promise.done(function(responseObj){
  			expect( responseObj.uri ).toBe('http://carbonldp.com/errors/762345');
  		})
  		.fail(function(errMsg){
  			console.log(expect());
  			expect("uri test received error: " + errMsg).toFail();
  		})
  		.always(done);

  	});


  	it('has property, carbonCode, which equals 762345', function(done){

  		//var promise = Carbon.parseErrorResponse("http://carbonldp.com/static/lib/example/errorResponse1.json");

  		promise.done(function(responseObj){
  			expect( responseObj.carbonCode ).toBe(762345);
  		})
  		.fail(function(errMsg){
  			console.log(expect());
  			expect("carbonCode test received error: " + errMsg).toFail();
  		})
  		.always(done);

  	});


  	it('has property, friendlyMessage, which equals "The parameters sent are wrong"', function(done){

  		//var promise = Carbon.parseErrorResponse("http://carbonldp.com/static/lib/example/errorResponse1.json");

  		promise.done(function(responseObj){
  			expect( responseObj.friendlyMessage ).toBe('The parameters sent are wrong');
  		})
  		.fail(function(errMsg){
  			console.log(expect());
  			expect("friendlyMessage test received error: " + errMsg).toFail();
  		})
  		.always(done);

  	});


  	it('has property, httpStatusCode, which equals 400', function(done){

  		//var promise = Carbon.parseErrorResponse("http://carbonldp.com/static/lib/example/errorResponse1.json");

  		promise.done(function(responseObj){
  			expect( responseObj.httpStatusCode ).toBe(400);
  		})
  		.fail(function(errMsg){
  			console.log(expect());
  			expect("httpStatusCode test received error: " + errMsg).toFail();
  		})
  		.always(done);

  	});

  	it('has property, debugMessage, which equals "The request wasn\'t constructed the way it... bla bla bla... "', function(done){

  		//var promise = Carbon.parseErrorResponse("http://carbonldp.com/static/lib/example/errorResponse1.json");

  		promise.done(function(responseObj){
  			expect( responseObj.debugMessage ).toBe('The request wasn\'t constructed the way it... bla bla bla...');
  		})
  		.fail(function(errMsg){
  			console.log(expect());
  			expect("debugMessage test received error: " + errMsg).toFail();
  		})
  		.always(done);

  	});

  	it('has method, hasParameterIssue(), which returns true when parameter issues exist"', function(done){

  		//var promise = Carbon.parseErrorResponse("http://carbonldp.com/static/lib/example/errorResponse1.json");

  		promise.done(function(responseObj){
  			expect( responseObj.hasParameterIssue() ).toBe(true);
  		})
  		.fail(function(errMsg){
  			console.log(expect());
  			expect("hasParameterIssue() test received error: " + errMsg).toFail();
  		})
  		.always(done);

  	});



  	describe('ParameterIssue object', function(done) {

  		it('has property, uri, which returns identifying URI for inline resource', function(done) {
  			promise.done(function(responseObj){
  				var issue = responseObj.paramIssues[0];
  				expect( issue.uri ).toBe('http://carbonldp.com/errors/762345#parameterIssue-2');
	  		})
	  		.fail(function(errMsg){
	  			console.log(expect());
	  			expect("uri test received error: " + errMsg).toFail();
	  		})
	  		.always(done);

  		});


  		it('has property, issueCode, which returns "231231"', function(done) {
  			promise.done(function(responseObj){
  				var issue = responseObj.paramIssues[0];
  				expect( issue.issueCode ).toBe(231231);
	  		})
	  		.fail(function(errMsg){
	  			console.log(expect());
	  			expect("issueCode test received error: " + errMsg).toFail();
	  		})
	  		.always(done);

  		});


  		it('has property, issueDescription, which returns "This field is required."', function(done) {
  			promise.done(function(responseObj){
  				var issue = responseObj.paramIssues[0];
  				expect( issue.issueDescription ).toBe('This field is required.');
	  		})
	  		.fail(function(errMsg){
	  			console.log(expect());
	  			expect("issueDescription test received error: " + errMsg).toFail();
	  		})
	  		.always(done);

  		});

  	

  		it('has property, key, which returns "body"', function(done) {
  			promise.done(function(responseObj){
  				var issue = responseObj.paramIssues[0];
  				expect( issue.key ).toBe('body');
	  		})
	  		.fail(function(errMsg){
	  			console.log(expect());
	  			expect("key test received error: " + errMsg).toFail();
	  		})
	  		.always(done);

  		});


  		it('has property, val, which returns "someIncorrectVal"', function(done) {
  			promise.done(function(responseObj){
  				var issue = responseObj.paramIssues[1];
  				expect( issue.val ).toBe('someIncorrectVal');
	  		})
	  		.fail(function(errMsg){
	  			console.log(expect());
	  			expect("key test received error: " + errMsg).toFail();
	  		})
	  		.always(done);

  		});


	});


  	describe('HeaderIssue object', function(done) {

  		it('has property, uri, which returns identifying URI for inline resource', function(done) {
  			promise.done(function(responseObj){
  				var issue = responseObj.headerIssues[0];
  				expect( issue.uri ).toBe('http://carbonldp.com/errors/762345#headerIssue-1');
	  		})
	  		.fail(function(errMsg){
	  			console.log(expect());
	  			expect("uri test received error: " + errMsg).toFail();
	  		})
	  		.always(done);

  		});


  		it('has property, issueCode, which returns "123423"', function(done) {
  			promise.done(function(responseObj){
  				var issue = responseObj.headerIssues[0];
  				expect( issue.issueCode ).toBe(123423);
	  		})
	  		.fail(function(errMsg){
	  			console.log(expect());
	  			expect("issueCode test received error: " + errMsg).toFail();
	  		})
	  		.always(done);

  		});


  		it('has property, issueDescription, which returns "The content-type isn\'t supported."', function(done) {
  			promise.done(function(responseObj){
  				var issue = responseObj.headerIssues[0];
  				expect( issue.issueDescription ).toBe('The content-type isn\'t supported.');
	  		})
	  		.fail(function(errMsg){
	  			console.log(expect());
	  			expect("issueDescription test received error: " + errMsg).toFail();
	  		})
	  		.always(done);

  		});

  	

  		it('has property, key, which returns "Accept"', function(done) {
  			promise.done(function(responseObj){
  				var issue = responseObj.headerIssues[0];
  				expect( issue.key ).toBe('Accept');
	  		})
	  		.fail(function(errMsg){
	  			console.log(expect());
	  			expect("key test received error: " + errMsg).toFail();
	  		})
	  		.always(done);

  		});


  		it('has property, val, which returns "image/png"', function(done) {
  			promise.done(function(responseObj){
  				var issue = responseObj.headerIssues[0];
  				expect( issue.val ).toBe('image/png');
	  		})
	  		.fail(function(errMsg){
	  			console.log(expect());
	  			expect("key test received error: " + errMsg).toFail();
	  		})
	  		.always(done);

  		});


	});




  	describe('EntityBody object', function(done) {

  		it('has property, uri, which returns identifying URI for inline resource', function(done) {
  			promise.done(function(responseObj){
  				var issue = responseObj.entityBodyIssues[0];
  				expect( issue.uri ).toBe('http://carbonldp.com/errors/762345#entityBodyIssue-1');
	  		})
	  		.fail(function(errMsg){
	  			console.log(expect());
	  			expect("uri test received error: " + errMsg).toFail();
	  		})
	  		.always(done);

  		});


  		it('has property, issueCode, which returns "123423"', function(done) {
  			promise.done(function(responseObj){
  				var issue = responseObj.entityBodyIssues[0];
  				expect( issue.issueCode ).toBe(90280);
	  		})
	  		.fail(function(errMsg){
	  			console.log(expect());
	  			expect("issueCode test received error: " + errMsg).toFail();
	  		})
	  		.always(done);

  		});


  		it('has property, issueDescription, which returns "The content contains illegal characters."', function(done) {
  			promise.done(function(responseObj){
  				var issue = responseObj.entityBodyIssues[0];
  				expect( issue.issueDescription ).toBe('The content contains illegal characters.');
	  		})
	  		.fail(function(errMsg){
	  			console.log(expect());
	  			expect("issueDescription test received error: " + errMsg).toFail();
	  		})
	  		.always(done);

  		});



	});


});