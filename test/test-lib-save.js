var test = require('tape');
var jase = require('../index');


test(function (t) {
    var obj, result;

    t.plan(8);

    obj = {
        a: 1,
        b: {
            c: 3
        }
    };

    result = jase.set(obj, 'a', 2);
    t.ok(result.hasOwnProperty('a'));
    t.equal(result.a, 2);
    t.ok(result.hasOwnProperty('b'));
    t.ok(result.b.hasOwnProperty('c'));

    result = jase.set(obj, 'b.c', 4);
    t.ok(result.hasOwnProperty('a'));
    t.ok(result.hasOwnProperty('b'));
    t.ok(result.b.hasOwnProperty('c'));
    t.equal(result.b.c, 4);
});
