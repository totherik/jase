'use strict';


function split(string, delimiter) {
    var i, tmp, result;

    i = 0;
    tmp = '';
    result = [];

    while (i < string.length) {
        if (string[i] === '\\' && string[i + 1] === delimiter) {
            tmp += delimiter;
            i += 1;
        } else if (string[i] === delimiter) {
            result.push(tmp);
            tmp = '';
        } else {
            tmp += string[i];
        }
        i += 1;
    }

    result.push(tmp);
    return result;
}


function get(src, key) {
    var keys, value;

    keys = split(key, '.');
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

    keys = split(key, '.');
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

function del(src, key) {
    var keys, prop, obj;

    keys = split(key, '.');
    prop = keys.pop();
    obj = src = JSON.parse(JSON.stringify(src));

    while (obj && (key = keys.shift())) {
        obj = obj[key];
    }

    if (!keys.length) {
        delete obj[prop];
        return src;
    }

    return undefined;
}


module.exports = {
    get: get,
    set: set,
    del: del
};
