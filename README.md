# grunt-autoshot [![Build Status](https://travis-ci.org/Ferrari/grunt-autoshot.png?branch=master)](https://travis-ci.org/Ferrari/grunt-autoshot)

Create a quick screenshot for your site which could help for document or testing. 
Inspired by [Testing your responsive design with PhantomJS](http://daker.me/2013/07/testing-your-responsive-design-with-phantomjs.html), also suport different resolution base on your viewport, it's useful to responsive design.

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

Final and the most important thing, please make sure [**phantomjs**](http://phantomjs.org/) are in your PATH, cause this plugin use it to generate screenshot, so remember [install](http://phantomjs.org/download.html) first.

## The "autoshot" task

### Overview
In your project's Gruntfile, add a section named `autoshot` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  autoshot: {
    default_options: {
      options: {
        // necessary config
        path: '',
        filename: '',
        type: '',
        // optional config, must set either remote or local
        remote: '',
        local: '',
        viewport: [] 
      },
    },
  },
})
```

### Options

#### options.path
Type: `String`

Path to the directory which screenshots will be saved.

#### options.filename
Type: `String`

Default filename of screenshots.  
It will combine with local, remote and viewport.
```
ex: [local|remote]-{filename}-{viewport}
```

#### options.type
Type: String

Image type of screenshot.  
PhantomJS supports JPEG, PNG, GIF and PDF right now.

#### options.remote
Type: String

The url of target webpage.
```
ex: http://www.google.com
```

#### options.local
Type: String

Start a local http server to host your webpage then get the screenshot. There are several config options:
```
{
  path: './dist', // path to directory of the webpage
  port: 8080      // port of startup http server
}
```

#### options.viewport
Type: Array

Autoshot could create the screenshot base on given viewport, it's helpful if you want to test responsive webpage.
```
ex: ['1024x768', '1920x1080']
```
You could add any resolution you want, just follow the same format.

## License
Copyright (c) 2013 Ferrari Lee. Licensed under the MIT license.
