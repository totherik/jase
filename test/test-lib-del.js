var test = require('tape');

var jase = require('../index');

test(function (t) {
    var obj, result;

    t.plan(6);

    obj = {
        a: 1,
        b: {
            c: 3
        }
    };

    result = jase.del(obj, 'a');
    t.notOk(result.hasOwnProperty('a'));
    t.ok(result.hasOwnProperty('b'));
    t.ok(result.b.hasOwnProperty('c'));

    result = jase.del(obj, 'b.c');
    t.ok(result.hasOwnProperty('a'));
    t.ok(result.hasOwnProperty('b'));
    t.notOk(result.b.hasOwnProperty('c'));
});
