jase
====

A simple command line utility for extracting data from and writing data to JSON files.

```
jase <key> [options]
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