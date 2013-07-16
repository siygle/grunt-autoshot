# grunt-autoshot

> Create a quick screenshot for your site which could help for document or testing.

## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-autoshot --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-autoshot');
```

## The "autoshot" task

### Overview
In your project's Gruntfile, add a section named `autoshot` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  autoshot: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

### Options

#### options.separator
Type: `String`
Default value: `',  '`

A string value that is used to do something with whatever.

#### options.punctuation
Type: `String`
Default value: `'.'`

A string value that is used to do something else with whatever else.

## Release History

* v0.0.1 - Plugin Initial

## License
Copyright (c) 2013 Ferrari Lee. Licensed under the MIT license.
