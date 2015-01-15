#!/usr/bin/env node
'use strict';

var fs = require('fs');
var thing = require('core-util-is');
var minimist = require('minimist');
var jase = require('./index');


function parse(obj) {
    try {
        return JSON.parse(obj);
    } catch (err) {
        return obj;
    }
}

// Sort out command line arguments
var opts, argv;

opts = {
    string: ['save'],
    alias: {
        file: ['f'],
        save: ['s'],
        indent: ['i']
    },
    default: {
        indent: 2
    }
};

argv = minimist(process.argv.slice(2), opts);
if (argv._.length === 0) {
    console.log('Usage:');
    console.log('  jase <key> [options]');
    console.log('');
    console.log('Arguments:');
    console.log('  <key>     A dot (`.`) delimited key which references the value that should be returned or overwritten.');
    console.log('            Escape dot characters in key names using \'\\\', for example \'config.foo\\.bar\'.');
    console.log('');
    console.log('Options:');
    console.log('  -f, --file <file>          The JSON file to read.');
    console.log('  -s, --save <value>         The new value to set for the provided key.');
    console.log('  -i, --indent <spaces>      The number of spaces to indent the newly written JSON.');
    console.log('');
    console.log('Example:');
    console.log('  jase ./package.json scripts.test');
    console.log('');
    return;
}


// Process file.
var key, chunks, stream;

key = argv._[0];
chunks = [];
stream = argv.file ? fs.createReadStream(argv.file) : process.stdin;

stream.on('readable', function () {
    var chunk;
    while ((chunk = this.read()) !== null) {
        chunks.push(chunk);
    }
});

stream.on('end', function () {
    var json, result;

    json = Buffer.concat(chunks).toString('utf8');
    json = JSON.parse(json);

    result = jase.exec(json, key, parse(argv.save));
    if (result === undefined) {
        process.stderr.write('Error: \'' + key + '\' not found.');
        process.exit(1);
        return;
    }

    if (!thing.isPrimitive(result)) {
        result = JSON.stringify(result, null, argv.indent);
    }

    process.stdout.write(result);
    process.exit(0);
});