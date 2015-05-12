define(["require", "exports", './HashMap', './Utils'], function (require, exports, HashMap_1, Utils) {
    describe('HashMap', function () {
        it('is defined', function () {
            expect(HashMap_1.default).not.toBeNull();
            expect(Utils.isFunction(HashMap_1.default)).toBe(true);
        });
        it('has static method, fromObject( object ), which creates a new HashMap<string,any> from the object properties.', function () {
            var map = HashMap_1.default.fromObject({
                'key1': 1,
                'key2': 2,
                'key3': 3
            });
            expect(map.size()).toBe(3);
            expect(map.hasKey('key1')).toBe(true);
            expect(map.hasKey('key2')).toBe(true);
            expect(map.hasKey('key3')).toBe(true);
        });
        it('has method, isEmpty(), which returns true if the map is empty', function () {
            var map = new HashMap_1.default();
            expect(map.isEmpty).toBeDefined();
            expect(Utils.isFunction(map.isEmpty)).toBe(true);
            expect(map.isEmpty()).toBe(true);
            map.put('key1', 'something');
            expect(map.isEmpty()).toBe(false);
        });
        it('has method, hasKey(), which returns true if the map contains a value related to the key', function () {
            var map = new HashMap_1.default();
            expect(map.hasKey).toBeDefined();
            expect(Utils.isFunction(map.hasKey)).toBe(true);
            map.put('key1', 'hello');
            expect(map.hasKey('key1')).toBe(true);
            expect(map.hasKey('dummy')).toBe(false);
        });
        it('has method, hasValue(), which returns true if the map contains one or more keys related to the value', function () {
            var map = new HashMap_1.default();
            expect(map.hasValue).toBeDefined();
            expect(Utils.isFunction(map.hasValue)).toBe(true);
            map.put('key1', 'hello');
            map.put('key2', 'hey');
            map.put('key3', 'hello');
            expect(map.hasValue('hey')).toBe(true);
            expect(map.hasValue('hello')).toBe(true);
            expect(map.hasValue('dummy')).toBe(false);
        });
        it('has method, get(), which gets object from the map by the given key', function () {
            var map = new HashMap_1.default();
            expect(map.get).toBeDefined();
            expect(Utils.isFunction(map.get)).toBe(true);
            map.put('key1', false);
            expect(map.get('key1')).toBe(false);
        });
        it('has method, getKeys( value ), which returns an array with all the keys associated with that value', function () {
            var map = new HashMap_1.default();
            expect(map.getKeys).toBeDefined();
            expect(Utils.isFunction(map.getKeys)).toBe(true);
            map.put('key1', 'hello');
            map.put('key2', 'hey');
            map.put('key3', 'hello');
            var keys;
            keys = map.getKeys('hello');
            expect(Utils.isArray(keys)).toBe(true);
            expect(keys.length).toBe(2);
            expect(keys.indexOf('key1')).not.toBe(-1);
            expect(keys.indexOf('key3')).not.toBe(-1);
            keys = map.getKeys('dummy');
            expect(Utils.isArray(keys)).toBe(true);
            expect(keys.length).toBe(0);
        });
        it('has method, getAllKeys(), which returns an array with all the keys of the map', function () {
            var map = new HashMap_1.default();
            expect(map.getAllKeys).toBeDefined();
            expect(Utils.isFunction(map.getAllKeys)).toBe(true);
            map.put('key1', 'hello');
            map.put('key2', 'hey');
            map.put('key3', 'hello');
            var keys = map.getAllKeys();
            expect(Utils.isArray(keys)).toBe(true);
            expect(keys.length).toBe(3);
            expect(keys.indexOf('key1')).not.toBe(-1);
            expect(keys.indexOf('key2')).not.toBe(-1);
            expect(keys.indexOf('key3')).not.toBe(-1);
        });
        it('has method, getValues(), which returns an array with all the values stored', function () {
            var map = new HashMap_1.default();
            expect(map.getValues).toBeDefined();
            expect(Utils.isFunction(map.getValues)).toBe(true);
            map.put('key1', false);
            map.put('key2', 'a string');
            var values = map.getValues();
            expect(Utils.isArray(values)).toBe(true);
            expect(values.length).toBe(2);
            expect(values.indexOf(false)).not.toBe(-1);
            expect(values.indexOf('a string')).not.toBe(-1);
        });
        it('has method, size(), which returns the size of the map', function () {
            var map = new HashMap_1.default();
            expect(map.size).toBeDefined();
            expect(Utils.isFunction(map.size)).toBe(true);
            expect(map.size()).toBe(0);
            map.put('key1', 'something');
            map.put('key2', 'something else');
            expect(map.size()).toBe(2);
        });
        it('has method, put(), which stores a value related to a key', function () {
            var map = new HashMap_1.default();
            expect(map.put).toBeDefined();
            expect(Utils.isFunction(map.put)).toBe(true);
            map.put('key1', false);
            map.put('key2', { prop1: "Hello", prop2: " World!" });
            expect(map.get('key1')).toBe(false);
            var ref = map.get('key2');
            expect(ref.prop1).toBe('Hello');
            expect(ref.prop2).toBe(' World!');
        });
        it('has method, remove(), which removes the value related to the given key', function () {
            var map = new HashMap_1.default();
            expect(map.remove).toBeDefined();
            expect(Utils.isFunction(map.remove)).toBe(true);
            map.put('key1', 'hello1');
            map.put('key2', 'hello2');
            map.put('key3', 'hello3');
            map.remove('key2');
            expect(map.hasKey('key2')).toBe(false);
        });
        it('has method, clear(), which removes all values from the map', function () {
            var map = new HashMap_1.default();
            expect(map.clear).toBeDefined();
            expect(Utils.isFunction(map.clear)).toBe(true);
            map.put('key1', 'hello1');
            map.put('key2', 'hello2');
            map.put('key3', 'hello3');
            map.clear();
            expect(map.size()).toBe(0);
            expect(map.isEmpty()).toBe(true);
        });
        it('uses generics. Thus, it can accept keys and values from any type', function () {
            // TODO: Test the use of generics
        });
    });
});
//# sourceMappingURL=HashMap.spec.js.map