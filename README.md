jase
====

A simple command line utility for extracting data from and writing data to JSON-formatted data structures.

```
Usage:
  jase <key> [options]

Arguments:
  <key>     A dot (`.`) delimited key which references the value that should be returned or overwritten.
            Escape dot characters in key names using '\', e.g. 'config.foo\.bar'.

Options:
  -f, --file <file>          The JSON file to read.
  -s, --save <value>         The new value to set for the provided key.
  -d, --delete               Delete the provided key.
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


### Sample Uses

#### Get a property
```bash
$ cat package.json | jase author
```

#### Get a nested property
```bash
$ cat package.json | jase scripts.test
```

#### Add a property
Chain operations and do things like add nested properties.
```bash
$ cat package.json | jase config -s {} | jase config.port -s 8000
```

#### Delete a property
```bash
$ cat package.json | jase scripts -d
```

#### Reformat a file
Convert a JSON file with 2-space indenting to 4-space
```bash
$ cat package.json | jase "" -i 4
```
