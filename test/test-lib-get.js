var test = require('tape');
var jase = require('../index');


test(function (t) {
    var obj, result;

    t.plan(3);

    obj = {
        a: 1,
        b: {
            c: 3
        },
        d: [4, 5]
    };

    result = jase.get(obj, 'a');
    t.equal(result, 1);

    result = jase.get(obj, 'b.c');
    t.equal(result, 3);

    result = jase.get(obj, 'd.1');
    t.equal(result, 5);
});
