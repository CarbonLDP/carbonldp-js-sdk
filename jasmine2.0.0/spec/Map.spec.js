describe('Map object', function() {

	var myMap;

	beforeEach(function() {
    	myMap = new Map();
  	});
  
	it('has method, isEmpty(), which returns true when map empty', function() {
		expect( myMap.isEmpty() ).toBe(true);
	});

	it('has method, size(), which returns 0 when map is empty', function(){
		expect( myMap.size() ).toBe(0);
	});

	it('has method, size(), which returns 2 when map has 2 items', function(){
		myMap.put('key1','http://value1?dt=2014_06_01&dummy=true');
		myMap.put('key2', {prop1:"Hello", prop2:" World!"} );
		expect(myMap.size()).toBe(2);
	});

	it('has a method, put(), which puts object into the map with a given key', function(){
		myMap.put('key1','http://value1?dt=2014_06_01&dummy=true');
		myMap.put('key2', {prop1:"Hello", prop2:" World!"} );
		var ref = myMap.get('key2');
		expect(ref.prop1).toBe( 'Hello' );
		expect(ref.prop2).toBe( ' World!' );
	});


	it('has a method, get(), which gets object from the map by the given key', function(){
		myMap.put('key1','http://value1?dt=2014_06_01&dummy=true');
		myMap.put('key2', {prop1:"Hello", prop2:" World!"} );
		var ref = myMap.get('key2');
		expect(ref.prop1).toBe('Hello');
	});

	it('has a method, containsKey(), which returns false when no object exists in the map by the given key', function(){
		myMap.put('key1','hello');
		expect( myMap.containsKey('dummy') ).toBe(false);
	});


	it('has a method, containsKey(), which returns true when an object exists in the map by the given key', function(){
		myMap.put('key1','hello');
		expect( myMap.containsKey('key1') ).toBe(true);
	});


	it('has a method, remove(), which removes the object identified by the given key', function(){
		myMap.put('key1','hello1');
		myMap.put('key2','hello2');
		myMap.put('key3','hello3');
		myMap.remove('key2');
		expect( myMap.containsKey('key2') ).toBe(false);
		expect( myMap.size() ).toBe(2);
	});

	it('has a method, clear(), which removes all items from the map', function(){
		myMap.put('key1','hello1');
		myMap.put('key2','hello2');
		myMap.put('key3','hello3');
		myMap.clear();
		expect( myMap.containsKey('key2') ).toBe(false);
		expect( myMap.size() ).toBe(0);
		expect( myMap.isEmpty() ).toBe(true);
	});

});

