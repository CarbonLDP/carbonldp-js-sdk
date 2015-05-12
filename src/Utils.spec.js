define(["require", "exports", './Utils'], function (require, exports, Utils) {
    describe('Utils', function () {
        it('is defined', function () {
            expect(Utils).toBeDefined();
            expect(Utils).not.toBeNull();
        });
        it('has method, hasFunction( object, functionName ), which returns true if the object has a function with that name', function () {
            expect(Utils.hasFunction).toBeDefined();
            var myObject = {};
            expect(Utils.hasFunction(myObject, 'hasOwnProperty')).toBe(true);
            expect(Utils.hasFunction(myObject, 'doSomething')).toBe(false);
            myObject.doSomething = function () { };
            expect(Utils.hasFunction(myObject, 'doSomething')).toBe(true);
            myObject.something = 'something';
            expect(Utils.hasFunction(myObject, 'something')).toBe(false);
        });
        it('has method, isNull( value ), which returns true if the value is null', function () {
            expect(Utils.isNull).toBeDefined();
            expect(Utils.isNull(null)).toBe(true);
            expect(Utils.isNull('something')).toBe(false);
            expect(Utils.isNull(true)).toBe(false);
            expect(Utils.isNull(false)).toBe(false);
            expect(Utils.isNull(9)).toBe(false);
            expect(Utils.isNull({})).toBe(false);
            expect(Utils.isNull([])).toBe(false);
        });
        it('has method, isArray( value ), which returns true if the value is an array', function () {
            expect(Utils.isArray).toBeDefined();
            expect(Utils.isArray(null)).toBe(false);
            expect(Utils.isArray('something')).toBe(false);
            expect(Utils.isArray(true)).toBe(false);
            expect(Utils.isArray(false)).toBe(false);
            expect(Utils.isArray(9)).toBe(false);
            expect(Utils.isArray({})).toBe(false);
            expect(Utils.isArray([])).toBe(true);
        });
        it('has method, isString( value ), which returns true if the value is a string', function () {
            expect(Utils.isString).toBeDefined();
            expect(Utils.isString(null)).toBe(false);
            expect(Utils.isString('something')).toBe(true);
            expect(Utils.isString(true)).toBe(false);
            expect(Utils.isString(false)).toBe(false);
            expect(Utils.isString(9)).toBe(false);
            expect(Utils.isString({})).toBe(false);
            expect(Utils.isString([])).toBe(false);
        });
        it('has method, isBoolean( value ), which returns true if the value is a boolean', function () {
            expect(Utils.isBoolean).toBeDefined();
            expect(Utils.isBoolean(null)).toBe(false);
            expect(Utils.isBoolean('something')).toBe(false);
            expect(Utils.isBoolean(true)).toBe(true);
            expect(Utils.isBoolean(false)).toBe(true);
            expect(Utils.isBoolean(9)).toBe(false);
            expect(Utils.isBoolean({})).toBe(false);
            expect(Utils.isBoolean([])).toBe(false);
        });
        it('has method, isNumber( value ), which returns true if the value is a number', function () {
            expect(Utils.isNumber).toBeDefined();
            expect(Utils.isNumber(null)).toBe(false);
            expect(Utils.isNumber('something')).toBe(false);
            expect(Utils.isNumber(true)).toBe(false);
            expect(Utils.isNumber(false)).toBe(false);
            expect(Utils.isNumber(9)).toBe(true);
            expect(Utils.isNumber(9.9)).toBe(true);
            expect(Utils.isNumber(0.1)).toBe(true);
            expect(Utils.isNumber(-1)).toBe(true);
            expect(Utils.isNumber({})).toBe(false);
            expect(Utils.isNumber([])).toBe(false);
        });
        it('has method, isInteger( value ), which returns true if the map is an integer', function () {
            expect(Utils.isInteger).toBeDefined();
            expect(Utils.isInteger(null)).toBe(false);
            expect(Utils.isInteger('something')).toBe(false);
            expect(Utils.isInteger(true)).toBe(false);
            expect(Utils.isInteger(false)).toBe(false);
            expect(Utils.isInteger(9)).toBe(true);
            expect(Utils.isInteger(9.9)).toBe(false);
            expect(Utils.isInteger(0.1)).toBe(false);
            expect(Utils.isInteger(-1)).toBe(true);
            expect(Utils.isInteger({})).toBe(false);
            expect(Utils.isInteger([])).toBe(false);
        });
        it('has method, isDouble( value ), which returns true if the value is a double', function () {
            expect(Utils.isNumber).toBeDefined();
            expect(Utils.isNumber(null)).toBe(false);
            expect(Utils.isNumber('something')).toBe(false);
            expect(Utils.isNumber(true)).toBe(false);
            expect(Utils.isNumber(false)).toBe(false);
            expect(Utils.isNumber(9)).toBe(true);
            expect(Utils.isNumber(9.9)).toBe(true);
            expect(Utils.isNumber(0.1)).toBe(true);
            expect(Utils.isNumber(-1)).toBe(true);
            expect(Utils.isNumber({})).toBe(false);
            expect(Utils.isNumber([])).toBe(false);
        });
        it('has method, isDate( value ), which returns true if the value is a date object', function () {
            expect(Utils.isDate).toBeDefined();
            expect(Utils.isDate(null)).toBe(false);
            expect(Utils.isDate('something')).toBe(false);
            expect(Utils.isDate(true)).toBe(false);
            expect(Utils.isDate(false)).toBe(false);
            expect(Utils.isDate(9)).toBe(false);
            expect(Utils.isDate({})).toBe(false);
            expect(Utils.isDate([])).toBe(false);
            expect(Utils.isDate(new Date())).toBe(true);
        });
        it('has method, isObject( value ), which returns true if the value is an object', function () {
            expect(Utils.isObject).toBeDefined();
            expect(Utils.isObject(null)).toBe(true);
            expect(Utils.isObject('something')).toBe(false);
            expect(Utils.isObject(true)).toBe(false);
            expect(Utils.isObject(false)).toBe(false);
            expect(Utils.isObject(9)).toBe(false);
            expect(Utils.isObject({})).toBe(true);
            expect(Utils.isObject([])).toBe(true);
            expect(Utils.isObject(new Date())).toBe(true);
        });
        it('has method, isFunction( value ), which returns true if the value is an object', function () {
            expect(Utils.isFunction).toBeDefined();
            expect(Utils.isFunction(null)).toBe(false);
            expect(Utils.isFunction('something')).toBe(false);
            expect(Utils.isFunction(true)).toBe(false);
            expect(Utils.isFunction(false)).toBe(false);
            expect(Utils.isFunction(9)).toBe(false);
            expect(Utils.isFunction({})).toBe(false);
            expect(Utils.isFunction([])).toBe(false);
            expect(Utils.isFunction(new Date())).toBe(false);
            expect(Utils.isFunction(function () { })).toBe(true);
        });
    });
});
//# sourceMappingURL=Utils.spec.js.map