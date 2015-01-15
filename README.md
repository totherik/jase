jase
====

A simple command line utility for extracting data from and writing data to JSON files.

```
jase <key> [options]
```
```
Usage:
  jase <key> [file] [options]

Arguments:
  <key>     A dot (`.`) delimited key which references the value that should be returned or overwritten.

Options:
  -f, --file <file>          The JSON file to read.
  -s, --save <value>         The new value to set for the provided key.
  -i, --indent <spaces>      The number of spaces to indent the newly written JSON.

Example:
  jase ./package.json scripts.test

```

### Basic Examples

#### Retrieve a value (specifying a JSON file)
```bash
$ jase scripts -f package.json
{
  "test": "tape test/*.js"
}

$ jase scripts.test -f package.json
"tape test/*.js"
```

#### Retrieving a value (piping JSON to stdin)
```bash
$ cat ./package.json | jase scripts
{
  "test": "tape test/*.js"
}

$ cat ./package.json | jase scripts.test
"tape test/*.js"
```