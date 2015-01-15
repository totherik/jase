'use strict';


function get(src, key) {
    var keys, value;

    keys = key.split('.');
    value = src;

    while (value && (key = keys.shift())) {
        value = value[key];
    }

    if (!keys.length) {
        return value;
    }

    return undefined;
}


function set(src, key, value) {
    var keys, prop, obj;

    keys = key.split('.');
    prop = keys.pop();
    obj = src = JSON.parse(JSON.stringify(src));

    while (obj && (key = keys.shift())) {
        obj = obj[key];
    }

    if (!keys.length) {
        obj[prop] = value;
        return src;
    }

    return undefined;
}


function exec(obj, key, value) {
    return value ? set(obj, key, value) : get(obj, key);
}


module.exports = {
    get: get,
    set: set,
    exec: exec
};