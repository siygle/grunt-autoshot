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

Final and the most important thing, please make sure [**phantomjs**](http://phantomjs.org/) are in your PATH, if your windows users, please download the phantomjs zip file and decompress it and don't forget to set the environment variable as phantomjs.exe's path. Cause this plugin use phantomjs to generate screenshot, so remember [install](http://phantomjs.org/download.html) it first.

## The "autoshot" task

### Overview
In your project's Gruntfile, add a section named `autoshot` to the data object passed into `grunt.initConfig()`.

**Make a big change of config format from 0.1.0**, thanks @danielhusar and @ryanfitzer opinions, in order to support multiple sources and screenshots and follow the [standard format](http://gruntjs.com/configuring-tasks#files) of grunt.

After 0.1.0, filename and screenshot type all define using grunt file format. So please use those format that phantomjs [support](https://github.com/ariya/phantomjs/wiki/Screen-Capture).

There is a [example](https://github.com/Ferrari/grunt-autoshot/blob/master/Gruntfile.js#L32) of new Gruntfile format.

```js
grunt.initConfig({
  autoshot: {
    default_options: {
      options: {
        // necessary config
        path: SCREENSHOT_DIRECTORY_PATH,
        // optional config, must set either remote or local
        remote: {
          files: [
            { src: REMOTE_SITE_URL, dest: FILENAME(INCLUDE FILE TYPE) }
          ]
        },
        local: {
          path: LOCAL_FILE_PATH,
          port: LOCAL_SERVER_PORT,
          files: [
            { src: LOCAL_FILENAME, dest: FILENAME(INCLUDE FILE TYPE) }
          ]
        },
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

#### options.remote
Type: String

New format after 0.1.0, now you have to assign the source url and your screenshot file, include it's format, like following:
```js
remote: {
  files: [
    { src: "http://www.google.com", dest: "google.png" }
  ]
}
```

#### options.local
Type: String

Start a local http server to host your webpage then get the screenshot. 

Just like options.remote, you need to assign your local filename and screenshot filename, including it's format.
```js
local: {
  path: './dist', // path to directory of the webpage
  port: 8080      // port of startup http server
  files: [        // local filename and screenshot filename
    { src: "index.html", dest: "screenshot.jpg" }
  ]
}
```

#### options.viewport
Type: Array

Autoshot could create the screenshot base on given viewport, it's helpful if you want to test responsive webpage.
```
ex: ['1024x768', '1920x1080']
```
You could add any resolution you want, just follow the same format.

### Deprecated (Don't support after 0.1.0)

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

## License
Copyright (c) 2013 Ferrari Lee. Licensed under the MIT license.
